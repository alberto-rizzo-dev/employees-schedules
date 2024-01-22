import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
    WorkShiftTable
} from './definitions';

export async function fetchTableData() {
    noStore();
    try {
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
      `;
  
      const rows = data.rows;
      return rows;
    } catch (err) {
      throw new Error('Failed to fetch all data.');
    }
  }