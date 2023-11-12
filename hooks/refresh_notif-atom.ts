import { atom, useAtom } from 'jotai';

export const refreshNotifAtom = atom<boolean>(false);

export function useRefreshNotif() {
  return useAtom(refreshNotifAtom);
}
