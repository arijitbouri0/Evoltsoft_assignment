import React, { useState } from "react";
import { useCreateStationMutation } from "../redux/api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateStation = () => {
  const navigate = useNavigate();
  const [createStation, { isLoading }] = useCreateStationMutation();

  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    status: "active",
    powerOutput: "",
    connectorType: "Type 1",
  });

  const connectorTypes = ["Type 1", "Type 2", "CCS", "CHAdeMO", "Tesla"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      location: {
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      },
      status: formData.status,
      powerOutput: Number(formData.powerOutput),
      connectorType: formData.connectorType,
    };

    try {
      await createStation(payload).unwrap();
      toast.success("Charging station created!");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create station.");
    }
  };

  return (
    <div className="max-w-[800px] w-full mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Charging Station</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Station Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex gap-2">
          <input
            type="number"
            name="latitude"
            step="any"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
            required
          />
          <input
            type="number"
            name="longitude"
            step="any"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
            required
          />
        </div>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input
          type="number"
          name="powerOutput"
          placeholder="Power Output (kW)"
          value={formData.powerOutput}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="connectorType"
          value={formData.connectorType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {connectorTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Creating..." : "Create Station"}
        </button>
      </form>
    </div>
  );
};

export default CreateStation;
