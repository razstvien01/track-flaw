import { atom, useAtom } from 'jotai';
import { OrgDataProps } from '../types/types';
import { OrgDataInit } from '../types/init';

export const currOrgDataAtom = atom<OrgDataProps>(OrgDataInit);

export function useUserDataAtom() {
  return useAtom(currOrgDataAtom);
}
