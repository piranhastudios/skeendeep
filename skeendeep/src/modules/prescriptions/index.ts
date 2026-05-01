import PrescriptionModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const PRESCRIPTION_MODULE = "prescriptions"

export default Module(PRESCRIPTION_MODULE, {
  service: PrescriptionModuleService,
})
