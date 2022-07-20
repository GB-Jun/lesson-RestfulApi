import React, { useEffect } from "react";
import {AB_GET_LIST} from './config/ajax-path'

// componentDidMount
// componentDidUpdate
// componentWillUnmount

function App() {

    const getData = async () => {
        const r = await fetch(AB_GET_LIST)   
        const obj = await r.json()
        console.log(obj)
    }
    // 最好是另外寫成function


    useEffect(() => {
        getData()

        // (async () => { })();
    },[])

    return (
        <>
            
        </>
    );
}

export default App;