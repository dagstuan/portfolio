import React from 'react';
import Link from 'gatsby-link';
import classNames from 'classnames';

const MenuElem = ({ href, text, onClick }) => (
  <li className="menu__elem">
    <Link className="menu__elem__link" to={`/${href || ''}`} onClick={onClick}>
      {text}
    </Link>
  </li>
);

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
          <MenuElem text="Home" onClick={closeMenu} />
          {categories.map(({ node }) => (
            <MenuElem
              key={node.slug}
              href={node.slug}
              text={node.title}
              onClick={closeMenu}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
