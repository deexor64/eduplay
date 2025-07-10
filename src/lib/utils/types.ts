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

// teacher role
export type TeacherRole = "MASTER" | "ADMIN" | "TEACHER" | "DEMONSTRATOR" | "UNKNOWN";

export enum TeacherRoleEnum {
  MASTER = "MASTER",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  DEMONSTRATOR = "DEMONSTRATOR",
}

// template view mode
export type TemplateViewMode = "VIEW" | "PREVIEW" | "SAMPLE" | "CREATE";

// api response type
export type ResType = {
  status: boolean, 
  resDataType: "message" | "data" | "log" | "error" | "warning" | "success",
  data: any
}
