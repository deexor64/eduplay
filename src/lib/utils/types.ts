// user types
export type UserType = "ADMIN" | "TEACHER" | "PARENT" | "STUDENT" | "UNKNOWN";

// view mode
export type TemplateViewMode = "VIEW" | "PREVIEW" | "INSPECT" | "CREATE";

// server response type
export type ResType = {
  status: boolean, 
  resDataType: "message" | "data" | "log" | "error" | "warning" | "success",
  data: any
}
