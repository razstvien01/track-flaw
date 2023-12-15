export const MAIN_COMPONENTS: Record<string, string> = {
  DASHBOARD: "DASHBOARD",
  PROJECTS: "PROJECTS",
  // TEAMS: "TEAMS",
  // BUGS: "BUGS",
};

export enum ROLES {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  TESTER = 'Tester',
  DEVELOPER = 'Developer'
}

export enum PRIORITY {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export enum SEVERITY_LVLS {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  TRIVIAL = "TRIVIAL"
}

export enum BUG_STATUS {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN PROGRESS",
  DONE = "DONE",
  CANCELLED = "CANCELLED"
}

export enum ORG_QUERY {
  GET_ORGS = "GET_ORGS",
  GET_ORG_DETAILS = 'GET_ORG_DETAILS',
  ADD_ORG = "ADD_ORG",
  UPDATE_ORG = "UPDATE_ORG",
  GET_ORG_MEMBERS = "GET_ORG_MEMBERS",
  ADD_ORG_MEMBER = "ADD_ORG_MEMBER",
  DELETE_ORG = 'DELETE_ORG',
  REMOVE_ORG_MEMBER = 'REMOVE_ORG_MEMBER',
  UPDATE_MEMBER = 'UPDATE_MEMBER'
}

export enum PROJECT_QUERY {
  GET_PROJS_BY_ID = "GET_PROJS_BY_ID",
  GET_PROJ = "GET_PROJ",
  GET_PROJ_BY_ID = "GET_PROJ_BY_ID",
  GET_TEAM_MEMBERS = "GET_TEAM_MEMBERS",
  UPDATE_TEAM_MEMBERS = "UPDATE_TEAM_MEMBERS",
  REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER"
}


export enum BUG_QUERY {
  GET_BUGS_PROJ = "GET_BUGS_PROJ",
  DELETE_BUG_PROJ = "DELETE_BUG_PROJ"
}
