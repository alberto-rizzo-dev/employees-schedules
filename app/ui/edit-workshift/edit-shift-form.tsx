import { Employee, WorkShift } from '@/app/lib/definitions';
import {
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { updateWorkShift } from '@/app/lib/actions';
import { Button } from '../submit-button';

export default function Form({
    shift,
    employee,
  }: {
    shift: WorkShift;
    employee: string;
  }) 
 {
  const editWorkShift = updateWorkShift.bind(null,shift.id);
  return (
    <form action={editWorkShift} className='flex flex-col justify-center items-center'>
      <div className="md:rounded-md md:bg-orange-50 md:shadow-md md:w-[90%] p-6 shadow-none w-full rounded-none">
        <p className="text-center text-2xl font-bold mb-4">Edit Workshift of {employee}</p>
        {/* start turn at */}
        <div className="mb-4">
          <label htmlFor="start" className="mb-2 block">
            Insert date and time of start of shift
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                required
                id="start"
                name="start"
                placeholder="ex. 2023-10-31 10:00"
                defaultValue={shift.start_timestamp.toISOString().split('T')[0]}
                className="peer block w-full rounded-md  border border-orange-200 focus:border-orange-500 focus:outline-none focus:ring-0 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/*end turn at */}
        <div className="mb-4">
          <label htmlFor="end" className="mb-2 block">
            Insert date and time of end of shift
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                required
                id="end"
                name="end"
                placeholder="ex. 2023-10-31 10:00"
                defaultValue={shift.end_timestamp.toISOString().split('T')[0]}
                className="peer block w-full rounded-md  border border-orange-200 focus:border-orange-500 focus:outline-none focus:ring-0 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <Button type="submit">Update Workshift</Button>
      </div>
    </form>
  );
}
