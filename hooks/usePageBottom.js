import { useState, useEffect } from 'react';


/*
*   const scrolledBottom = usePageBottom();
*   
*   https://gist.githubusercontent.com/haseebanwar/7984986a55c628530cb19d38e2e97430/raw/28fcb5ed9f905cba889a72abef5929a81ade866d/usePageBottom.js
*/

const usePageBottom = () => {
  const [reachedBottom, setReachedBottom] = useState(false);
  
  // event handler for determining if the user reached bottom
  const handleScroll = () => {
    const offsetHeight = document.documentElement.offsetHeight;
    const innerHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;

    // if current scroll from bottom is less than equal to 10px
    const reachingBottom = offsetHeight - (innerHeight + scrollTop) <= 10;

    setReachedBottom(reachingBottom);
  };

  // effect for binding event listener on window scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  return reachedBottom;
}