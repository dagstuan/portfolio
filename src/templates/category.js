import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import { imageMetaTags, titleMetaTags } from '../utils/metaUtils';

import CategoryImage from './categoryImage';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedImages: [],
    };
  }

  onImageLoad = id => {
    const { loadedImages } = this.state;

    if (!loadedImages.includes(id)) {
      loadedImages.push(id);
    }

    this.setState({
      loadedImages,
    });
  };

  render() {
    const {
      data: {
        contentfulCategory: { title, images },
      },
    } = this.props;

    const { loadedImages } = this.state;

    const firstImage = images[0];

    const {
      title: imageTitle,
      image: { resize },
    } = firstImage;

    return (
      <>
        <Helmet>
          <title>{title} - Dag Stuan</title>
          {titleMetaTags(`${title} - Dag Stuan`)}
          {imageMetaTags(resize, imageTitle)}
        </Helmet>
        <div className="title__wrapper">
          <h1 className="title">{title}</h1>
        </div>

        {images && (
          <ul className="category-elems">
            {images.map(image => {
              const anyLoaded = loadedImages.length > 0;
              const isLoaded = loadedImages.includes(image.id);

              return (
                <CategoryImage
                  key={image.id}
                  image={image}
                  critical={anyLoaded && !isLoaded}
                  onImageLoad={() => this.onImageLoad(image.id)}
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
          fixed(width: 1200, quality: 90) {
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
