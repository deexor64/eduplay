
// client request type
export type PostReqType = {
  userType: string,
  formData: any,
}

// server response type
export type ResType = {
  status: boolean, 
  resDataType: "message" | "data" | "log" | "error" | "warning" | "success",
  data: any
}
