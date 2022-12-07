import { atom, selector } from 'recoil';

// Apple Music User ID State
export const userIdState = atom<string | null>({
  key: 'userIdState',
  default: null,
});

export const userConnectedState = selector<boolean>({
  key: 'userConnectedState',
  get: ({ get }) => {
    const userToken = get(userIdState);
    return userToken !== null;
  },
});
