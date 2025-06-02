import { useGetStationByIdQuery, useUpdateStationMutation } from "../redux/api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast"; // For success/error notifications

const StationDetails = () => {
  const { id } = useParams();
  const { data: station, isLoading, error } = useGetStationByIdQuery(id);
  const [updateStation, { isLoading: isUpdating }] = useUpdateStationMutation();

  // Local state for the form fields
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    powerOutput: "",
    connectorType: "",
    latitude: "",
    longitude: "",
  });

  // When station data loads, populate the form
  useEffect(() => {
    if (station) {
      setFormData({
        name: station.name || "",
        status: station.status || "",
        powerOutput: station.powerOutput || "",
        connectorType: station.connectorType || "",
        latitude: station.location?.latitude || "",
        longitude: station.location?.longitude || "",
      });
    }
  }, [station]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await updateStation({
        id,
        body: {
          name: formData.name,
          status: formData.status,
          powerOutput: Number(formData.powerOutput),
          connectorType: formData.connectorType,
          location: {
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude),
          },
        },
      }).unwrap();


      toast.success("Station updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update station");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading station details</p>;

  return (
    <div className="max-w-[800px] w-full mx-auto bg-white shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Station</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Power Output (kW)</label>
          <input
            name="powerOutput"
            type="number"
            value={formData.powerOutput}
            onChange={handleChange}
            className="border p-2 w-full"
            required
            min={0}
          />
        </div>

        <div>
          <label className="block font-semibold">Connector Type</label>
          <select
            name="connectorType"
            value={formData.connectorType}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 1">Type 1</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Latitude</label>
          <input
            name="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Longitude</label>
          <input
            name="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isUpdating ? "Updating..." : "Update Station"}
        </button>
      </form>
    </div>
  );
};

export default StationDetails;
