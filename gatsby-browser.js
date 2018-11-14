export const onRouteUpdate = ({ location }) => {
  const domElem = document.querySelector(`meta[property='og:url']`);
  var existingValue = domElem.getAttribute(`value`);
  var baseProtocol = domElem.getAttribute(`data-baseProtocol`);
  var baseHost = domElem.getAttribute(`data-baseHost`);
  if (existingValue && baseProtocol && baseHost) {
    domElem.setAttribute(
      `value`,
      `${baseProtocol}//${baseHost}${location.pathname}${location.search}${
        location.hash
      }`
    );
  }
};
