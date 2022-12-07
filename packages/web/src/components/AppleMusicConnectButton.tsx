import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, QueryDocumentSnapshot, setDoc } from 'firebase/firestore';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { firestore } from '../firebase';
import { userIdState } from '../states';

export function AppleMusicConnectButton() {
  const [value, loading, error] = useCollection(collection(firestore, 'musicKitDeveloperTokens'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const setUserId = useSetRecoilState(userIdState);

  const requestAuth = async (developerTokenDocument: QueryDocumentSnapshot) => {
    if (!value) return;

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
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <span>
          {value.docs.map((doc) => (
            <div key={doc.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <React.Fragment key={doc.id}>Developer Token ID : {doc.id}</React.Fragment>
              <button type="button" onClick={() => requestAuth(doc)}>
                Authorize
              </button>
            </div>
          ))}
        </span>
      )}
    </div>
  );
}
