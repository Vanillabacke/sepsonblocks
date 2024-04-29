import {useRef, useEffect} from 'react';

/*
*   https://github.com/rehooks/document-title#readme
*   
*   useDocumentTitle('Page Title');
*/


function useDocumentTitle(title, retainOnUnmount = false) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        return () => {
            if (!retainOnUnmount) {
                document.title = defaultTitle.current;
            }
        };
    }, []);
}

export default useDocumentTitle;