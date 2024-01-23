'use server';
import { z } from 'zod'; //for type validation
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; //for revalidate table data
import { redirect } from 'next/navigation';
import { WorkShift } from './definitions';

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
    const start =start_timestamp.toISOString().replace('T',' ');
    const end =end_timestamp.toISOString().replace('T',' ');

    try{
        await sql`
        INSERT INTO workshift (employee, start_timestamp, end_timestamp)
        VALUES (${employeeId},${start},${end})
        `;
        revalidatePath('/');
        redirect('/');
    }catch(err){
        throw new Error('Failed to insert workshift.');
    }
}

export async function deleteWorkShift(id: number) {
    try{ 
        await sql`DELETE FROM workshift WHERE id = ${id}`;     
        revalidatePath('/');
    }
    catch(err){ throw new Error('Failed to delete workshift.'); }
}

export async function updateWorkShift(id: number,formData: FormData, ) {
    const { start, end } = FormSchemaEditShift.parse({
        start: formData.get('start'),
        end: formData.get('end'),
      });

      const s =start.toISOString().replace('T',' ');;
      const e =end.toISOString().replace('T',' ');;
          
      try{
        await sql`
        UPDATE workshift
        SET start_timestamp = ${s}, end_timestamp = ${e}
        WHERE id = ${id}
      `;
         revalidatePath('/');
        redirect('/');
      }catch(err){
        throw new Error('Failed to update workshift.');
      }
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
        revalidatePath('/');
        redirect('/');
    }catch(err){
        throw new Error('Failed to insert employee.');
    }
}