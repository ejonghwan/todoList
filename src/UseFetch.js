import React, { useState, useEffect } from 'react';


const UseFetch = ( target, url ) => {
    const [loading, setLoading] = useState(false);
    const onData = async ()  => {
        setLoading(true)
        const response = await fetch(url);
        const initData = await response.json();

        target(initData)
        // console.log(initData.completed)
        setLoading(false)
    }

    useEffect( () => {
        onData()
    },[])

    return loading

}

export default UseFetch
