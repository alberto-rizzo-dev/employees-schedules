import { Employee } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CalendarDaysIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';

export default function Form({ employees }: { employees: Employee[] }) {
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="employee" className="mb-2 block">
            Seleziona il dipendente
          </label>
          <div className="relative">
            <select
              id="employee"
              name="employeeId"
              className="peer block w-full cursor-pointer rounded-xl border border-gray-200 py-2 outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Seleziona il dipendente
              </option>
              {employees.map((employe) => (
                <option key={employe.id} value={employe.id}>
                  {employe.name}
                </option>
              ))}
            </select>
            <p> ciao? </p>
            <></><UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="start_date" className="mb-2 block">
            Scrivi data e ora di inizio turno
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="start_date"
                name="start_date"
                type="date"
                placeholder="es. 2023-10-31 10:00"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="end_date" className="mb-2 block">
            Scrivi data e ora di fine turno
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="end_date"
                name="end_date"
                type="date"
                placeholder="es. 2023-10-31 10:00"
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
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Torna alla home
        </Link>
        <Button type="submit">Inserisci Turno</Button>
      </div>
    </form>
  );
}
