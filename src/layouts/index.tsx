import * as React from 'react';
import { FC, useState, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import classNames from 'classnames';

import Menu from '../components/menu';

import 'nprogress/nprogress.css';
import * as classes from './layout.module.less';

import { descriptionMetaTags, titleMetaTags } from '../utils/metaUtils';

import * as smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

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

type CategoryQueryReturn = {
  allContentfulCategory: {
    edges: {
      node: {
        title: string;
        slug: string;
      };
    }[];
  };
};

const useMenu = (): [boolean, () => void, () => void] => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return [menuOpen, toggleMenu, closeMenu];
};

const Layout: FC = ({ children }) => {
  const { allContentfulCategory } = useStaticQuery<CategoryQueryReturn>(query);

  const [menuOpen, toggleMenu, closeMenu] = useMenu();

  const menuOverlayClass = classNames(classes.menuOpenOverlay, {
    [classes.menuOpenOverlayMenuOpen]: menuOpen,
  });

  return (
    <HelmetProvider>
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
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/232/camera_1f4f7.png"
        />
      </Helmet>
      <main className={classes.wrapper}>
        <div className={menuOverlayClass} onClick={closeMenu} />

        <Menu
          categories={allContentfulCategory.edges}
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
        />

        {children}
      </main>
    </HelmetProvider>
  );
};

export default Layout;
