import React, { memo, Suspense } from 'react';
import { Provider } from "mobx-react";
import { renderRoutes } from 'react-router-config';
import SuspenseLoading from '@components/SuspenseLoading';
// import ParticlePage from '@components/Particle'

import routes from './router';
import store from './store/index.ts';

import { HashRouter } from 'react-router-dom';
import { BackTop } from 'antd';

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback={<div> <SuspenseLoading /></div>}>
          {renderRoutes(routes)}
          <BackTop />
        </Suspense>
      </HashRouter>
    </Provider>
  )
})

