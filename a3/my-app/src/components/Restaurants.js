/*
outputs: <p>Restaurants query: query</p> where query is a value that
 we will retrieve by using the "useLocation" hook (see: Step 4)
*/

import React, { useEffect, useState } from 'react';
import { Card, Container, Pagination, Table } from 'react-bootstrap';
import {useLocation, useHistory} from 'react-router-dom';
import queryString from 'query-string';

function Restaurants(){

    let location = useLocation();
    const [ restaurants, setRestaurants ] = useState(null);
    const [ page, setPage ] = useState(1);
    let history = useHistory();
    let url = `http://web422-a1-mno.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
    let query = queryString.parse(location.search);
    let loc = query.borough
    
    useEffect(()=>{
        if(loc !== undefined){
            url += `&Borough=${loc}`;
        }
        fetch(url)
        .then((res) => res.json())
        .then((result) => setRestaurants(result))
        .catch((err)=>{ console.error(err); });
        
    }, [page, loc]);

    
    function previousPage(){
        if(page>1){
            setPage(page-1);
        }
    }
    function nextPage(){ setPage(page+1); }

    if(restaurants.length === 0){
        return (
            <p>No restaurants found.</p>
        )
    }
    return(
      <Container>
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>Restaurant List</Card.Title>
                <Card.Text>
                Full list of restaurants. Optionally sorted by Borough.
                </Card.Text>
            </Card.Body>
        </Card>    

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Borough</th>
                    <th>Cuisine</th>
                </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr
                  onClick={() => {
                    history.push(`/restaurant/${restaurant._id}`);
                  }}
                  key={restaurant._id}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building} {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td>{restaurant.cuisine}</td>
                </tr>
              ))}
            </tbody>
            
        </Table>
        <Pagination>
          <Pagination.Prev onClick={() => previousPage()} />
          <Pagination.Item>{page-1}</Pagination.Item>
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Item>{page+1}</Pagination.Item>
          <Pagination.Next onClick={() => nextPage()} />
      </Pagination>
      </Container>

        
    );
}

export default Restaurants;