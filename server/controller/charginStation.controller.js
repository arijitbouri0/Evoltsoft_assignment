import { Station } from "../model/chargerStation.model.js";
import { ErrorHandler } from "../utils/utility.js"

const createStation = async (req, res,next) => {
  try {
    if (!req.user) {
      return next(new ErrorHandler("Please Login ", 404));
    }
    const { name, location, status, powerOutput, connectorType } = req.body;
    const newStation = new Station({
      name,
      location,
      status,
      powerOutput,
      connectorType,
    });
    await newStation.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStation = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ErrorHandler("Please login", 401)); 
    }

    const { id } = req.params;
    const {
      name,
      status,
      powerOutput,
      connectorType,
      location, 
    } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (status !== undefined) updateData.status = status;
    if (powerOutput !== undefined) updateData.powerOutput = powerOutput;
    if (connectorType !== undefined) updateData.connectorType = connectorType;
    if (location) {
      updateData.location = {};

      if (location.latitude !== undefined) updateData.location.latitude = location.latitude;
      if (location.longitude !== undefined) updateData.location.longitude = location.longitude;
    }
    const updatedStation = await Station.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStation) {
      return next(new ErrorHandler("Charging station not found", 404));
    }

    res.status(200).json(updatedStation);
  } catch (error) {
    next(error); 
  }
};

const deleteStation = async (req, res,next) => {
  try {
    if (!req.user) {
      return next(new ErrorHandler("Please Login ", 404));
    }
    const { id } = req.params;
    const deletedStation = await Station.findByIdAndDelete(id);

    if (!deletedStation) {
       return next(new ErrorHandler("Charging station not found",404))
    }

    res.status(200).json({ message: "Charging station deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStationById = async (req, res,next) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return next(new ErrorHandler("Charging station not found",404))
    res.status(200).json(station);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createStation,
  getAllStations,
  updateStation,
  deleteStation,
  getStationById
};
