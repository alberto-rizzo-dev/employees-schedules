import { Suspense } from "react";
import { EmployeesTable, TableSkeleton } from "./ui/homepage/table";
import Search from "./ui/homepage/search";
import { fetchTablePages } from "./lib/db-connection";
import TablePagesIndex from "./ui/homepage/table-pages-index";

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const page = Number(searchParams?.page) || 1;
    const totalPages = await fetchTablePages(query);

    return (    
        <div className="p-10 flex-column justify-center items-center">
            <div className="pb-3"><Search placeholder="Cerca turni..." /></div>
            <Suspense key={query + page} fallback={<TableSkeleton/>}>
                <EmployeesTable query={query} currentPage={page}/>
            </Suspense>
            <div className="pt-3"><TablePagesIndex totalPages={totalPages} /></div>
        </div>
    );
}