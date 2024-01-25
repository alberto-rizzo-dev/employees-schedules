import { insertEmployee } from '@/app/lib/actions';
import { Button } from '../submit-button';

export default function Form() {
  const roles: string[] = ['worker','manager' , 'office worker' , 'manager'];
  return (
    <form action={insertEmployee} className='flex flex-col justify-center items-center'>
      <div className="md:rounded-md md:bg-orange-50 md:shadow-md md:w-[90%] p-6 shadow-none w-full rounded-none">
        {/* name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block">
            Insert the name of the employee
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                required
                id="name"
                name="name"
                placeholder="Insert a name"
                className="pl-2 block w-full cursor-pointer rounded-xl border border-orange-200 focus:border-orange-500 focus:outline-none focus:ring-0 py-2 outline-2 placeholder:text-gray-500"
                />
            </div>
          </div>
        </div>
        {/*surname */}
        <div className="mb-4">
          <label htmlFor="surname" className="mb-2 block">
            Insert the surname of the employee
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                required
                id="surname"
                name="surname"
                placeholder="Insert a surname"
                className="pl-2 block w-full cursor-pointer rounded-xl border border-orange-200 focus:border-orange-500 focus:outline-none focus:ring-0 py-2 outline-2 placeholder:text-gray-500"
                />
            </div>
          </div>
        </div>
        {/* Select role */}
        <div className="mb-4">
          <label htmlFor="employee" className="mb-2 block">
            Select a role
          </label>
          <div className="relative">
            <select
              required
              id="role"
              name="role"
              className="pl-2 block w-full cursor-pointer rounded-xl border border-orange-200 focus:border-orange-500 focus:outline-none focus:ring-0 py-2 outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="my-6">
        <Button type="submit">Insert Employee </Button>
      </div>
    </form>
  );
}
