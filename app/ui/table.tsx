import { fetchTableData } from "../lib/db-connection";

export async function EmployeesTable({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) 
{
    const rows = await fetchTableData(query,currentPage);
    return (
    <div className="display flex justify-center items-center">
        <table className="min-w-full text-gray-900 table bg-orange-300 rounded-lg shadow-md">
        <thead className="rounded-lg text-left text-sm font-normal">
        <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            <th scope="col" className="p-4 font-medium">
                Nome
            </th>
            <th scope="col" className="p-4 font-medium">
                Cognome
            </th>
            <th scope="col" className="p-4 font-medium hidden lg:table-cell">
                Ruolo
            </th>
            <th scope="col" className="p-4 font-medium">
                Inizio Turno
            </th>
            <th scope="col" className="p-4 font-medium hidden lg:table-cell">
                Fine Turno
            </th>
            <th scope="col" className="p-4 font-medium hidden lg:table-cell">
                Durata turno
            </th>
            <th scope="col" className="p-4 font-medium"/>
        </tr>
        </thead>
        <tbody className="bg-white ">
        {rows?.map((row) => (
            <tr
            key={row.workshift_id}
            className="odd:bg-orange-50 w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
            <td className="p-3">
                {row.name}
            </td>
            <td className="p-3">
                {row.surname}
            </td>
            <td className="p-3 hidden lg:table-cell">
                {row.role}
            </td>
            <td className="p-3">
                {row.start_date.toDateString()}
            </td>
            <td className="p-3 hidden lg:table-cell">
                {row.end_date.toDateString()}
            </td>
            <td className="p-3 hidden lg:table-cell">
                {"xxx"}
            </td>
            <td className="p-3">
                {"elimina"}
            </td>
            </tr>
        ))}
        </tbody>
        </table>
    </div>
);
}

export function TableSkeleton() {
    return (
        <div className="display flex justify-center items-center w-full"><div className="w-full h-64 bg-gray-100 rounded-lg"/></div>
    );
}