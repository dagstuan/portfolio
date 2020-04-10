import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet-async';

import * as aboutStyles from './about.module.less';
import { imageMetaTags, titleMetaTags } from '../../utils/metaUtils';

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
      render={(data) => {
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
            <div className={aboutStyles.aboutWrapper}>
              <div className={aboutStyles.about}>
                <div
                  className={aboutStyles.aboutText}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
                <div className={aboutStyles.aboutImage}>
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
