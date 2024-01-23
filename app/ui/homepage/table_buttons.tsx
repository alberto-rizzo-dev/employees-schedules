import { deleteWorkShift,updateWorkShift } from '@/app/lib/actions';
import {TrashIcon, PencilIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
  
export function DeleteShift({ id }: { id: number }) {
  const deleteShift = deleteWorkShift.bind(null, id);

  return (
    <form action={deleteShift}>
      <button className="rounded-md border p-2 b bg-red-400 hover:bg-red-500">
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}

export function EditiShift({ id }: { id: number }) { 
  return (
      <Link
        href={`/${id}/edit`}
        className="flex justify-center rounded-md border py-2 hover:bg-gray-50 bg-gray-200"
      >
        <PencilIcon className="h-4" />
      </Link>
  );
}