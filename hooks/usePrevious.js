import { useRef }  from 'react';

/*
    const previousCount = usePrevious(count)
*/

export default function usePrevious(value) {
  const currentRef = useRef(value)
  const previousRef = useRef()

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current
    currentRef.current = value
  }

  return previousRef.current
}