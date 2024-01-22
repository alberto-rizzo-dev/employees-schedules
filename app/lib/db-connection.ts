import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  Employee,
    WorkShiftTable
} from './definitions';

const ITEMS_PER_PAGE = 5;

export async function fetchTableData(query:string,currentPage:number) {
    noStore();
    try {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const data = await sql<WorkShiftTable>`
       SELECT 
            employee.id AS employee_id,
            employee.name,
            employee.surname,
            employee.role,
            workshift.id as workshift_id,
            workshift.start_date,
            workshift.end_date
        FROM employee, workshift
        WHERE employee.id = workshift.employee
        AND (
            employee.name ILIKE ${`%${query}%`} OR
            employee.surname ILIKE ${`%${query}%`} OR
            employee.role ILIKE ${`%${query}%`} OR
            workshift.start_date::text ILIKE ${`%${query}%`} OR
            workshift.start_date::text ILIKE ${`%${query}%`}
        )
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return data.rows;
    } catch (err) {
      throw new Error('Failed to fetch all data.');
    }
}

export async function fetchTablePages(query:string,){
    noStore();
    try {
        const count = await sql`
        
            SELECT COUNT(*)
            FROM employee, workshift
            WHERE employee.id = workshift.employee
            AND (
                employee.name ILIKE ${`%${query}%`} OR
                employee.surname ILIKE ${`%${query}%`} OR
                employee.role ILIKE ${`%${query}%`} OR
                workshift.start_date::text ILIKE ${`%${query}%`} OR
                workshift.start_date::text ILIKE ${`%${query}%`}
            )
        `;
        return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      } catch (error) {
        throw new Error('Failed to fetch numbers of rows.');
      }
}

export async function fetchEmployees(){
  noStore();
  try {
    const data = await sql<Employee>`
      SELECT *
      FROM employee
      ORDER BY name ASC
    `;
    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all employees.');
  }
}
