// subject
export type Subject = "MATHEMATICS" | "SCIENCE" | "ENGLISH" | "COMMON";

export enum SubjectEnum {
  COMMON = "COMMON",
  MATHEMATICS = "MATHEMATICS",
  SCIENCE = "SCIENCE",
  ENGLISH = "ENGLISH",  
}

// grade
export type Grade = 1 | 2 | 3 | 4 | 5;

export enum GradeEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

// user types
export type UserType = "TEACHER" | "PARENT" | "STUDENT" | "UNKNOWN";

export enum UserTypeEnum {
  UNKNOWN = "UNKNOWN",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
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
  UNKNOWN = "UNKNOWN",
  MASTER = "MASTER",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  DEMONSTRATOR = "DEMONSTRATOR",
}

// template view mode
export type TemplateViewMode = "VIEW" | "SAMPLE" | "PROGRESS" | "CREATE";

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
  setActivityFinerlizer: React.Dispatch<React.SetStateAction<((fileUrlMap: Map<string, string> | false) => string)>>,
}

// activity difficulty
export type ActivityDifficulty = "EASY" | "MEDIUM" | "HARD";

export enum ActivityDifficultyEnum {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

// activity status
export type ActivityStatus = "UNPUBLISHED" | "PUBLISHED" | "DELETED";

export enum ActivityStatusEnum {
  UNPUBLISHED = "UNPUBLISHED",
  PUBLISHED = "PUBLISHED",
  DELETED = "DELETED",
}

export type ActivityGrade = "1" | "2" | "3" | "4" | "5" | "ALL";

export enum ActivityGradeEnum {
  ALL = "ALL",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
}
