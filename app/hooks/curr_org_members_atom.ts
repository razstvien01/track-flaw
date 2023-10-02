import { atom, useAtom } from 'jotai';
import { OrgMembersType } from '../types/types';


export const currOrgMemberAtom = atom<OrgMembersType[]>([]);

export function useCurrOrgMemberAtom() {
  return useAtom(currOrgMemberAtom);
}
