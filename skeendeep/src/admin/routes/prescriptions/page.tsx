import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Button, Heading } from "@medusajs/ui"
import { Plus } from "@medusajs/icons"
import { useState } from "react"
import {
  DataTable,
  DataTableRowSelectionState,
  DataTablePaginationState,
  createDataTableColumnHelper,
  useDataTable,
} from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/client"
import { CreatePrescriptionModal } from "./components/create-prescription-modal"
import { EditPrescriptionDrawer } from "./components/edit-prescription-drawer"

type Prescription = {
  id: string
  customer_id: string
  product_id: string
  diagnosis: string
  usage_instructions: string
  admin_notes: string | null
  expires_at: Date | null
  quantity_limit: number
  remaining_quantity: number
  prescribed_by: string
  prescribed_at: Date
  is_active: boolean
  created_at: Date
  updated_at: Date
  customer?: any
  product?: any
}

const columnHelper = createDataTableColumnHelper<Prescription>()

const PrescriptionsPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [rowSelection, setRowSelection] = useState<DataTableRowSelectionState>({})
  const [searchValue, setSearchValue] = useState("")
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageIndex: 0,
    pageSize: 15,
  })

  const limit = pagination.pageSize
  const offset = pagination.pageIndex * limit

  // Fetch prescriptions with search and pagination
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await sdk.client.fetch<{
        prescriptions: Prescription[]
        count: number
      }>(`/admin/prescriptions?limit=${limit}&offset=${offset}`)
      return response
    },
    queryKey: ["prescriptions", limit, offset, searchValue],
    keepPreviousData: true,
  })

  const columns = [
    columnHelper.accessor("customer", {
      header: "Customer",
      cell: ({ getValue }) => {
        const customer = getValue()
        return customer ? `${customer.first_name} ${customer.last_name}` : "N/A"
      },
    }),
    columnHelper.accessor("product", {
      header: "Product",
      cell: ({ getValue }) => {
        const product = getValue()
        return product?.title || "N/A"
      },
    }),
    columnHelper.accessor("diagnosis", {
      header: "Diagnosis",
      cell: ({ getValue }) => {
        const diagnosis = getValue()
        return diagnosis.length > 50 ? `${diagnosis.substring(0, 50)}...` : diagnosis
      },
    }),
    columnHelper.accessor("expires_at", {
      header: "Expires",
      cell: ({ getValue }) => {
        const date = getValue()
        return date ? new Date(date).toLocaleDateString() : "Never"
      },
    }),
    columnHelper.accessor("remaining_quantity", {
      header: "Remaining",
      cell: ({ row }) => {
        return `${row.original.remaining_quantity} / ${row.original.quantity_limit}`
      },
    }),
    columnHelper.accessor("is_active", {
      header: "Status",
      cell: ({ getValue }) => {
        return getValue() ? (
          <span className="text-ui-fg-success">Active</span>
        ) : (
          <span className="text-ui-fg-subtle">Inactive</span>
        )
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          size="small"
          variant="secondary"
          onClick={() => {
            setSelectedPrescription(row.original)
            setEditDrawerOpen(true)
          }}
        >
          Edit
        </Button>
      ),
    }),
  ]

  const table = useDataTable({
    data: data?.prescriptions || [],
    columns,
    getRowId: (prescription) => prescription.id,
    rowCount: data?.count || 0,
    isLoading,
    rowSelection: {
      state: rowSelection,
      onRowSelectionChange: setRowSelection,
    },
    search: {
      state: searchValue,
      onSearchChange: setSearchValue,
    },
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  })

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Prescriptions</Heading>
        <Button size="small" onClick={() => setCreateModalOpen(true)}>
          <Plus />
          Create Prescription
        </Button>
      </div>

      <div className="px-6 py-4">
        <DataTable instance={table}>
          <DataTable.Toolbar>
            <div className="flex gap-2">
              <DataTable.Search placeholder="Search prescriptions..." />
            </div>
          </DataTable.Toolbar>
          <DataTable.Table />
          <DataTable.Pagination />
        </DataTable>
      </div>

      <CreatePrescriptionModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      {selectedPrescription && (
        <EditPrescriptionDrawer
          open={editDrawerOpen}
          onOpenChange={setEditDrawerOpen}
          prescription={selectedPrescription}
        />
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Prescriptions",
})

export default PrescriptionsPage
