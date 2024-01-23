import { deleteWorkShift } from '@/app/lib/actions';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
  
export function DeleteShift({ id }: { id: number }) {
  const deleteShift = deleteWorkShift.bind(null, id);
 
  return (
    <form action={deleteShift}>
      <button className="rounded-md border p-2 b bg-red-500 hover:bg-red-400">
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}