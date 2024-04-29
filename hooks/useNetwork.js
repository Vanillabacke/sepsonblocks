import {useState, useEffect} from 'react';


// interface NetworkState {
//     online?:             boolean;
//     since?:              Date;
//     rtt?:                number;
//     type?:               string;     bluetooth | cellular | ethernet | none | wifi | wimax | other | unknown
//     downlink?:           number;
//     saveData?:           boolean;
//     downlinkMax?:        number;
//     effectiveType?:      string;     slow-2g | 2g | 3g | 4g
//   }


/*
*   https://ahooks.js.org/hooks/state/use-network
*   
*   const networkState = useNetwork();
*   
*/

function getConnection() {
    const nav = navigator;
    if (typeof nav !== 'object') 
        return null;
    return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty() {
    const c = getConnection();
    if (!c) 
        return {};
    return {
        downlink: c.downlink,
        downlinkMax: c.downlinkMax,
        effectiveType: c.effectiveType,
        rtt: c.rtt,
        saveData: c.saveData,
        type: c.type
    };
}

function useNetwork() {
    const [state,
        setState] = useState(() => {
        return {
            ...getConnectionProperty(),
            online: navigator.onLine,
            since: undefined
        };
    });

    useEffect(() => {
        const onOnline = () => {
            setState((prevState) => ({
                ...prevState,
                online: true,
                since: new Date()
            }));
        };

        const onOffline = () => {
            setState((prevState) => ({
                ...prevState,
                online: false,
                since: new Date()
            }));
        };

        const onConnectionChange = () => {
            setState((prevState) => ({
                ...prevState,
                ...getConnectionProperty()
            }));
        };

        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);

        const connection = getConnection();
        connection ?.addEventListener('change', onConnectionChange);

        return () => {
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
            connection ?.removeEventListener('change', onConnectionChange);
        };
    }, []);

    return state;
}

export default useNetwork;

/*
*   https://github.com/rehooks/network-status
*
*    let connection = useNetwork();
*    return (
*        <div>
*           <div>downlink: {connection.downlink}</div>
*           <div>effectiveType: {connection.effectiveType}</div>
*           <div>rtt: {connection.rtt}</div>
*           <div>saveData: {connection.saveData ? "yes" : "no"}</div>
*        </div>
*    );
*/

// function getConnection() {     return navigator.connection || navigator.mozConnection ||
// navigator.webkitConnection; } function useNetwork() {     let [connection,
// updateNetworkConnection] = useState(getConnection());     useEffect(() => {         function
// updateConnectionStatus() {             updateNetworkConnection(getConnection());         }
//  connection.addEventListener("change", updateConnectionStatus);         return () => {
//  connection.removeEventListener("change", updateConnectionStatus);         };     },
// [connection]);     return connection; } export default useNetwork;