import React from 'react';
import Img from 'gatsby-image';

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
                title={image.title}
                fadeIn={false}
                style={{
                  width: '85%',
                  height: '80vh',
                  padding: '20px',
                }}
                imgStyle={{
                  marginTop: '20px',
                  marginLeft: '20px',
                  width: 'calc(100% - 40px)',
                  height: 'calc(80vh - 20px)',
                  objectFit: 'contain',
                  transition: 'translate3d(0,0,0)',
                  filter: `drop-shadow(0px 0px 1px rgba(0,0,0,.3))
                           drop-shadow(0px 0px 10px rgba(0,0,0,.3))`,
                }}
                backgroundColor={'#e7e7e7'}
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
        resolutions(width: 1000) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyContentfulResolutions_withWebp_noBase64
        }
      }
    }
  }
`;

export default Category;
