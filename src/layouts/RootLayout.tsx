import * as React from 'react';
import { FC, useState, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import Menu from '../components/Menu';
import Lightbulb from '../components/Lightbulb';

import '../stylesheets/styles.less';

import { descriptionMetaTags, titleMetaTags } from '../utils/metaUtils';
import { makeThemedStyles } from '../styles/helpers';
import useDarkMode from '../hooks/useDarkMode';
import { ContentfulCategory } from '../types/category';

const metaKeywords = [
  'photographers',
  'photography',
  'photo',
  'photos',
  'inspiring photography',
  'photo sharing',
  'photo download',
  'wall art',
  'commercial photography',
  'pulse',
  'affection',
  'flow',
  'following',
  'activity',
  'fresh',
  'upcoming',
  'editors',
  'photo portfolio',
  'portfolio',
  'norway',
];

const metaDescription =
  'Photographer, Rock Climber, Skier residing in Trondheim, Norway';

const query = graphql`
  query CategoriesQuery {
    allContentfulCategory {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`;

interface IRootQueryProps {
  allContentfulCategory: {
    edges: {
      node: ContentfulCategory;
    }[];
  };
}

const useStyles = makeThemedStyles(theme => ({
  '@global': {
    html: {
      margin: 0,
    },
    body: {
      margin: 0,
    },
  },
  wrapper: {
    backgroundColor: theme.colors.white,

    transition: 'background-color 0.5s linear 0s, opacity 0.5s',
    transitionTimingFunction: 'cubic-bezier(0.84, 0, 0.22, 1)',
  },
  wrapperDark: {
    backgroundColor: theme.colors.black,
  },
  menuOpenOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    background: theme.colors.gray,
    opacity: 0,
    visibility: 'hidden',
    zIndex: 99,
    transform: 'translate3d(0,0,0)',
    transition: 'visibility 0.5s linear 0s, opacity 0.5s',
    transitionTimingFunction: 'cubic-bezier(0.84, 0, 0.22, 1)',
  },
  menuOpenOverlayMenuOpen: {
    visibility: 'visible',
    opacity: 0.5,
  },
}));

export const DarkModeContext = React.createContext(false);

const RootLayout: FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, toggleDark] = useDarkMode();
  const { allContentfulCategory } = useStaticQuery<IRootQueryProps>(query);

  const classes = useStyles();

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const wrapperClass = classNames(classes.wrapper, {
    [classes.wrapperDark]: dark,
  });

  const menuOverlayClass = classNames(classes.menuOpenOverlay, {
    [classes.menuOpenOverlayMenuOpen]: menuOpen,
  });

  return (
    <DarkModeContext.Provider value={dark}>
      <Helmet>
        <html lang="en" />
        <title>Dag Stuan</title>
        <meta name="keywords" content={metaKeywords.join(', ')} />
        <meta property="og:type" content="profile" />
        <meta property="og:locale" content="en_US" />
        {titleMetaTags('Dag Stuan')}
        {descriptionMetaTags(metaDescription)}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@dagstuan" />
      </Helmet>
      <main className={wrapperClass}>
        <div className={menuOverlayClass} onClick={closeMenu} />

        <Menu
          categories={allContentfulCategory.edges}
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
        />

        {children}

        <Lightbulb on={!dark} toggleOn={toggleDark} />
      </main>
    </DarkModeContext.Provider>
  );
};

export default RootLayout;
