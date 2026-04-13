import { Search } from "lucide-react"
import { useMemo, useState } from "react"
import { useTable } from "@refinedev/react-table"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ListView } from "@/components/refine-ui/views/list-view"
import { CreateButton } from "@/components/refine-ui/buttons/create"
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { ShowButton } from "@/components/refine-ui/buttons/show"
import { DeleteButton } from "@/components/refine-ui/buttons/delete"

import { Category } from "@/types"

const CategoriesList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const categoryColumns = useMemo<ColumnDef<Category>[]>(() => [
    {
      id: "id",
      accessorKey: "id",
      size: 50,
      header: () => <p className="column-title ml-2">ID</p>,
      cell: ({ getValue }) => <Badge>{getValue<number>()}</Badge>
    },
    {
      id: "name",
      accessorKey: "name",
      size: 200,
      header: () => <p>Name</p>,
      cell: ({ getValue, row }) => <Badge style={{ backgroundColor: row.original.color, color: "white"}}>{getValue<string>()}</Badge>,
      filterFn: "includesString",
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      size: 200,
      header: () => <p className="ml-2">Created At</p>,
      cell: ({ getValue }) => <p>{getValue<string>()}</p>,
    },
    {
      id: "details",
      size: 140,
      header: () => <p className="ml-2">Details</p>,
      cell: ({ row }) => (
        <ShowButton resource="categories" recordItemId={row.original.id} variant="outline" size="sm">
          View
        </ShowButton>
      ),
    },
    {
      id: "delete",
      size: 140,
      header: () => <p>Delete</p>,
      cell: ({ row }) => {
         return <DeleteButton resource="categories" recordItemId={row.original.id}>Delete</DeleteButton>
      }
    }
  ],
  [])

  const searchFilters = searchQuery
    ? [
      {
        field: "name",
        operator: "contains" as const,
        value: searchQuery
      }
    ]
    : []

  const categoriesTable = useTable({
    columns: categoryColumns,
    refineCoreProps: {
      resource: "categories",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        permanent: searchFilters,
      },
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Categories</h1>

      <div className="intro-row">
        <p className="text-muted-foreground">Quick access to ensential Categories.</p>

        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <Input 
              type="text"
              placeholder="Search..."
              className="pl-10 w-full"
              aria-label="Search Categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <CreateButton resource="categories" />
          </div>
        </div>
      </div>

      <DataTable table={categoriesTable} />
      
    </ListView>
  )
}

export default CategoriesList