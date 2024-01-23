import { fetchEmployees } from '@/app/lib/db-connection';
import Form from '../ui/new-employee/new-employee-form';
 
export default async function Page() {
  const employees = await fetchEmployees();
 
  return (
    <main>
      <Form/>
    </main>
  );
}