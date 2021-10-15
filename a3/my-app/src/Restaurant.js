import React, { useParams } from 'react';

function Restaurant(){
    return(
        <p>Restaurant id: {useParams.id}</p>
    );
}

export default Restaurant;