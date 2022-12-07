import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// Apple Music User ID State
export const userIdState = atom<string | null>({
  key: 'userIdState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userConnectedState = selector<boolean>({
  key: 'userConnectedState',
  get: ({ get }) => {
    const userToken = get(userIdState);
    return userToken !== null;
  },
});
