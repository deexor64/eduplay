// user types
export type UserType = "ADMIN" | "TEACHER" | "PARENT" | "STUDENT" | "UNKNOWN";

// view mode
export type TemplateViewMode = "VIEW" | "PREVIEW" | "SAMPLE" | "CREATE";

// server response type
export type ResType = {
  status: boolean, 
  resDataType: "message" | "data" | "log" | "error" | "warning" | "success",
  data: any
}

export enum UserPermission {
  DEFAULT = 0,
  CREATE_USER = 1,
  MAX  = 100,
}
