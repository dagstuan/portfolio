import React from 'react';
import Img from 'gatsby-image';

const width = '85%';
const height = '80vh';

const paddingTopBottomPx = 22;
const paddingLeftRightPx = 35;

const Category = ({ data }) => {
  const {
    contentfulCategory: { title, images },
  } = data;

  return (
    <div>
      <h1 className="category-title">{title}</h1>
      {images && (
        <ul className="category-elems">
          {images.map((image, index) => (
            <li className="category-elem" key={index}>
              <Img
                resolutions={image.resolutions}
                alt={image.title}
                fadeIn={false}
                style={{
                  width: `${width}`,
                  height: `${height}`,
                  paddingLeft: `${paddingLeftRightPx}px`,
                  paddingRight: `${paddingLeftRightPx}px`,
                }}
                imgStyle={{
                  marginTop: `${paddingTopBottomPx}px`,
                  marginBottom: `${paddingTopBottomPx}px`,
                  marginLeft: `${paddingLeftRightPx}px`,
                  width: `calc(100% - ${paddingLeftRightPx * 2}px)`,
                  height: `calc(${height} - ${paddingTopBottomPx * 2}px)`,
                  objectFit: 'contain',
                  filter: `drop-shadow(0px 0px 1px rgba(0,0,0,.3))
                           drop-shadow(0px 0px 10px rgba(0,0,0,.3))`,
                }}
                backgroundColor="transparent"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const query = graphql`
  query PostQuery($slug: String!) {
    contentfulCategory(slug: { eq: $slug }) {
      title
      slug
      images {
        title
        description
        resolutions(width: 700) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyContentfulResolutions_withWebp_noBase64
        }
      }
    }
  }
`;

export default Category;
