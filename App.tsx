import React from 'react';

import {UserProvider} from './src/utils/userContext';
import {PostProvider} from './src/utils/postContext';
import { AuthProvider } from './src/utils/authContext';
import AppNavigation from './src/navigation/Navigation';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <UserProvider>
        <PostProvider>
          <AppNavigation />
        </PostProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
