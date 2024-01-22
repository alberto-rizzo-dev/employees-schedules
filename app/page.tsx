import { Suspense } from "react";
import { EmployeesTable, TableSkeleton } from "./ui/table";

export default function Page() {
    return (    
        <Suspense fallback={<TableSkeleton/>}><EmployeesTable/></Suspense>
    );
}