import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import Menu from '../components/menu';
import Lightbulb from '../components/lightbulb';

import '../stylesheets/styles.less';

class Layout extends Component {
  constructor() {
    super();

    let initialDarkState = false;

    if (window.localStorage && window.localStorage.getItem('dark') === 'true') {
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

    if (window.localStorage) {
      window.localStorage.setItem('dark', newDarkState);
    }

    this.setState({ dark: !this.state.dark });
  };

  render() {
    const { menuOpen, dark } = this.state;

    const {
      children,
      data: { allContentfulCategory },
    } = this.props;

    const wrapperClass = classNames('wrapper', {
      'dark-mode': dark,
    });

    const menuOverlayClass = classNames('menu-open-overlay', {
      'menu-open-overlay--menu-open': menuOpen,
    });

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

        {children()}

        <Lightbulb on={!dark} toggleOn={this.toggleDark} />
      </main>
    );
  }
}

export const query = graphql`
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

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;
