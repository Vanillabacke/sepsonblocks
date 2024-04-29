import uuidV1 from 'uuid/v1';
import uuidV3 from 'uuid/v3';
import uuidV4 from 'uuid/v4';
import uuidV5 from 'uuid/v5';
import { useState } from 'react';


/*
*    https://github.com/Spidy88/react-use-uuid
*
*       const id = useId();
*
*
*    Use a different version of UUID ID generation
*    Behind the scenes, useId makes use of the powerful uuid package.
*    By default, version 4 of the id generation is used but all versions
*    are supported through an optional parameter to useId.
*
*       const id = useId('v5', 'hello.example.com', uuidv5.DNS);
*/


const idGenerators = {
    v1: uuidV1,
    v3: uuidV3,
    v4: uuidV4,
    v5: uuidV5
};

function useId(version='v4', ...uuidArgs) {
    if( !(version in idGenerators) ) {
        throw new Error('Invalid version for id generator');
    }

    // Utilize useState instead of useMemo because React
    // makes no guarantees that the memo store is durable
    let [id] = useState(() => {
        return idGenerators[version](...uuidArgs);
    });

    return id;
}

export default useId;