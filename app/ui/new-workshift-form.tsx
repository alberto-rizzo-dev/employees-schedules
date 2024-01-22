import { Employee } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { insertWorkshift } from '@/app/lib/actions';

export default function Form({ employees }: { employees: Employee[] }) {
  return (
    <form action={insertWorkshift} className='flex flex-col justify-center items-center'>
      <div className="md:rounded-md md:bg-orange-50 md:shadow-md md:w-[90%] p-6 shadow-none w-full rounded-none">
        {/* Select employee */}
        <div className="mb-4">
          <label htmlFor="employee" className="mb-2 block">
            Select an employee
          </label>
          <div className="relative">
            <select
              id="employeeId"
              name="employeeId"
              className="peer block w-full cursor-pointer rounded-xl border border-gray-200 py-2 outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select an employee
              </option>
              {employees.map((employe) => (
                <option key={employe.id} value={employe.id}>
                  {employe.name+" "+employe.surname}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* start turn at */}
        <div className="mb-4">
          <label htmlFor="start" className="mb-2 block">
            Write date and time of start of shift
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="start"
                name="start"
                placeholder="ex. 2023-10-31 10:00"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/*end turn at */}
        <div className="mb-4">
          <label htmlFor="end" className="mb-2 block">
            Write date and time of end of shift
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="end"
                name="end"
                placeholder="ex. 2023-10-31 10:00"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-orange-50 px-4 transition-colors hover:bg-orange-200">
          Go back to Homepage
        </Link>
        <Button type="submit">Insert Workshift</Button>
      </div>
    </form>
  );
}
