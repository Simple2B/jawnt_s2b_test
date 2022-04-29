import "./App.css";
import TransportList from "./JawntScreen/TransportList";
import Map from "./JawntScreen/Map";
import { useState } from "react";

const transport = [
  {
    id: 1,
    type: "Bike",
    link: "https://kiosks.bicycletransit.workers.dev/phl",
  },
  { id: 2, type: "Bus", link: "https://www3.septa.org/api/TransitView/42" },
];

function App() {
  // const [transport1, setTransport] = useState([
  //   { id: 1, type: "Bike" },
  //   { id: 2, type: "Bus" },
  // ]);

  return (
    <div className="App">
      <h1>CityCoHo live transit information</h1>
      <div>
        <TransportList transport={transport} />
      </div>
      <Map transport={transport} />
    </div>
  );
}

export default App;
