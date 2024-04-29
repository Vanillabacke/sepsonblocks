import { useState, useLayoutEffect } from 'react'
/*
*   https://dev.to/viclafouch/5-useful-and-modern-custom-hooks-for-your-react-app-3dl
*/


function usePageVisibility() {
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden)

  useLayoutEffect(() => {
    const handleVisibility = () => {
      setIsPageVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return { isPageVisible }
}

export default usePageVisibility