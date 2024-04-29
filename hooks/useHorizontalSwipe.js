// https://github.com/antonioru/beautiful-react-hooks/blob/master/src/useHorizontalSwipe.ts
import useSwipe from './useSwipe'

const defaultOptions = {
  threshold: 15,
  preventDefault: true,
}

/**
 * A shortcut to useSwipe (with horizontal options)
 */
const useHorizontalSwipe = (ref = null, options = defaultOptions) => {
  const opts = { ...defaultOptions, ...(options || {}), ...{ direction: 'horizontal' } }

  return useSwipe(ref, opts)
}

export default useHorizontalSwipe