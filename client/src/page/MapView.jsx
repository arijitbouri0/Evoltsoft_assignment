import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useGetAllStationQuery } from "../redux/api/api";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
  const { data: stations, isLoading, isError } = useGetAllStationQuery();

  if (isLoading) return <p className="text-center mt-6">Loading map...</p>;
  if (isError) return <p className="text-center mt-6 text-red-500">Failed to load stations.</p>;

  return (
    <div className="w-full h-[90vh] px-2 py-4">
      <MapContainer
        center={[22.5726, 88.3639]} 
        zoom={10}
        scrollWheelZoom={true}
        className="w-full h-full rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations?.map((station) => (
          <Marker
            key={station._id}
            position={[station.location.latitude, station.location.longitude]}
          >
            <Popup>
              <div className="text-sm">
                <strong>{station.name}</strong><br />
                <span>Status: {station.status}</span><br />
                <span>Power: {station.powerOutput} kW</span><br />
                <span>Connector: {station.connectorType}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
