const windowGlobal = typeof window !== 'undefined' && window;

let io;
let listeners = [];

const intersectionThreshold = 0.9;

function getIO() {
  if (
    typeof io === `undefined` &&
    typeof windowGlobal !== `undefined` &&
    windowGlobal.IntersectionObserver
  ) {
    io = new windowGlobal.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          listeners.forEach(l => {
            if (l[0] === entry.target) {
              // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
              if (
                entry.isIntersecting ||
                entry.intersectionRatio > intersectionThreshold
              ) {
                l[1](l[0]);
              }
            }
          });
        });
      },
      { rootMargin: `0px`, threshold: intersectionThreshold }
    );
  }

  return io;
}

export function listenToIntersections(domElement, callback) {
  if (domElement) {
    const existingIndex = listeners.findIndex(l => l[0] === domElement);

    if (existingIndex >= 0) {
      listeners = listeners.filter(l => l[0] !== domElement);
    }

    getIO().observe(domElement);
    listeners.push([domElement, callback]);
  }
}

export function removeIntersectionListener(domElement) {
  if (domElement) {
    getIO().unobserve(domElement);
    listeners = listeners.filter(l => l[0] !== domElement);
  }
}
