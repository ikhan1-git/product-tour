import { TourAnalytics } from "../models/Analytics.js";

// Increment tour view count
export const incrementView = async (req, res) => {
  try {
    const { tourId } = req.body;
    let analytics = await TourAnalytics.findOne({ tourId });
    if (!analytics) {
      analytics = new TourAnalytics({ tourId, views: 1 });
    } else {
      analytics.views += 1;
    }
    await analytics.save();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Increment tour completion count
export const incrementCompletion = async (req, res) => {
  try {
    const { tourId } = req.body;
    let analytics = await TourAnalytics.findOne({ tourId });
    if (!analytics) {
      analytics = new TourAnalytics({ tourId, completions: 1 });
    } else {
      analytics.completions += 1;
    }
    await analytics.save();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};