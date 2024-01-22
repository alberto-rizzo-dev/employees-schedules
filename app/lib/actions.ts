'use server';
import { z } from 'zod'; //for type validation
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; //for revalidate table data
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    employeeId: z.coerce.number(),
    start_timestamp: z.coerce.date(),
    end_timestamp: z.coerce.date(),
  });

export async function insertWorkshift(formData: FormData) {
    const { employeeId, start_timestamp, end_timestamp } = FormSchema.parse({
      employeeId: formData.get('employeeId'),
      start_timestamp: formData.get('start'),
      end_timestamp: formData.get('end'),
    });
    const start =start_timestamp.toISOString().split('T')[0]; //remove Time Zone
    const end =end_timestamp.toISOString().split('T')[0];

    await sql`
    INSERT INTO workshift (employee, start_timestamp, end_timestamp)
    VALUES (${employeeId},${start},${end})
    `;
    revalidatePath('/');
    redirect('/');
}
