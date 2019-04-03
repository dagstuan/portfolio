import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import { imageMetaTags, titleMetaTags } from '../utils/metaUtils';
import {
  listenToIntersections,
  removeIntersectionListener,
} from '../utils/intersectionObserverUtils';

import CategoryImage from './categoryImage';

class Category extends Component {
  constructor(props) {
    super(props);

    this.elemRefs = [];
    this.prevNextRefs = {};

    this.state = {
      loadedImages: [],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    this.setPrevNextRefs();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);

    this.elemRefs.forEach(({ ref }) => {
      removeIntersectionListener(ref);
    });
  }

  findRefForId = id => {
    const existing = this.elemRefs.find(elem => elem.id === id);

    if (existing) {
      return existing.ref;
    }
    return null;
  };

  handleKeyDown = event => {
    const elem = this.elemRefs.find(e => e.ref === this.visibleRef);

    if (!elem) {
      return;
    }

    var refs = this.prevNextRefs[elem.id];
    if (!refs) {
      return;
    }

    if (
      (!event.shiftKey && event.key === ' ') /* spacebar */ ||
      event.key === 'j' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowRight'
    ) {
      event.preventDefault();
      if (refs.next) {
        refs.next.scrollIntoView({ behavior: 'smooth' });
        this.visibleRef = refs.next;
      }
    } else if (
      (event.shiftKey && event.key === ' ') ||
      event.key === 'k' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowUp'
    ) {
      event.preventDefault();
      if (refs.prev) {
        refs.prev.scrollIntoView({ behavior: 'smooth' });
        this.visibleRef = refs.prev;
      }
    }
  };

  onImageLoad = id => {
    const { loadedImages } = this.state;

    if (!loadedImages.includes(id)) {
      loadedImages.push(id);
    }

    this.setState({
      loadedImages,
    });
  };

  handleIntersection = ref => {
    if (this.visibleRef !== ref) {
      this.visibleRef = ref;
    }
  };

  handleImageRef = (id, ref) => {
    if (!ref) {
      return;
    }

    const existingIndex = this.elemRefs.findIndex(r => r.ref === ref);

    if (existingIndex >= 0) {
      const existing = this.elemRefs[existingIndex];

      if (existing.id === id) {
        return;
      }

      this.elemRefs.splice(existingIndex, 1);
    }

    this.elemRefs.push({
      id,
      ref,
    });
    listenToIntersections(ref, this.handleIntersection);
  };

  setPrevNextRefs = () => {
    const {
      data: {
        contentfulCategory: { images },
      },
    } = this.props;

    this.prevNextRefs = images.reduce((acc, curr, index) => {
      const { id } = curr;

      let next, prev;

      if (index < images.length - 1) {
        const nextId = images[index + 1].id;
        next = this.findRefForId(nextId);
      }

      if (index > 0) {
        const prevId = images[index - 1].id;
        prev = this.findRefForId(prevId);
      }

      return {
        ...acc,
        [id]: {
          prev,
          next,
        },
      };
    }, {});
  };

  componentDidUpdate(prevProps) {
    const {
      data: {
        contentfulCategory: { images },
      },
    } = this.props;

    if (prevProps) {
      const {
        data: {
          contentfulCategory: { images: prevImages },
        },
      } = prevProps;

      if (prevImages === images) {
        return;
      }
    }

    this.setPrevNextRefs();
  }

  render() {
    const {
      data: {
        contentfulCategory: { title, images },
      },
    } = this.props;

    const { loadedImages } = this.state;

    return (
      <>
        <Helmet>
          <title>{title} - Dag Stuan</title>
          {titleMetaTags(`${title} - Dag Stuan`)}
          {imageMetaTags(images[0].image.resize, images[0].title)}
        </Helmet>
        <div className="title__wrapper">
          <h1 className="title">{title}</h1>
        </div>

        {images && (
          <ul className="category-elems">
            {images.map(image => {
              const { id } = image;

              const anyLoaded = loadedImages.length > 0;
              const isLoaded = loadedImages.includes(id);

              return (
                <CategoryImage
                  wrapperRef={ref => this.handleImageRef(id, ref)}
                  key={id}
                  image={image}
                  critical={anyLoaded && !isLoaded}
                  onImageLoad={() => this.onImageLoad(id)}
                />
              );
            })}
          </ul>
        )}
      </>
    );
  }
}

export const query = graphql`
  query PostQuery($slug: String!) {
    contentfulCategory(slug: { eq: $slug }) {
      title
      slug
      images {
        id
        title
        image {
          resize(width: 1200) {
            src
            width
            height
          }
          fixed(width: 1300, quality: 90) {
            ...GatsbyContentfulFixed_withWebp
            aspectRatio
          }
          file {
            details {
              image {
                width
              }
            }
          }
        }
      }
    }
  }
`;

export default Category;
