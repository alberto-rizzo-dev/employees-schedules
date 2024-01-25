'use server';
import { z } from 'zod'; //for type validation
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; //for revalidate table data
import { redirect } from 'next/navigation';
import { atLeastQuarter, dateInOtherShifts, dateOrderOk, dateToString, durationShiftOk, isFutureDate } from './utils';

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

const dateSchema = z.preprocess( arg => typeof arg == 'string' ? new Date( arg ) : undefined, z.date() );


export async function insertWorkshift(formData: FormData) {
    try{
        dateSchema.parse(formData.get('start')); 
    }
    catch(err){
        throw new Error('Invalid start date.');
    }

    try{
        dateSchema.parse(formData.get('end')); 
    }
    catch(err){
        throw new Error('Invalid end date.');
    }

    const { employeeId, start_timestamp, end_timestamp } = FormSchemaShift.parse({
        employeeId: formData.get('employeeId'),
        start_timestamp: formData.get('start'),
        end_timestamp: formData.get('end'),
    });

    if(isFutureDate(start_timestamp) || isFutureDate(end_timestamp))
        throw new Error('Cannot insert future dates.');

    if(!(dateOrderOk(start_timestamp,end_timestamp)))
        throw new Error('Start timestamp must be before end timestamp.');

    if(!(durationShiftOk(start_timestamp,end_timestamp)))
        throw new Error('Workshift must be less than 10 hours.');

    if(!atLeastQuarter(start_timestamp,end_timestamp))
        throw new Error('At least 15 minutes of workshift are required.');

    if(!(await dateInOtherShifts(employeeId,start_timestamp,-1))
       || !(await dateInOtherShifts(employeeId,end_timestamp,-1))){
        throw new Error('Employee already has a shift in this time interval.');
    }

    const start =dateToString(start_timestamp);
    const end =dateToString(end_timestamp);

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
    try{
        dateSchema.parse(formData.get('start')); 
    }
    catch(err){
        throw new Error('Invalid start date.');
    }

    try{
        dateSchema.parse(formData.get('end')); 
    }
    catch(err){
        throw new Error('Invalid end date.');
    }
    const { start, end } = FormSchemaEditShift.parse({
        start: formData.get('start'),
        end: formData.get('end'),
      });

      if(isFutureDate(start) || isFutureDate(end))
        throw new Error('Cannot insert future dates.');

      if(!(dateOrderOk(start,end)))
        throw new Error('Start timestamp must be before end timestamp.');

      if(!(durationShiftOk(start,end)))
        throw new Error('Workshift must be less than 10 hours.');

      if(!atLeastQuarter(start,end))
        throw new Error('At least 15 minutes of workshift are required.');

      const s =dateToString(start);
      const e =dateToString(end);
          
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
    if(!(/^[A-Za-z\s]*$/.test(name)) || !(/^[A-Za-z\s]*$/.test(surname)))
        throw new Error('Name and surname must contain only letters.');
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