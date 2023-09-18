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
  personal: boolean
  role: string
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}