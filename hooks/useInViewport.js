import { useEffect, useState } from 'react';
// import 'intersection-observer';
import {getTargetElement} from './utils/dom';


/*
*   const inViewPort = useInViewport(ref);
*/


function isInViewport(el)  {
  if (!el) {
    return undefined;
  }

  const viewPortWidth   = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const viewPortHeight  = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const rect = el.getBoundingClientRect();

  if (rect) {
    const { top, bottom, left, right } = rect;
    return bottom > 0 && top <= viewPortHeight && left <= viewPortWidth && right > 0;
  }

  return false;
}


function useInViewport(target, options = false) {
  const [inViewPort, setInViewport] = useState(() => {
    const el = getTargetElement(target);

    return isInViewport(el);
  });

  useEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {};
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        //   console.log(entry.intersectionRatio)
        if (entry.isIntersecting) {
          setInViewport(true);
        } else {
          setInViewport(false);
        }
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return inViewPort;
}

export default useInViewport;