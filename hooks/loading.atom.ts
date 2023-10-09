import { atom, useAtom } from 'jotai';

export const loadingAtom = atom<boolean>(true);

export function useLoadingAtom() {
  return useAtom(loadingAtom);
}
