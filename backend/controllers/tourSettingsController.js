import { TourSettings } from '../models/TourSettings.js';


// Get global settings
export const getSettings = async (req, res) => {
  try {
    const settings = await TourSettings.findOne({});
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update global settings
export const updateSettings = async (req, res) => {
  try {
    const updatedSettings = await TourSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};