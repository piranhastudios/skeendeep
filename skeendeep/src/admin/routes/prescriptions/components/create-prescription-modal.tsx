import { FocusModal, Button, Input, Label, Textarea, Select, toast } from "@medusajs/ui"
import { useState } from "react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { sdk } from "../../../lib/client"

type CreatePrescriptionModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreatePrescriptionModal = ({ open, onOpenChange }: CreatePrescriptionModalProps) => {
  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    diagnosis: "",
    usage_instructions: "",
    admin_notes: "",
    expires_at: "",
    quantity_limit: 1,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const queryClient = useQueryClient()

  // Fetch customers for selection
  const { data: customersData } = useQuery({
    queryFn: () => sdk.admin.customer.list({ limit: 100 }),
    queryKey: ["customers-list"],
    enabled: open,
  })

  // Fetch products for selection (filter by prescription tag would be ideal)
  const { data: productsData } = useQuery({
    queryFn: () => sdk.admin.product.list({ limit: 100 }),
    queryKey: ["products-list"],
    enabled: open,
  })

  const createPrescription = useMutation({
    mutationFn: async (data: any) => {
      const response = await sdk.client.fetch("/admin/prescriptions", {
        method: "POST",
        body: data,
      })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] })
      toast.success("Prescription created successfully")
      onOpenChange(false)
      setFormData({
        customer_id: "",
        product_id: "",
        diagnosis: "",
        usage_instructions: "",
        admin_notes: "",
        expires_at: "",
        quantity_limit: 1,
      })
      setErrors({})
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create prescription")
    },
  })

  const handleSubmit = () => {
    // Validate
    const newErrors: Record<string, string> = {}
    if (!formData.customer_id) newErrors.customer_id = "Customer is required"
    if (!formData.product_id) newErrors.product_id = "Product is required"
    if (!formData.diagnosis) newErrors.diagnosis = "Diagnosis is required"
    if (!formData.usage_instructions) newErrors.usage_instructions = "Usage instructions are required"
    if (formData.quantity_limit < 1) newErrors.quantity_limit = "Quantity limit must be at least 1"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    createPrescription.mutate({
      ...formData,
      expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
    })
  }

  return (
    <FocusModal open={open} onOpenChange={onOpenChange}>
      <FocusModal.Content>
        <div className="flex h-full flex-col overflow-hidden">
          <FocusModal.Header>
            <div className="flex items-center justify-end gap-x-2">
              <FocusModal.Close asChild>
                <Button
                  size="small"
                  variant="secondary"
                  disabled={createPrescription.isPending}
                >
                  Cancel
                </Button>
              </FocusModal.Close>
              <Button
                size="small"
                onClick={handleSubmit}
                isLoading={createPrescription.isPending}
              >
                Create
              </Button>
            </div>
          </FocusModal.Header>

          <FocusModal.Body className="flex-1 overflow-auto">
            <div className="flex flex-col gap-y-4 p-6">
              <div className="flex flex-col gap-y-2">
                <Label>Customer *</Label>
                <Select
                  value={formData.customer_id}
                  onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select a customer" />
                  </Select.Trigger>
                  <Select.Content>
                    {customersData?.customers?.map((customer) => (
                      <Select.Item key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name} ({customer.email})
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
                {errors.customer_id && (
                  <span className="text-ui-fg-error text-sm">{errors.customer_id}</span>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Product *</Label>
                <Select
                  value={formData.product_id}
                  onValueChange={(value) => setFormData({ ...formData, product_id: value })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select a product" />
                  </Select.Trigger>
                  <Select.Content>
                    {productsData?.products?.map((product) => (
                      <Select.Item key={product.id} value={product.id}>
                        {product.title}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
                {errors.product_id && (
                  <span className="text-ui-fg-error text-sm">{errors.product_id}</span>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Diagnosis *</Label>
                <Textarea
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  placeholder="Enter diagnosis"
                  rows={3}
                />
                {errors.diagnosis && (
                  <span className="text-ui-fg-error text-sm">{errors.diagnosis}</span>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Usage Instructions *</Label>
                <Textarea
                  value={formData.usage_instructions}
                  onChange={(e) => setFormData({ ...formData, usage_instructions: e.target.value })}
                  placeholder="Enter usage instructions"
                  rows={3}
                />
                {errors.usage_instructions && (
                  <span className="text-ui-fg-error text-sm">{errors.usage_instructions}</span>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Admin Notes (Optional)</Label>
                <Textarea
                  value={formData.admin_notes}
                  onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                  placeholder="Enter any internal notes"
                  rows={2}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Expiration Date (Optional)</Label>
                <Input
                  type="date"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Quantity Limit *</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.quantity_limit}
                  onChange={(e) => setFormData({ ...formData, quantity_limit: parseInt(e.target.value) || 1 })}
                />
                {errors.quantity_limit && (
                  <span className="text-ui-fg-error text-sm">{errors.quantity_limit}</span>
                )}
              </div>
            </div>
          </FocusModal.Body>
        </div>
      </FocusModal.Content>
    </FocusModal>
  )
}
