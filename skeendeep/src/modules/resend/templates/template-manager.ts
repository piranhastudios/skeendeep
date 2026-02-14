import fs from "fs"
import path from "path"

type TemplateData = Record<string, any>

export class TemplateManager {
  private templatesPath: string
  private cache: Map<string, string> = new Map()
  private useCache: boolean

  constructor(templatesPath?: string, useCache: boolean = true) {
    this.templatesPath = templatesPath || path.join(__dirname)
    this.useCache = useCache
  }

  /**
   * Load template from file system
   * Caches templates for performance unless cache is disabled
   */
  private loadTemplate(templateName: string): string {
    if (this.useCache && this.cache.has(templateName)) {
      return this.cache.get(templateName)!
    }

    const templatePath = path.join(this.templatesPath, `${templateName}.html`)
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template ${templateName} not found at ${templatePath}`)
    }

    const template = fs.readFileSync(templatePath, "utf-8")
    
    if (this.useCache) {
      this.cache.set(templateName, template)
    }
    
    return template
  }

  /**
   * Replace template variables with actual data
   * Supports simple variable replacement: {{variable_name}}
   */
  private replaceVariables(template: string, data: TemplateData): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match
    })
  }

  /**
   * Render a template with the provided data
   * @param templateName - Name of the template file (without .html extension)
   * @param data - Object containing variables to replace in the template
   * @returns Rendered HTML string
   */
  render(templateName: string, data: TemplateData): string {
    const template = this.loadTemplate(templateName)
    return this.replaceVariables(template, data)
  }

  /**
   * Clear template cache
   * @param templateName - Optional specific template to clear, otherwise clears all
   */
  clearCache(templateName?: string): void {
    if (templateName) {
      this.cache.delete(templateName)
    } else {
      this.cache.clear()
    }
  }

  /**
   * Check if a template exists
   * @param templateName - Name of the template to check
   */
  hasTemplate(templateName: string): boolean {
    const templatePath = path.join(this.templatesPath, `${templateName}.html`)
    return fs.existsSync(templatePath)
  }

  /**
   * Set custom templates path (useful for loading from CDN in the future)
   * @param templatesPath - New path to templates directory
   */
  setTemplatesPath(templatesPath: string): void {
    this.templatesPath = templatesPath
    this.clearCache() // Clear cache when path changes
  }
}
