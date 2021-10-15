/*
outputs: <p>Restaurants query: query</p> where query is a value that
 we will retrieve by using the "useLocation" hook (see: Step 4)
*/

import React, { useEffect, useLocation } from 'react';

function Restaurants(){

    const [ searchLocation, setLocation ] = useLocation();
    return(
        <p>Restaurants query: {useLocation.query}</p>
    );
}

export default Restaurants;