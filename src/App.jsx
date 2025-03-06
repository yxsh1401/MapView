import { useState, useMemo } from "react";
import "./App.css";
import LeftNav from "./components/LeftNav";
import Map from "./components/Map";
import TopMenuBar from "./components/TopMenu";
import Trip from "./components/Trip";
import { RouteProvider } from "./context/RouteContext";

function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  return (
    <RouteProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar */}
        <LeftNav onHoverChange={setIsNavExpanded} />

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isNavExpanded ? "0" : "ml-0"
          }`}
        >
          <TopMenuBar />
          <div className="flex">
            <Trip />
            <Map />
          </div>
        </div>
      </div>
    </RouteProvider>
  );
}
export default App;
