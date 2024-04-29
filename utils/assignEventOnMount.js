// https://github.com/antonioru/beautiful-react-hooks/blob/master/src/shared/assignEventOnMount.ts

import { useEffect } from 'react'

const assignEventOnMount = (targetRef, handler, eventName) => {
  useEffect(() => {
    const cb = (mouseEvent) => {
      if (handler && handler.current) {
        handler.current(mouseEvent)
      }
    }
    let target

    if (targetRef !== null && !!targetRef.current) {
      target = targetRef.current
    }

    if (targetRef === null) {
      target = document
    }

    if (target && target.addEventListener) {
      target.addEventListener(eventName, cb)
    }

    return () => {
      if (target && target.removeEventListener) {
        target.removeEventListener(eventName, cb)
      }
    }
  }, [])
}

export default assignEventOnMount