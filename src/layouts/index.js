import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import Menu from '../components/menu';

import '../stylesheets/styles.less';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
      dark: false,
    };
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  toggleDark = () => {
    this.setState({ dark: !this.state.dark });
  };

  render() {
    const { menuOpen, dark } = this.state;

    const {
      children,
      data: { allContentfulCategory },
    } = this.props;

    const wrapperClass = classNames('wrapper', {
      'wrapper--dark': dark,
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
