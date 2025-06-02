import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useDeleteStationMutation,
  useGetAllStationQuery,
} from "../redux/api/api";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const { data: stations = [], isLoading } = useGetAllStationQuery();
  const [deleteStation] = useDeleteStationMutation();
  const [statusFilter, setStatusFilter] = useState("");
  const [connectorFilter, setConnectorFilter] = useState("");
  const [minPower, setMinPower] = useState("");
  const [maxPower, setMaxPower] = useState("");

  const filteredStations = stations.filter((station) => {
    return (
      (!statusFilter || station.status === statusFilter) &&
      (!connectorFilter || station.connectorType === connectorFilter) &&
      (!minPower || station.powerOutput >= Number(minPower)) &&
      (!maxPower || station.powerOutput <= Number(maxPower))
    );
  });

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this station?"
      );
      if (!confirmed) return;

      await deleteStation(id).unwrap();
      toast.success("Station deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete station");
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white p-4 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Stations</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/add-station")}
        >
          Add Station
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <select
          className="border p-2"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          className="border p-2"
          onChange={(e) => setConnectorFilter(e.target.value)}
          value={connectorFilter}
        >
          <option value="">All Connectors</option>
          <option value="CCS">CCS</option>
          <option value="CHAdeMO">CHAdeMO</option>
          <option value="Type 2">Type2</option>
          <option value="Type `">Type1</option>
          <option value="Tesla">Tesla</option>
        </select>

        <input
          type="number"
          placeholder="Min Power (kW)"
          className="border p-2"
          value={minPower}
          onChange={(e) => setMinPower(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Power (kW)"
          className="border p-2"
          value={maxPower}
          onChange={(e) => setMaxPower(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p>Loading stations...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Power (kW)</th>
                <th className="p-2 border">Connector</th>
                <th className="p-2 border">Latitude</th>
                <th className="p-2 border">Longitude</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map((station) => (
                <tr key={station._id} className="text-center">
                  <td
                    className="p-2 border text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate(`/station/${station._id}`)}
                  >
                    {station.name}
                  </td>
                  <td className="p-2 border">{station.status}</td>
                  <td className="p-2 border">{station.powerOutput}</td>
                  <td className="p-2 border">{station.connectorType}</td>
                  <td className="p-2 border">{station.location.latitude}</td>
                  <td className="p-2 border">{station.location.longitude}</td>
                  <td className="p-2 border ">
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(station._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStations.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No stations match the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
