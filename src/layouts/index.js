import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import Menu from '../components/menu';
import Lightbulb from '../components/lightbulb';

import '../stylesheets/styles.less';

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
            <main className={wrapperClass}>
              <div className={menuOverlayClass} onClick={this.closeMenu} />
              <Helmet
                title="Dag Stuan"
                meta={[{ name: 'description', content: 'Portfolio' }]}
              >
                <link
                  href="https://fonts.googleapis.com/css?family=Cinzel:400,700|Lato"
                  rel="stylesheet"
                />
              </Helmet>

              <Menu
                categories={allContentfulCategory.edges}
                menuOpen={menuOpen}
                toggleMenu={this.toggleMenu}
                closeMenu={this.closeMenu}
              />

              {children}

              <Lightbulb on={!dark} toggleOn={this.toggleDark} />
            </main>
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
