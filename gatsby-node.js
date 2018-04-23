/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
  // Redirects
  // const { createRedirect } = boundActionCreators;

  // let redirectBatch1 = [
  //   { f: `/category/lifestyle`, t: `/lifestyle/` },
  //   { f: `/category/wedding`, t: '/wedding/' },
  //   { f: `/pricing`, t: '/investment/' },
  //   { f: `/pricing/lifestyle`, t: `/investment/` },
  //   { f: `/pricing/wedding`, t: `/investment/` },
  // ];

  // for (var { f: f, t: t } of redirectBatch1) {
  //   createRedirect({
  //     fromPath: f,
  //     redirectInBrowser: true,
  //     toPath: t,
  //   });
  // }

  // Create Post Pages based on post.js template
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulCategory {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulCategory.edges.map(({ node }) => {
        createPage({
          path: node.slug,
          component: path.resolve(`./src/templates/category.js`),
          context: {
            slug: node.slug,
          },
        });
      });

      resolve();
    });
  });
};
