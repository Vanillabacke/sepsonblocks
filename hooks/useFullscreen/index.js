import {useCallback, useRef, useState} from 'react';
import screenfull from './screenfull';
import useUnmount from 'Hooks/useUnmount';
import {getTargetElement} from '../utils/dom';



/*
*    const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullscreen(ref);
*
*    return (<div>
*            <div style={{ marginBottom: 16 }}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
*            <div>
*                <button type="button" onClick={setFull}>
*                setFull
*                </button>
*                <button type="button" onClick={exitFull} style={{ margin: '0 8px' }}>
*                exitFull
*                </button>
*                <button type="button" onClick={toggleFull}>
*                toggle
*                </button>
*            </div>
*        </div>)
*/

export default(target, options) => {
    const {onExitFull, onFull} = options || {};

    const onExitFullRef = useRef(onExitFull);
    onExitFullRef.current = onExitFull;

    const onFullRef = useRef(onFull);
    onFullRef.current = onFull;

    const [state,
        setState] = useState(false);

    const onChange = useCallback(() => {
        if (screenfull.isEnabled) {
            const {isFullscreen} = screenfull;
            if (isFullscreen) {
                onFullRef.current && onFullRef.current();
            } else {
                screenfull.off('change', onChange);
                onExitFullRef.current && onExitFullRef.current();
            }
            setState(isFullscreen);
        }
    }, []);

    const setFull = useCallback(() => {
        const el = getTargetElement(target);
        if (!el) {
            return;
        }

        if (screenfull.isEnabled) {
            try {
                screenfull.request(el);
                screenfull.on('change', onChange);
            } catch (error) {}
        }
    }, [target, onChange]);

    const exitFull = useCallback(() => {
        if (!state) {
            return;
        }
        if (screenfull.isEnabled) {
            screenfull.exit();
        }
    }, [state]);

    const toggleFull = useCallback(() => {
        if (state) {
            exitFull();
        } else {
            setFull();
        }
    }, [state, setFull, exitFull]);

    useUnmount(() => {
        if (screenfull.isEnabled) {
            screenfull.off('change', onChange);
        }
    });

    return [
        state, {
            exitFull,
            toggleFull,
            setFull
        }
    ];
};