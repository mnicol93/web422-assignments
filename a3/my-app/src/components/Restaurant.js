import React, { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Card, CardDeck, Container, Table } from 'react-bootstrap';


function Restaurant(){
    const [sRestaurant, setRestaurant] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    console.log(sRestaurant);
    useEffect(()=>{
        setLoading(true);
        fetch(`http://web422-a1-mno.herokuapp.com/api/restaurants/${id}`)
        .then((res)=>res.json())
        .then((resultData)=>{
            if(resultData.hasOwnProperty("_id")){
                setRestaurant(resultData);
            }else{
                setRestaurant({});
            }
        }).catch((err)=>{ console.error(err); }); 

        setLoading(false);
    }, [id]);
console.log(sRestaurant);
    return(
        <Container>
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>{sRestaurant.name}</Card.Title>
                <Card.Text>{sRestaurant.address.building} </Card.Text>
            </Card.Body>
        </Card> 
        {/* <MapContainer style={{"height": "400px"}} center={[sRestaurant.address.coord[1], sRestaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[sRestaurant.address.coord[1], sRestaurant.address.coord[0]]}></Marker>
        </MapContainer> */}
      </Container>

    );
}

export default Restaurant;
