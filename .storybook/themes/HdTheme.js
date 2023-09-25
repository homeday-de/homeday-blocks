// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from '@storybook/theming';
import logo from './logo.svg';

export default create({
  base: 'light',
  brandTitle: 'Homeday',
  brandUrl: 'https://www.homeday.de',
  brandImage: logo,

  fontBase: '"Source Sans Pro", sans-serif',
  fontCode: 'monospace',
});
