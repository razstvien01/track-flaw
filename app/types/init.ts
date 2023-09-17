import { OrgDataProps, UserDataProps } from "./types";

export const UserDataInit: UserDataProps = {
  full_name: '',
  email_address: '',
  photo_url: '',
  phone_number: '',
  user_id: '',
  org_refs: []
}

export const OrgDataInit: OrgDataProps = {
  image_url: '',
  org_id: '',
  org_image: '',
  org_name: '',
  org_url: '',
  personal: false,
  role: 'Admin'
}