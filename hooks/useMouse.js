// https://github.com/antonioru/beautiful-react-hooks/blob/master/src/useMouse.ts

import useMouseEvents, { MouseEventsMap } from './useMouseEvents'
import useMouseState, { MouseStateSummary } from './useMouseState'

/**
 * Returns an array where the first item is the mouse state from the `useMouseState` hook and the second item
 * is the object of callback setters from the `useMouseEvents` hook.
 * It is intended as a shortcut to those hooks.
 */
const useMouse = (targetRef= null) => {
  const state = useMouseState(targetRef)
  const events = useMouseEvents(targetRef)

  return [state, events]
}

export default useMouse