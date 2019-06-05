import * as React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import { DarkModeContext } from '../layouts/RootLayout';
import MenuElem from './MenuElem';
import { ContentfulCategory } from '../types/category';
import { makeThemedStyles } from '../styles/helpers';

const menuWidth = '30vw';

const toggleIconWidth = '1.5rem';
const toggleIconHeight = '1.125rem';

const useStyles = makeThemedStyles(theme => ({
  menuToggle: {
    cursor: 'pointer',
    outline: 0,
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    margin: 0,
    padding: 0,
    right: theme.space.leftRight,
    border: 'none',
    width: toggleIconWidth,
    height: theme.space.top,
    background: 'transparent',
  },
  menuToggleLabel: {
    display: 'none',
  },
  menuToggleIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: toggleIconWidth,
    height: toggleIconHeight,
  },
  menuToggleIconLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.black,
    width: '100%',
    height: '1px',

    transition: 'opacity 0.5s, transform 0.5s',
    transitionTimingFunction: 'cubic-bezier(0.84, 0, 0.22, 1)',

    '&:first-child': {
      top: 0,
    },

    '&:nth-child(2)': {
      margin: 'auto',
      top: 0,
      bottom: 0,
    },

    '&:nth-child(3)': {
      margin: 'auto',
      top: 0,
      bottom: 0,
    },

    '&:last-child': {
      bottom: 0,
    },
  },
  menuToggleIconLineDark: {
    backgroundColor: theme.colors.white,
  },
  menuToggleMenuOpen: {
    '& $menuToggleIconLine': {
      '&:first-child, &:last-child': {
        opacity: 0,
        transform: 'scale(0)',
      },

      '&:nth-child(2)': {
        transform: 'rotate(45deg)',
      },

      '&:nth-child(3)': {
        transform: 'rotate(-45deg)',
      },
    },
  },
  menu: {
    backgroundColor: theme.colors.white,
    width: menuWidth,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    transform: 'translate3d(100%, 0, 0)',

    transition: 'transform 0.5s',
    transitionTimingFunction: 'cubic-bezier(0.84, 0, 0.22, 1)',
  },
  menuDark: {
    backgroundColor: theme.colors.black,
  },
  menuOpen: {
    transform: 'translate3d(0, 0, 0)',
  },
  menuElems: {
    paddingTop: '10rem',
    textAlign: 'right',
    fontFamily: theme.fontFamily.headers,
    listStyleType: 'none',
    marginRight: theme.space.leftRight,
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: '2rem',
    height: '2rem',
    fill: theme.colors.black,

    '&:hover': {
      fill: theme.colors.gray,
    },
  },
  iconDark: {
    fill: theme.colors.white,

    '&:hover': {
      fill: theme.colors.grayLight,
    },
  },
  facebook: {
    width: '1.8rem',
    height: '1.8rem',
  },
}));

interface IMenuProps {
  categories: {
    node: ContentfulCategory;
  }[];
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const Menu = ({ categories, menuOpen, toggleMenu, closeMenu }: IMenuProps) => {
  const dark = useContext(DarkModeContext);

  const classes = useStyles();

  const toggleClass = classNames(classes.menuToggle, {
    [classes.menuToggleMenuOpen]: menuOpen,
  });

  const menuClass = classNames(classes.menu, {
    [classes.menuOpen]: menuOpen,
    [classes.menuDark]: dark,
  });

  const lineClass = classNames(classes.menuToggleIconLine, {
    [classes.menuToggleIconLineDark]: dark,
  });

  const iconClass = classNames(classes.icon, {
    [classes.iconDark]: dark,
  });

  return (
    <header>
      <button className={toggleClass} onClick={toggleMenu}>
        <span className={classes.menuToggleLabel}>Menu</span>
        <span className={classes.menuToggleIcon}>
          <span className={lineClass} />
          <span className={lineClass} />
          <span className={lineClass} />
          <span className={lineClass} />
        </span>
      </button>
      <nav className={menuClass}>
        <ul className={classes.menuElems}>
          <MenuElem text="Home" onClick={closeMenu} />
          {categories.map(({ node }) => (
            <MenuElem
              key={node.slug}
              href={node.slug}
              text={node.title}
              onClick={closeMenu}
            />
          ))}
          <MenuElem href="about" text="About" onClick={closeMenu} />
          <li className={classes.icons}>
            <a href="https://www.facebook.com/dstuan">
              <svg
                className={classNames(iconClass, classes.facebook)}
                viewBox="0 0 512 512"
              >
                <path d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/dagstuan/">
              <svg className={iconClass} viewBox="0 0 512 512">
                <g>
                  <path d="M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z" />
                  <path d="M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z" />
                  <circle cx="351.5" cy="160.5" r="21.5" />
                </g>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
