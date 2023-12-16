import { ROLES } from '@/types/constants';
import { atom, useAtom } from 'jotai';

export const currRoleAtom = atom<ROLES | null>(null);

export function useCurrRoleAtom() {
  return useAtom(currRoleAtom);
}
