// https://github.com/antonioru/beautiful-react-hooks/blob/master/src/useTouchEvents.ts

import useHandlerSetterRef from '../utils/useHandlerSetterRef'
// import createCbSetterErrorProxy from './shared/createCbSetterErrorProxy'
import safeHasOwnProperty from '../utils/safeHasOwnProperty'
import assignEventOnMount from '../utils/assignEventOnMount'


/**
 * Returns a frozen object of callback setters to handle the touch events.<br/>
 * It accepts a DOM ref representing the events target. <br/>
 * If a target is not provided the events will be globally attached to the document object.
 * <br/>
 * ### Shall the `useTouchEvents` callbacks replace the standard mouse handler props?
 *
 * **They shall not!**<br />
 * **useTouchEvents is meant to be used to abstract more complex hooks that need to control mouse**, for instance:
 * a drag n drop hook.<br />
 * Using useTouchEvents handlers instead of the classic props approach it's just as bad as it sounds since you'll
 * lose the React SyntheticEvent performance boost.<br />
 * If you were doing something like the following:
 *
 */
const useTouchEvents = (targetRef = null) => {
  const [onTouchStartHandler, setOnTouchStartHandler] = useHandlerSetterRef()
  const [onTouchEndHandler, setOnTouchEndHandler] = useHandlerSetterRef()
  const [onTouchCancelHandler, setOnTouchCancelHandler] = useHandlerSetterRef()
  const [onTouchMoveHandler, setOnTouchMoveHandler] = useHandlerSetterRef()

  if (targetRef !== null && !safeHasOwnProperty(targetRef, 'current')) {
    // return createCbSetterErrorProxy('Unable to assign any touch event to the given ref')
    return console.log('Unable to assign any touch event to the given ref')
  }

  assignEventOnMount(targetRef, onTouchStartHandler, 'touchstart')
  assignEventOnMount(targetRef, onTouchEndHandler, 'touchend')
  assignEventOnMount(targetRef, onTouchCancelHandler, 'touchcancel')
  assignEventOnMount(targetRef, onTouchMoveHandler, 'touchmove')

  return Object.freeze({
    onTouchStart: setOnTouchStartHandler,
    onTouchEnd: setOnTouchEndHandler,
    onTouchCancel: setOnTouchCancelHandler,
    onTouchMove: setOnTouchMoveHandler,
  })
}

export default useTouchEvents