import * as React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { FC, useContext } from 'react';
import { makeThemedStyles } from '../styles/helpers';
import { DarkModeContext } from '../layouts/RootLayout';

const useStyles = makeThemedStyles(theme => ({
  elem: {
    marginBottom: '0.5rem',
  },
  elemLink: {
    fontSize: theme.fontSize.menu,
    textTransform: 'capitalize',
    color: theme.colors.black,
    textDecoration: 'none',

    '&:hover': {
      color: theme.colors.gray,
    },
  },
  elemLinkDark: {
    color: theme.colors.white,

    '&:hover': {
      color: theme.colors.grayLight,
    },
  },
}));

interface IMenuElemProps {
  href?: string;
  text: string;
  onClick: () => void;
}

const MenuElem: FC<IMenuElemProps> = ({
  href,
  text,
  onClick,
}: IMenuElemProps) => {
  const dark = useContext(DarkModeContext);

  const classes = useStyles();

  const elemLinkClass = classNames(classes.elemLink, {
    [classes.elemLinkDark]: dark,
  });

  return (
    <li className={classes.elem}>
      <Link className={elemLinkClass} to={`/${href || ''}`} onClick={onClick}>
        {text}
      </Link>
    </li>
  );
};

export default MenuElem;
