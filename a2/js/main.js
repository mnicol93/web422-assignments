/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Marc Nicolas Oliva Student ID: 130943202 Date: 2021-10-03
*
*
********************************************************************************/

let restaurantData = [];
let currentRestaurant = {};
let page = 1;
const perPage = 10;
let map = null;

let avg = function (grades) {
  let i = 0;
  let totalGrade = 0;

  grades.forEach(grade => {
    totalGrade += grade.score;
    i++
  });

  return (totalGrade /= i).toFixed(2);
}

const tableRows = _.template(`<ul> 
                                <% _.forEach(restaurants, function(restaurant) { %>
                                    <tr data-id =<%- restaurant._id %>>
                                        <td><%- restaurant.name %></td>
                                        <td><%- restaurant.cuisine %></td>
                                        <td><%- restaurant.address.building %>
                                            <%- restaurant.address.street %>
                                        </td>
                                        <td><%= avg(restaurant.grades) %></td>
                                    </tr>
                                <% }); %>
                              </ul>`);

let loadRestaurantData = function () {
  fetch(`https://web422-a1-mno.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`)
    .then(response => response.json())
    .then(data => {

      restaurantData = data;
      let restRows = tableRows({ restaurants: data });

      $("#restaurant-table tbody").html(restRows);
      $("#current-page").html(page);
    })
    .catch(err => console.error('Unable to load restaurants data:', err));
}

$(function () {
  loadRestaurantData();

  $("#restaurant-table tbody").on("click", "tr", function () {
    restaurantData.forEach(rest => {
      if (rest._id == $(this).attr("data-id")) {
        currentRestaurant = rest;
      }
    });

    $(".modal-title").html(currentRestaurant.name);
    $("#restaurant-address").html(`${currentRestaurant.address.building} ${currentRestaurant.address.street}`);

    $("#restaurant-modal").modal('show');

  });

  $("#previous-page").on("click", function () {
    if (page > 1) {
      --page;
      loadRestaurantData();
    }
  });

  $("#next-page").on("click", function () {
    ++page;
    loadRestaurantData();
  });

  $("#restaurant-modal").on('shown.bs.modal', function () {
    map = new L.Map('leaflet', {
      center: [currentRestaurant.address.coord[1], currentRestaurant.address.coord[0]],
      zoom: 18,
      layers: [
        new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      ]
    });

    L.marker(
      [currentRestaurant.address.coord[1], currentRestaurant.address.coord[0]]
    ).addTo(map);
  });

  $("#restaurant-modal").on("hidden.bs.modal", function () {
    map.remove();
  })
});

$(function () {
  loadRestaurantData();
})