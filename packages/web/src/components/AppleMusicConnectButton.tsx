import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { firestore } from '../firebase';
import { userIdState } from '../states';

export function AppleMusicConnectButton() {
  const [value, loading, error] = useCollection(collection(firestore, 'musicKitDeveloperTokens'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const setUserId = useSetRecoilState(userIdState);

  const requestAuth = async () => {
    if (!value) return;

    const developerTokenDocument = value.docs[0];
    const instance = MusicKit.configure({
      developerToken: developerTokenDocument.get('token'),
    });
    const userToken = await instance.authorize();
    const userTokenDocRef = doc(collection(firestore, 'musicKitUserTokens'));
    await setDoc(userTokenDocRef, {
      developerTokenId: developerTokenDocument.id,
      token: userToken,
      createdAt: new Date(),
    });

    // Save the user id to the state
    setUserId(userTokenDocRef.id);
  };

  return (
    <div className="button" onClick={() => requestAuth()} role="presentation">
      Connect
      <div className="play-circle">
        <svg width="39" height="45" viewBox="0 0 39 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.89"
            d="M37 19.0359C39.6667 20.5755 39.6667 24.4245 37 25.9641L6.25001 43.7176C3.58334 45.2572 0.250002 43.3327 0.250002 40.2535L0.250003 4.74648C0.250003 1.66728 3.58334 -0.257224 6.25 1.28238L37 19.0359Z"
            fill="#FFDCDC"
          />
        </svg>
      </div>
    </div>
  );
}
