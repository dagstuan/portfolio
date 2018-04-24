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
      'wrapper--menu-open': menuOpen,
      'wrapper--dark': dark,
    });

    return (
      <main className={wrapperClass}>
        <Helmet
          title="Dag Stuan"
          meta={[{ name: 'description', content: 'Portfolio' }]}
        >
          <link
            href="https://fonts.googleapis.com/css?family=Cookie|Open+Sans|PT+Sans"
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
