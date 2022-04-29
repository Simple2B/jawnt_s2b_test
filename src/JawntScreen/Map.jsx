import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Transport from "./Transport";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 43],
  popupAnchor: [0, -41],
});

let greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 43],
  popupAnchor: [0, -41],
});

let yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 43],
  popupAnchor: [0, -41],
});

function Map(props) {
  // const [coordinatesBus, setcoordinatesBus] = useState([]);
  // const [coordinatesBike, setcoordinatesBike] = useState([]);
  const [transportMarkers, settransportMarkers] = useState();

  useEffect(() => {
    var container = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }

    var map = L.map("map").setView([39.951, -75.179], 16);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
      }
    ).addTo(map);
    var transportMarkers = new L.LayerGroup().addTo(map);
    settransportMarkers(transportMarkers);
    L.Marker.prototype.options.icon = DefaultIcon;
    var marker = L.marker([39.951, -75.179]).addTo(map);
    marker.bindPopup("<b>CityCoHo</b>").openPopup();

    const transportInterval = setInterval(() => {
      if (transportMarkers !== undefined) {
        transportMarkers.clearLayers();
      }
      for (let transport of props.transport) {
        fetch("https://dry-plains-47117.herokuapp.com/" + transport.link)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            if (transport.type === "Bus") {
              for (let bus of result.bus) {
                console.log("busCoors", [
                  parseFloat(bus.lat),
                  parseFloat(bus.lng),
                ]);
                var busMarker = L.marker(
                  [parseFloat(bus.lat), parseFloat(bus.lng)],
                  { icon: yellowIcon }
                ).addTo(transportMarkers);
                if (bus.next_stop_name !== null) {
                  busMarker
                    .bindPopup("<b>Next stop: " + bus.next_stop_name + "</b>", {
                      autoPan: false,
                      autoClose: false,
                    })
                    .openPopup();
                }
                //map.map("map").setView([39.951, -75.179], 15);
              }
            } else if (transport.type === "Bike") {
              for (let bike of result.features) {
                if (
                  bike.properties.id === 3256
                  // bikeCoors[0] < 39.955 &&
                  // bikeCoors[0] > 39.93 &&
                  // bikeCoors[1] < -75.171 &&
                  // bikeCoors[1] > -75.191
                ) {
                  var bikeMarker = L.marker(
                    bike.geometry.coordinates.reverse(),
                    { icon: greenIcon }
                  ).addTo(transportMarkers);
                  bikeMarker
                    .bindPopup(
                      "<b>" + bike.properties.bikesAvailable + " bikes</b>",
                      {
                        autoPan: false,
                        autoClose: false,
                      }
                    )
                    .openPopup();
                  //map.map("map").setView([39.951, -75.179], 15);
                }
              }
            }
          });
      }
    }, 30000);

    return () => {
      clearInterval(transportInterval);
    };
  }, []);

  // useEffect(() => {
  //   if (transportMarkers !== undefined) {
  //     transportMarkers.clearLayers();
  //   }
  //   for (let bus of coordinatesBus) {
  //     //console.log([parseFloat(bus.lat), parseFloat(bus.lng)]);
  //     var marker = L.marker([parseFloat(bus.lat), parseFloat(bus.lng)]).addTo(
  //       transportMarkers
  //     );
  //     marker.bindPopup("<b>bus</b>").openPopup();
  //     L.map("map").setView([39.951, -75.179], 15);
  //   }
  //   // for (let bike of coordinatesBike) {
  //   //   var marker = L.marker(bike.geometry.coordinates.reverse()).addTo(
  //   //     transportMarkers
  //   //   );
  //   //   marker.bindPopup("<b>bike</b>").openPopup();
  //   // }
  // }, [coordinatesBus]);

  return <div id="map" style={{ height: "800px", width: "100%" }}></div>;
}

//setInterval(Map, 5000);

export default Map;
