import { MedusaService } from "@medusajs/framework/utils"
import Prescription from "./models/prescription"

class PrescriptionModuleService extends MedusaService({
  Prescription,
}) {}

export default PrescriptionModuleService
