import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import store, {persistor} from '@store/index';
import {Provider as AntDProvider} from '@ant-design/react-native';
import {PersistGate} from 'redux-persist/integration/react';
import Index from './src';

const APP = () => {
  return (
    <AntDProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Index />
        </PersistGate>
      </ReduxProvider>
    </AntDProvider>
  );
};

export default APP;
