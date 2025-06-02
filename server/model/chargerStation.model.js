import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'Inactive',
  },
  powerOutput: {
    type: Number, // in kilowatts (kW)
    required: true,
  },
  connectorType: {
    type: String,
    required: true, // e.g., Type2, CCS, CHAdeMO, etc.
  },
}, { timestamps: true });

export const Station = mongoose.model('Station', stationSchema);
