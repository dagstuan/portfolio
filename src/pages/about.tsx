import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';

import { titleMetaTags, imageMetaTags } from '../utils/metaUtils';

const query = graphql`
  query {
    contentfulAbout {
      content {
        childMarkdownRemark {
          html
        }
      }
      image {
        resize(width: 1200) {
          src
          width
          height
        }
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;

const AboutPage: React.FunctionComponent = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const {
          content: {
            childMarkdownRemark: { html },
          },
          image: { resize, fluid },
        } = data.contentfulAbout;

        return (
          <>
            <Helmet>
              {titleMetaTags('About Dag Stuan')}
              {imageMetaTags(resize, 'Dag Stuan')}
            </Helmet>
            <div className="about__wrapper">
              <div className="about">
                <div
                  className="about__text"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
                <div className="about__image">
                  <Img fluid={fluid} />
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};

export default AboutPage;
