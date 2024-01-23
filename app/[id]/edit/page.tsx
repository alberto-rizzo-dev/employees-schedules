import { fetchEmployeeByShiftId,fetchShiftById } from '@/app/lib/db-connection';
import Form from '@/app/ui/edit-workshift/edit-shift-form';
 
export default async function Page({ params }: { params: { id: string } }) {
  const [shift, employee] = await Promise.all([
    fetchShiftById(params.id),
    fetchEmployeeByShiftId(params.id),
  ]);
  return (
    <main>
      <Form shift={shift} employee={employee.name + " "+employee.surname}/>
    </main>
  );
}