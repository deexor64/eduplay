// user types
export type UserType = "TEACHER" | "PARENT" | "STUDENT" | "UNKNOWN";

export enum UserTypeEnum {
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
  UNKNOWN = "UNKNOWN",
}

// user status
export type UserStatus = "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";

export enum UserStatusEnum {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

// user permission
export enum UserPermission {
  DEFAULT = 0,
  PARENT = 25,
  STUDENT = 50,
  TEACHER = 75,
  APPROVE_USER = 76,
  REMOVE_USER = 77,
  MAX  = 100,
}

// template view mode
export type TemplateViewMode = "VIEW" | "PREVIEW" | "SAMPLE" | "CREATE";

// api response type
export type ResType = {
  status: boolean, 
  resDataType: "message" | "data" | "log" | "error" | "warning" | "success",
  data: any
}

