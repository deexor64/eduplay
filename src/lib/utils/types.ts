// user types
export type UserType = "ADMIN" | "TEACHER" | "PARENT" | "STUDENT" | "UNKNOWN";

// server response type
export type ResType = {
  status: boolean, 
  resDataType: "message" | "data" | "log" | "error" | "warning" | "success",
  data: any
}
