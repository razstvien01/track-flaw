export interface UserDataProps {
  full_name: string
  email_address: string
  phone_number: string
  photo_url: string
  user_id: string
  org_refs: OrgDataProps[]
}

export interface OrgDataProps {
  image_url: string
  org_id: string
  org_name: string
  org_url: string
  org_details: string
  role: string
  org_address: string
  phone_number: string
}

export interface ProjectDataProps{
  project_name: string
  project_description: string
  date_start: Date
  date_end: Date
  team_members: []
  org_id: string
  photo_url: string
  project_id: string
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export interface OrgMembersType {
  user_id: string;
  full_name: string;
  photo_url: string;
  phone_number: string;
  role: string;
  email_address: string
}

export interface NotifIds {
  bug_id?: string;
  user_id?: string;
  project_id?: string;
  org_id?: string;
  org_ids?: string[]
}

export interface NotifData extends NotifIds {
  title: string;
  description: string;
  type: string;
  author: string;
  date: string;
  photo_url: string;
  time: any
}

export interface BugDataProps{
  bug_name: string
  bug_description: string
  due_date: Date
  priority: string
  org_id: string
  project_id: string
  status: string
  severity: string
}