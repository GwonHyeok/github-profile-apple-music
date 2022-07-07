import React from 'react';
import { collection, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from './firebase';

import './App.css';

function AppleMusicConnectButton() {
  const [value, loading, error] = useCollection(collection(firestore, 'musicKitDeveloperTokens'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const requestAuth = async (developerTokenDocument: QueryDocumentSnapshot<DocumentData>) => {
    if (!value) return;

    const instance = MusicKit.configure({
      developerToken: developerTokenDocument.get('token'),
    });
    const userToken = await instance.authorize();
    console.log(developerTokenDocument.id, developerTokenDocument.get('token'), userToken);
  };

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <span>
          Collection:{' '}
          {value.docs.map((doc) => (
            <div key={doc.id}>
              <React.Fragment key={doc.id}>{JSON.stringify(doc.data())}, </React.Fragment>
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppleMusicConnectButton />
      </header>
    </div>
  );
}

export default App;
