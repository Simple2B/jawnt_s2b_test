import React from "react";

export default function TransportList(props) {
  return (
    <table className="markers">
      <tr>
        <th>
          <div className="cellText">
            <img
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
              alt="CitiCoHo"
              height={"40px"}
            ></img>{" "}
            Blue marker is co-working space CityCoho
          </div>
        </th>

        <th>
          <div className="cellText">
            <img
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png"
              alt="Bus"
              height={"40px"}
            ></img>{" "}
            Yellow marker is a SEPTA Route 42 bus
          </div>
        </th>

        <th>
          <div className="cellText">
            <img
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
              alt="Bike"
              height={"40px"}
            ></img>{" "}
            Green marker is a bike rent station at 23rd and Chestnut
          </div>
        </th>
      </tr>
    </table>
  );
}
