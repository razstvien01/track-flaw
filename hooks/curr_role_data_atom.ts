import { atom, useAtom } from 'jotai';
import { OrgMembersType } from '../types/types';


export const currRoleAtom = atom(null);

export function useCurrOrgMemberAtom() {
  return useAtom(currRoleAtom);
}
