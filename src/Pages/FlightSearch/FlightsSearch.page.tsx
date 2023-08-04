import FlightSearchHead from "../../Components/Flight/FlightSearchHead.component";
import FlightSearchHeadsmall from "../../Components/Flight/FlightSearchHead.small.component";
import SearchResult from "../../Components/Search/SearchResult.component";
import SearchResultSmall from "../../Components/Search/SearchResultSmall.component";

export default function Flightspage() {
  return (
    <div>
      <div className="lg:block hidden">
        <FlightSearchHead />
        <SearchResult />
      </div>
      <div className="block lg:hidden">
        <FlightSearchHeadsmall />
        <SearchResultSmall />
      </div>
    </div>
  );
}
