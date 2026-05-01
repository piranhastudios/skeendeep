import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Text, Badge } from "@medusajs/ui"
import { Plus, PencilSquare } from "@medusajs/icons"
import { DetailWidgetProps, HttpTypes } from "@medusajs/framework/types"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../lib/client"
import { useState } from "react"
import { CreatePrescriptionModal } from "../routes/prescriptions/components/create-prescription-modal"
import { EditPrescriptionDrawer } from "../routes/prescriptions/components/edit-prescription-drawer"

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

const CustomerPrescriptionsWidget = ({ data: customer }: DetailWidgetProps<HttpTypes.AdminCustomer>) => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)

  // Fetch customer's prescriptions
  const { data: prescriptionsData, isLoading } = useQuery({
    queryFn: async () => {
      const response = await sdk.client.fetch<{
        prescriptions: Prescription[]
        count: number
      }>(`/admin/prescriptions?customer_id=${customer.id}`)
      return response
    },
    queryKey: ["customer-prescriptions", customer.id],
  })

  const prescriptions = prescriptionsData?.prescriptions || []

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Prescriptions</Heading>
        <Button size="small" onClick={() => setCreateModalOpen(true)}>
          <Plus />
          Add Prescription
        </Button>
      </div>

      <div className="px-6 py-4">
        {isLoading ? (
          <Text size="small" className="text-ui-fg-subtle">
            Loading prescriptions...
          </Text>
        ) : prescriptions.length === 0 ? (
          <Text size="small" className="text-ui-fg-subtle">
            No prescriptions found for this customer.
          </Text>
        ) : (
          <div className="flex flex-col gap-3">
            {prescriptions.map((prescription) => {
              const isExpired = prescription.expires_at && new Date(prescription.expires_at) < new Date()
              const isLowQuantity = prescription.remaining_quantity < prescription.quantity_limit * 0.2

              return (
                <div
                  key={prescription.id}
                  className="shadow-elevation-card-rest bg-ui-bg-component rounded-md px-4 py-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Text size="small" leading="compact" weight="plus">
                          {prescription.product?.title || "Product"}
                        </Text>
                        {prescription.is_active ? (
                          <Badge color="green" size="small">Active</Badge>
                        ) : (
                          <Badge color="grey" size="small">Inactive</Badge>
                        )}
                        {isExpired && (
                          <Badge color="red" size="small">Expired</Badge>
                        )}
                        {!isExpired && isLowQuantity && (
                          <Badge color="orange" size="small">Low Qty</Badge>
                        )}
                      </div>
                      <Text size="small" leading="compact" className="text-ui-fg-subtle mb-2">
                        {prescription.diagnosis.length > 80
                          ? `${prescription.diagnosis.substring(0, 80)}...`
                          : prescription.diagnosis}
                      </Text>
                      <div className="flex items-center gap-x-4">
                        <Text size="small" className="text-ui-fg-subtle">
                          Qty: {prescription.remaining_quantity}/{prescription.quantity_limit}
                        </Text>
                        {prescription.expires_at && (
                          <Text size="small" className="text-ui-fg-subtle">
                            Expires: {new Date(prescription.expires_at).toLocaleDateString()}
                          </Text>
                        )}
                        <Text size="small" className="text-ui-fg-subtle">
                          Prescribed: {new Date(prescription.prescribed_at).toLocaleDateString()}
                        </Text>
                      </div>
                    </div>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => {
                        setSelectedPrescription(prescription)
                        setEditDrawerOpen(true)
                      }}
                    >
                      <PencilSquare />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
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

export const config = defineWidgetConfig({
  zone: "customer.details.after",
})

export default CustomerPrescriptionsWidget
