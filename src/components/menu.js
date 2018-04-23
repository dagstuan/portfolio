import React from 'react';
import Link from 'gatsby-link';
import classNames from 'classnames';

const Menu = ({ categories, menuOpen, toggleMenu, closeMenu }) => {
  const toggleClass = classNames('menu-toggle', {
    'menu-toggle--menu-open': menuOpen,
  });
  const menuClass = classNames('menu', { 'menu--open': menuOpen });

  return (
    <header>
      <button className={toggleClass} onClick={toggleMenu}>
        <span className="menu-toggle__label">Menu</span>
        <div className="menu-toggle__icon">
          <span className="menu-toggle__icon-line" />
          <span className="menu-toggle__icon-line" />
          <span className="menu-toggle__icon-line" />
          <span className="menu-toggle__icon-line" />
        </div>
      </button>
      <nav className={menuClass}>
        <ul className="menu__elems">
          <li>
            <Link className="menu__elem" to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          {categories.map(({ node }) => (
            <li key={node.slug}>
              <Link className="menu__elem" to={node.slug} onClick={closeMenu}>
                {node.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
