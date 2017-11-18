import { React, core } from 'avg-core';
import { AppContainer } from 'react-hot-loader';
import Game from './game';

const render = (process.env.NODE_ENV === 'development')
? Component =>
  core.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
: Component =>
  core.render(
    <Component />,
    document.getElementById('app')
  );

(async () => {
  await core.init(1024, 600, {
    fitWindow: true,
    assetsPath: 'assets',
    backgroundColor: '#ff6600',
    tryWebp: process.env.NODE_ENV === 'production'
  });

  render(Game);
  if (module.hot) {
    module.hot.accept('./game', () => { render(Game); });
  }

  core.start();
})();
