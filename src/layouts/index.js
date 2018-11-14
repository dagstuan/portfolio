import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import Menu from '../components/menu';
import Lightbulb from '../components/lightbulb';

import '../stylesheets/styles.less';

import { descriptionMetaTags, titleMetaTags } from '../utils/metaUtils';

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
  'Portfolio of Dag Stuan. Photographer, Rock Climber, Skier. Currently residing in Trondheim, Norway';

const windowGlobal = typeof window !== 'undefined' && window;

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

class Layout extends Component {
  constructor() {
    super();

    let initialDarkState = false;

    if (
      windowGlobal.localStorage &&
      windowGlobal.localStorage.getItem('dark') === 'true'
    ) {
      initialDarkState = true;
    }

    this.state = {
      menuOpen: false,
      dark: initialDarkState,
    };
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  toggleDark = () => {
    const newDarkState = !this.state.dark;

    if (windowGlobal.localStorage) {
      windowGlobal.localStorage.setItem('dark', newDarkState);
    }

    this.setState({ dark: !this.state.dark });
  };

  render() {
    const { menuOpen, dark } = this.state;

    const { children } = this.props;

    const wrapperClass = classNames('wrapper', {
      'dark-mode': dark,
    });

    const menuOverlayClass = classNames('menu-open-overlay', {
      'menu-open-overlay--menu-open': menuOpen,
    });

    return (
      <StaticQuery
        query={query}
        render={data => {
          const { allContentfulCategory } = data;

          return (
            <>
              <Helmet>
                <title>Dag Stuan</title>
                <meta name="keywords" content={metaKeywords.join(', ')} />
                <meta property="og:type" content="profile" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:first_name" content="Dag" />
                <meta property="og:last_name" content="Stuan" />
                {titleMetaTags('Dag Stuan')}
                {descriptionMetaTags(metaDescription)}
                <meta property="twitter:card" content="summary_large_image" />
                <link
                  href="https://fonts.googleapis.com/css?family=Cinzel:400,700%7CLato"
                  rel="stylesheet"
                />
              </Helmet>
              <main className={wrapperClass}>
                <div className={menuOverlayClass} onClick={this.closeMenu} />

                <Menu
                  categories={allContentfulCategory.edges}
                  menuOpen={menuOpen}
                  toggleMenu={this.toggleMenu}
                  closeMenu={this.closeMenu}
                />

                {children}

                <Lightbulb on={!dark} toggleOn={this.toggleDark} />
              </main>
            </>
          );
        }}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
