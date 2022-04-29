import { useEffect, useState } from "react";

export default function Transport(transport) {
  const [items, setItems] = useState([]);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://dry-plains-47117.herokuapp.com/" + transport.link)
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
        //console.log(props.transport.type, "result", result);
        if (transport.type === "Bus") {
          console.log(transport.type, "result.bus", result.bus);
          return result.bus;
        } else if (transport.type === "Bike") {
          console.log(transport.type, "result.features", result.features);
          return result.features;
        }
      });
  }, []);
  //console.log(transport, "items", items);
  //return items;
}

// export default function Transport(props) {
//   const items = [];
//   useEffect(() => {
//     fetch("https://dry-plains-47117.herokuapp.com/" + props.transport.link)
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(props.transport.type, "result", result);
//         if (props.transport.type === "Bus") {
//           return result.bus.map((bus) => {
//             // console.log("[bus.lat, bus.lng]", [
//             //   parseFloat(bus.lat),
//             //   parseFloat(bus.lng),
//             // ]);

//             items.push([parseFloat(bus.lat), parseFloat(bus.lng)]);
//           });
//         } else if (props.transport.type === "Bike") {
//           return result.features.map((bike) => {
//             //console.log("bike.geometry.coordinates", bike.geometry.coordinates);
//             items.push(bike.geometry.coordinates);
//           });
//         }
//       });
//   }, [props.transport.link, props.transport.type]);
//   console.log("items", items);
//   return items;
// }
