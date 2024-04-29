import { useRef, useState} from 'react';

/*
*   https://stackoverflow.com/questions/55265255/react-usestate-hook-event-handler-using-initial-state
*
*   const [refName, setRefName] useStateRef(false)
*   
*   -> refName.current
*
*/


function useStateRef(initialValue) {

    const [state, setState] = useState(initialValue);
    const reference = useRef(state);

    const setReferredState = value => {
        reference.current = value;
        setState(value);
    };

    return [reference, setReferredState];
}
export default useStateRef;