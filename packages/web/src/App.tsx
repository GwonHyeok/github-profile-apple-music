import React from 'react';
import { RecoilRoot } from 'recoil';

import './App.css';
import { RootPage } from './pages/RootPage';

function App() {
  return (
    <RecoilRoot>
      <RootPage />
    </RecoilRoot>
  );
}

export default App;
