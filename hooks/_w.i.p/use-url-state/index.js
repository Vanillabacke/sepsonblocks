import {parse, stringify} from '../utils/queryString';
import {useMemo, useRef, useState} from 'react/hooks';
// import {useHistory, useLocation} from 'preact-router-dom';
// import {useHistory, useLocation} from 'preact/hooks';
import {useRouter, useHistory, useLocation} from 'wouter-preact';


/*
*   https://ahooks.js.org/hooks/state
*   
*   const [state, setState] = useUrlState({ count: '1' });
*
*
*    return (
*        <div>
*            <button
*                style={{ marginRight: 8 }}
*                type="button"
*                onClick={() => setState({ count: Number(state.count || 0) + 1 })}
*            >
*                add
*            </button>
*            <button type="button" onClick={() => setState({ count: undefined })}>
*                clear
*            </button>
*            <div>state: {state?.count}</div>
*        </div>
*    );
*/

const parseConfig = {
    parseBooleans: false,
    parseNumbers: false,
    skipEmptyString: true,
    skipNull: true
};

export default(initialState, options) => {
    const {
        navigateMode = 'push'
    } = options || {};

    const router = useRouter()
    
    // const [location] = useLocation();
    // const history = useHistory();

    const [location, setLocation] = useLocation();

    


    const [,
        update] = useState(false);

    const initialStateRef = useRef(typeof initialState === 'function' ? (initialState)() : initialState || {},);

    const queryFromUrl = useMemo(() => {
        return parse(location.search, parseConfig);
    }, [location.search]);

    const targetQuery = useMemo(() => ({
        ...initialStateRef.current,
        ...queryFromUrl
    }), [queryFromUrl],);

    const setState = (s) => {
        const newQuery = typeof s === 'function' ? (s)(targetQuery) : s;

        // 1. If the search does not change after setState, update is needed to trigger an update. For example, if demo1 clicks clear directly, update is needed to trigger the update
        // 2. The updates of update and history will be merged and will not cause multiple updates
        
        console.log( s )
        // console.log( navigateMode )


        update((v) => !v);

        setLocation(stringify({
                ...queryFromUrl,
                ...newQuery
            }, parseConfig) || '?'
        )
        
        // setLocation({
        //     hash: location.hash,
        //     search: stringify({
        //         ...queryFromUrl,
        //         ...newQuery
        //     }, parseConfig) || '?'
        // })

        // history[navigateMode]({
        //     hash: location.hash,
        //     search: stringify({
        //         ...queryFromUrl,
        //         ...newQuery
        //     }, parseConfig) || '?'
        // });
    };

    return [targetQuery, setState];
};