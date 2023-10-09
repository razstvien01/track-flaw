export const MAIN_COMPONENTS: Record<string, string> = {
  DASHBOARD: "DASHBOARD",
  PROJECTS: "PROJECTS",
  TEAMS: "TEAMS",
  BUGS: "BUGS",
};

export enum ROLES {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  TESTER = 'Tester',
  DEVELOPER = 'Developer'
}

export enum ORG_QUERY {
  GET_ORGS = "GET_ORGS",
  ADD_ORG = "ADD_ORG",
  UPDATE_ORG = "UPDATE_ORG",
  GET_ORG_MEMBERS = "GET_ORG_MEMBERS",
  ADD_ORG_MEMBER = "ADD_ORG_MEMBER",
  DELETE_ORG = 'DELETE_ORG',
  REMOVE_ORG_MEMBER = 'REMOVE_ORG_MEMBER'
}