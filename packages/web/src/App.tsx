import React from 'react';
import { RecoilRoot } from 'recoil';

import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { RootPage } from './pages/RootPage';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <RootPage />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
