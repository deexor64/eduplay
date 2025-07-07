// user types
export type UserType = "TEACHER" | "PARENT" | "STUDENT" | "UNKNOWN";

export let userTypes: UserType[] = ["TEACHER", "PARENT", "STUDENT", "UNKNOWN"]

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
  PARENT = 25,
  STUDENT = 50,
  TEACHER = 75,
  APPROVE_USER = 76,
  REMOVE_USER = 77,
  MAX  = 100,
}
