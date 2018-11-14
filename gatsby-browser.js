/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

exports.onRouteUpdate = ({ location }) => {
  const domElem = document.querySelector(`link[rel='canonical']`);
  var existingValue = domElem.getAttribute(`href`);
  var baseProtocol = domElem.getAttribute(`data-baseProtocol`);
  var baseHost = domElem.getAttribute(`data-baseHost`);
  if (existingValue && baseProtocol && baseHost) {
    let pathName = location.pathname;

    if (pathName && pathName.endsWith('/')) {
      pathName = pathName.slice(0, -1);
    }

    domElem.setAttribute(
      `href`,
      `${baseProtocol}//${baseHost}${pathName}${location.search}${
        location.hash
      }`
    );
  }
};
