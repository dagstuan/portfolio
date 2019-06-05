const theme = {
  colors: {
    white: '#f0f0f0',
    grayDark: '#676767',
    gray: '#737373',
    grayLight: '#a6a6a6',
    grayLighter: '#d9d9d9',
    black: '#262626',
  },
  fontFamily: {
    headers: "'Cinzel', serif",
  },
  fontSize: {
    menu: '1.5rem',
    normal: '1.05rem',
  },
  space: {
    top: '12vh',
    leftRight: '4vw',
  },
};

export type Theme = typeof theme;

export default theme;
