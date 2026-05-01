import { Drawer, Button, Input, Label, Textarea, Switch, toast, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../../lib/client"

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

type EditPrescriptionDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  prescription: Prescription
}

export const EditPrescriptionDrawer = ({ open, onOpenChange, prescription }: EditPrescriptionDrawerProps) => {
  const [formData, setFormData] = useState({
    diagnosis: "",
    usage_instructions: "",
    admin_notes: "",
    expires_at: "",
    quantity_limit: 1,
    remaining_quantity: 0,
    is_active: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const queryClient = useQueryClient()

  // Initialize form data when prescription changes
  useEffect(() => {
    if (prescription) {
      setFormData({
        diagnosis: prescription.diagnosis,
        usage_instructions: prescription.usage_instructions,
        admin_notes: prescription.admin_notes || "",
        expires_at: prescription.expires_at
          ? new Date(prescription.expires_at).toISOString().split("T")[0]
          : "",
        quantity_limit: prescription.quantity_limit,
        remaining_quantity: prescription.remaining_quantity,
        is_active: prescription.is_active,
      })
    }
  }, [prescription])

  const updatePrescription = useMutation({
    mutationFn: async (data: any) => {
      const response = await sdk.client.fetch(`/admin/prescriptions/${prescription.id}`, {
        method: "POST",
        body: data,
      })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] })
      queryClient.invalidateQueries({ queryKey: ["prescription", prescription.id] })
      toast.success("Prescription updated successfully")
      onOpenChange(false)
      setErrors({})
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update prescription")
    },
  })

  const deletePrescription = useMutation({
    mutationFn: async () => {
      const response = await sdk.client.fetch(`/admin/prescriptions/${prescription.id}`, {
        method: "DELETE",
      })
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] })
      toast.success("Prescription deleted successfully")
      onOpenChange(false)
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete prescription")
    },
  })

  const handleSubmit = () => {
    // Validate
    const newErrors: Record<string, string> = {}
    if (!formData.diagnosis) newErrors.diagnosis = "Diagnosis is required"
    if (!formData.usage_instructions) newErrors.usage_instructions = "Usage instructions are required"
    if (formData.quantity_limit < 1) newErrors.quantity_limit = "Quantity limit must be at least 1"
    if (formData.remaining_quantity < 0) newErrors.remaining_quantity = "Remaining quantity cannot be negative"
    if (formData.remaining_quantity > formData.quantity_limit) {
      newErrors.remaining_quantity = "Remaining quantity cannot exceed quantity limit"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    updatePrescription.mutate({
      ...formData,
      expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
    })
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this prescription? This action cannot be undone.")) {
      deletePrescription.mutate()
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit Prescription</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body className="flex-1 overflow-auto p-4">
          <div className="flex flex-col gap-y-4">
            {/* Display read-only info */}
            <div className="bg-ui-bg-subtle rounded-md p-4">
              <Text size="small" weight="plus" className="mb-2">
                Prescription Details
              </Text>
              <div className="flex flex-col gap-y-1">
                <Text size="small" className="text-ui-fg-subtle">
                  Customer: {prescription.customer?.first_name} {prescription.customer?.last_name}
                </Text>
                <Text size="small" className="text-ui-fg-subtle">
                  Product: {prescription.product?.title}
                </Text>
                <Text size="small" className="text-ui-fg-subtle">
                  Prescribed: {new Date(prescription.prescribed_at).toLocaleDateString()}
                </Text>
              </div>
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
              <Label>Admin Notes</Label>
              <Textarea
                value={formData.admin_notes}
                onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                placeholder="Enter any internal notes"
                rows={2}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Expiration Date</Label>
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

            <div className="flex flex-col gap-y-2">
              <Label>Remaining Quantity *</Label>
              <Input
                type="number"
                min="0"
                value={formData.remaining_quantity}
                onChange={(e) => setFormData({ ...formData, remaining_quantity: parseInt(e.target.value) || 0 })}
              />
              {errors.remaining_quantity && (
                <span className="text-ui-fg-error text-sm">{errors.remaining_quantity}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label>Active Status</Label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>
        </Drawer.Body>

        <Drawer.Footer>
          <div className="flex items-center justify-between w-full">
            <Button
              size="small"
              variant="danger"
              onClick={handleDelete}
              disabled={deletePrescription.isPending || updatePrescription.isPending}
              isLoading={deletePrescription.isPending}
            >
              Delete
            </Button>
            <div className="flex items-center gap-x-2">
              <Drawer.Close asChild>
                <Button
                  size="small"
                  variant="secondary"
                  disabled={updatePrescription.isPending}
                >
                  Cancel
                </Button>
              </Drawer.Close>
              <Button
                size="small"
                onClick={handleSubmit}
                isLoading={updatePrescription.isPending}
              >
                Save
              </Button>
            </div>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}
