import { FluidObject } from 'gatsby-image';
import * as React from 'react';
import Img from 'gatsby-image';

import * as classes from './index.module.less';

type CoverImageProps = {
  visible: boolean;
  title: string;
  fluid: FluidObject;
  loading: `auto` | `lazy` | `eager`;
  isLoaded: boolean;
  onLoad: () => void;
};

function CoverImage(props: CoverImageProps) {
  const { visible, isLoaded, loading, title, fluid, onLoad } = props;

  return (
    <Img
      alt={title}
      fluid={fluid}
      className={classes.coverImage}
      style={{
        display: loading === 'eager' || isLoaded ? 'block' : 'none',
        width: '100%',
        margin: '12vh auto',
        position: 'absolute',
        top: 0,
        bottom: 0,
        opacity: visible ? 1 : 0,
      }}
      onLoad={onLoad}
    />
  );
}

export default CoverImage;
