import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../styles/theme';
import RootLayout from './RootLayout';
import { FC } from 'react';

const Layout: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <RootLayout children={children} />
  </ThemeProvider>
);

export default Layout;
