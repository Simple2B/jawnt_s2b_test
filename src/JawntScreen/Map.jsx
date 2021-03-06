import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

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
  const cityCoHoCoors = [39.951, -75.179];
  const mapZoom = 16;
  const bikeStatuionID = 3256;
  const refreshInterval = 30000;

  useEffect(() => {
    let container = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }

    let map = L.map("map").setView(cityCoHoCoors, mapZoom);
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
    let transportMarkers = new L.LayerGroup().addTo(map);
    L.Marker.prototype.options.icon = DefaultIcon;
    let marker = L.marker(cityCoHoCoors).addTo(map);
    marker.bindPopup("<b>CityCoHo</b>").openPopup();

    const transportInterval = setInterval(() => {
      if (transportMarkers !== undefined) {
        transportMarkers.clearLayers();
      }
      for (let transport of props.transport) {
        fetch("https://dry-plains-47117.herokuapp.com/" + transport.link)
          .then((res) => res.json())
          .then((result) => {
            if (transport.type === "Bus") {
              for (let bus of result.bus) {
                let busMarker = L.marker(
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
              }
            } else if (transport.type === "Bike") {
              for (let bike of result.features) {
                if (bike.properties.id === bikeStatuionID) {
                  let bikeMarker = L.marker(
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
                }
              }
            }
          });
      }
    }, refreshInterval);

    return () => {
      clearInterval(transportInterval);
    };
  }, []);

  return <div id="map" style={{ height: "800px", width: "100%" }}></div>;
}

export default Map;
