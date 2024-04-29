import { MutableRefObject } from 'react'
import useHandlerSetterRef from '../utils/useHandlerSetterRef'
// import createCbSetterErrorProxy from './shared/createCbSetterErrorProxy'
import safeHasOwnProperty from '../utils/safeHasOwnProperty'
import assignEventOnMount from '../utils/assignEventOnMount'




/**
 * Returns a frozen object of callback setters to handle the mouse events.<br/>
 * It accepts a DOM ref representing the events target. <br/>
 * If a target is not provided the events will be globally attached to the document object.
 * <br/>
 * ### Shall the `useMouseEvents` callbacks replace the standard mouse handler props?
 *
 * **They shall not!**<br />
 * **useMouseEvents is meant to be used to abstract more complex hooks that need to control mouse**, for instance:
 * a drag n drop hook.<br />
 * Using useMouseEvents handlers instead of the classic props approach it's just as bad as it sounds since you'll
 * lose the React SyntheticEvent performance boost.<br />
 * If you were doing something like the following:
 */
const useMouseEvents = (targetRef = null) => {
  const [onMouseDownHandler, setOnMouseDown] = useHandlerSetterRef()
  const [onMouseEnterHandler, setOnMouseEnter] = useHandlerSetterRef()
  const [onMouseLeaveHandler, setOnMouseLeave] = useHandlerSetterRef()
  const [onMouseMoveHandler, setOnMouseMove] = useHandlerSetterRef()
  const [onMouseOutHandler, setOnMouseOut] = useHandlerSetterRef()
  const [onMouseOverHandler, setOnMouseOver] = useHandlerSetterRef()
  const [onMouseUpHandler, setOnMouseUp] = useHandlerSetterRef()

  if (targetRef !== null && !safeHasOwnProperty(targetRef, 'current')) {
    // return createCbSetterErrorProxy('Unable to assign any mouse event to the given ref')
    return console.log('Unable to assign any mouse event to the given ref')
  }

  assignEventOnMount(targetRef, onMouseDownHandler, 'mousedown')
  assignEventOnMount(targetRef, onMouseEnterHandler, 'mouseenter')
  assignEventOnMount(targetRef, onMouseLeaveHandler, 'mouseleave')
  assignEventOnMount(targetRef, onMouseMoveHandler, 'mousemove')
  assignEventOnMount(targetRef, onMouseOutHandler, 'mouseout')
  assignEventOnMount(targetRef, onMouseOverHandler, 'mouseover')
  assignEventOnMount(targetRef, onMouseUpHandler, 'mouseup')

  return Object.freeze({
    onMouseDown: setOnMouseDown,
    onMouseEnter: setOnMouseEnter,
    onMouseLeave: setOnMouseLeave,
    onMouseMove: setOnMouseMove,
    onMouseOut: setOnMouseOut,
    onMouseOver: setOnMouseOver,
    onMouseUp: setOnMouseUp,
  })
}

export default useMouseEvents