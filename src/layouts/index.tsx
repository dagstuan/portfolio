import * as React from 'react';
import { FC, useState, useCallback, useLayoutEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import Menu from '../components/menu';
import Lightbulb from '../components/lightbulb';

import '../stylesheets/styles.less';

import { descriptionMetaTags, titleMetaTags } from '../utils/metaUtils';
import useLocalStorage from '../hooks/useLocalStorage';

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

const Layout: FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [localStorageDark, setLocalStorageDark] = useLocalStorage(
    'dark',
    false
  );
  const { allContentfulCategory } = useStaticQuery(query);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleDark = useCallback(() => {
    const nextDark = !dark;
    setDark(nextDark);
    setLocalStorageDark(nextDark);
  }, [dark]);

  useLayoutEffect(() => {
    setDark(localStorageDark);
  }, []);

  const wrapperClass = classNames('wrapper', {
    'dark-mode': dark,
  });

  const menuOverlayClass = classNames('menu-open-overlay', {
    'menu-open-overlay--menu-open': menuOpen,
  });

  return (
    <>
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
        <link
          href="https://fonts.googleapis.com/css?family=Cinzel:400,700%7CLato"
          rel="stylesheet"
        />
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
    </>
  );
};

export default Layout;
