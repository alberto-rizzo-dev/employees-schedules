import { fetchEmployees } from '@/app/lib/db-connection';
import Form from '../ui/new-shift/new-workshift-form';
 
export default async function Page() {
  const employees = await fetchEmployees();
 
  return (
    <main>
      <Form employees={employees} />
    </main>
  );
}