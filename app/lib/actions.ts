'use server';
import { z } from 'zod'; //for type validation
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; //for revalidate table data
import { redirect } from 'next/navigation';
import { atLeastQuarter, dateOrderOk, durationShiftOk } from './utils';

const FormSchemaShift = z.object({
    employeeId: z.coerce.number(),
    start_timestamp: z.coerce.date(),
    end_timestamp: z.coerce.date(),
});

const FormSchemaEmployee = z.object({
    name: z.string(),
    surname: z.string(),
    role: z.string(),
});

const FormSchemaEditShift = z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
});

export async function insertWorkshift(formData: FormData) {
    const { employeeId, start_timestamp, end_timestamp } = FormSchemaShift.parse({
      employeeId: formData.get('employeeId'),
      start_timestamp: formData.get('start'),
      end_timestamp: formData.get('end'),
    });

    if(!(dateOrderOk(start_timestamp,end_timestamp)))
        throw new Error('Start timestamp must be before end timestamp.');

    if(!(durationShiftOk(start_timestamp,end_timestamp)))
        throw new Error('Workshift must be less than 10 hours.');

    if(!atLeastQuarter(start_timestamp,end_timestamp))
        throw new Error('At least 15 minutes of workshift are required.');

    const start =start_timestamp.toISOString();
    const end =end_timestamp.toISOString();

    try{
        await sql`
        INSERT INTO workshift (employee, start_timestamp, end_timestamp)
        VALUES (${employeeId},${start},${end})
        `;
    }catch(err){
        throw new Error('Failed to insert workshift.');
    }
    revalidatePath('/');
    redirect('/');
}

export async function deleteWorkShift(id: number) {
    try{ 
        await sql`DELETE FROM workshift WHERE id = ${id}`;     
    }
    catch(err){ throw new Error('Failed to delete workshift.'); }
    revalidatePath('/');
}

export async function updateWorkShift(id: number,formData: FormData, ) {
    const { start, end } = FormSchemaEditShift.parse({
        start: formData.get('start'),
        end: formData.get('end'),
      });

      if(!(dateOrderOk(start,end)))
        throw new Error('Start timestamp must be before end timestamp.');

      if(!(durationShiftOk(start,end)))
        throw new Error('Workshift must be less than 10 hours.');

      if(!atLeastQuarter(start,end))
        throw new Error('At least 15 minutes of workshift are required.');

      const s =start.toISOString();
      const e =end.toISOString();
          
      try{
        await sql`
        UPDATE workshift
        SET start_timestamp = ${s}, end_timestamp = ${e}
        WHERE id = ${id}
      `;
      }catch(err){
        throw new Error('Failed to update workshift.');
      }
      revalidatePath('/');
      redirect('/');
}

export async function insertEmployee(formData: FormData) {
    const { name, surname, role } = FormSchemaEmployee.parse({
      name: formData.get('name'),
      surname: formData.get('surname'),
      role: formData.get('role'),
    });
    try{
        await sql`
        INSERT INTO employee (name, surname, role)
        VALUES (${name},${surname},${role})
        `;

    }catch(err){
        throw new Error('Failed to insert employee.');
    }
    revalidatePath('/');
    redirect('/');
}