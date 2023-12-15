import { atom, useAtom } from 'jotai';

export const refreshBugProjAtom = atom<boolean>(false);

export function useRefreshBugProj() {
  return useAtom(refreshBugProjAtom);
}
