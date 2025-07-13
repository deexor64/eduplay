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

// templates props
export interface ViewActivityProps {
  activityData: any;
  setResultValidator: React.Dispatch<React.SetStateAction<(() => { status: boolean, message: string})>>,
  setResultData: React.Dispatch<React.SetStateAction<() => any>>,
  setResultGrader: React.Dispatch<React.SetStateAction<((workedData: any) => 
    { grading: any, examinerDialog: string, impression: "HELP" | "OKAY" | "GOOD"})>>,
}

export interface CreateActivityProps {
  setActivityValidator: React.Dispatch<React.SetStateAction<(() => { status: boolean, message: string})>>,
  setMediaFiles: React.Dispatch<React.SetStateAction<Map<string, File>>>,
  setActivityFinerlizer: React.Dispatch<React.SetStateAction<((fileUrlMap: Map<string, string>) => any)>>,
}
