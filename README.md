# LeafletMapquestRouting
Created for a HW task. One web page (map.html) with an interactive map to indicate the from/to positions and see the route.
Ø The process is as follows:

1. Get the current position of the user and mark it on the map. Use the leaflet.js plugins to do that. Alternatively, you can set the current position by clicking on the map.
2. The user inputs the destination by clicking on the map. Add a marker to show it.
3. Use the routing plugin to calculate the route and show it on the map.
4. The map sends a POST of the current and destination positions to the server.
5. The moto device then does a GET to grab the positions and updates the arrow’s direction according to the angle between the from and to positions.
6. When the position changes on the map, the map application sends a GET to the socket server which saves it. The moto device then uses a GET to retrieve the new position. 
