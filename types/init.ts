import { BugDataProps, OrgDataProps, ProjectDataProps, UserDataProps } from "./types";

export const UserDataInit: UserDataProps = {
  full_name: "",
  email_address: "",
  photo_url: "",
  phone_number: "",
  user_id: "",
  org_refs: [],
};

export const OrgDataInit: OrgDataProps = {
  image_url: "",
  org_id: "",
  org_name: "Select Organization",
  org_url: "",
  org_details: '',
  role: 'Admin',
  org_address: '',
  phone_number: ''
};

export const ProjectDataInit: ProjectDataProps = {
  project_id: "",
  org_id: "",
  project_description: "",
  project_name: "",
  team_members: [],
  date_start: new Date(),
  date_end: new Date(),
  photo_url: ""
}
export const BugDataInit: BugDataProps = {
  bug_description: "",
  bug_name: "",
  due_date: new Date(),
  org_id: "",
  priority: "",
  project_id: "",
  status: "",
  label: "bug",
  severity: "",
  bug_id: "",
}