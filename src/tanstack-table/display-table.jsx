import { columns } from "./columns";
import { DataTable } from "./data-table";
import { columnsMobile } from "./columns-mobile";

export default function DisplayTable({
  role,
  setRole,
  fetchedData,
  fetchData,
  searchString,
  setSearchString,
  sort,
  setSort,
}) {
  return (
    <>
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={fetchedData}
          fetchData={fetchData}
          role={role}
          setRole={setRole}
          searchString={searchString}
          setSearchString={setSearchString}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <div className="md:hidden">
        <DataTable
          columns={columnsMobile}
          data={fetchedData}
          fetchData={fetchData}
          role={role}
          setRole={setRole}
          searchString={searchString}
          setSearchString={setSearchString}
          sort={sort}
          setSort={setSort}
        />
      </div>
    </>
  );
}
