export interface ResponseFormatter {
  (body?: any, options?: ResponseInit): Response
}
