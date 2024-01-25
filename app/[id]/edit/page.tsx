import { fetchEmployeeByShiftId,fetchShiftById } from '@/app/lib/db-connection';
import Form from '@/app/ui/edit-workshift/edit-shift-form';
import { notFound } from 'next/navigation';

 
export default async function Page({ params }: { params: { id: string } }) {
  const [shift, employee] = await Promise.all([
    fetchShiftById(params.id),
    fetchEmployeeByShiftId(params.id),
  ]);
  if(!shift) return notFound();
  return (
    <main>
      <Form shift={shift} employee={employee}/>
    </main>
  );
}