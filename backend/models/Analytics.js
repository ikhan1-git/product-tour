import mongoose from 'mongoose';

const { Schema, model } = mongoose;
// Analytics schema
const TourAnalyticsSchema = new Schema({
  tourId: { type: Schema.Types.ObjectId, ref: 'Tour' },
  views: { type: Number, default: 0 },
  completions: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 },
});
export const TourAnalytics = model('TourAnalytics', TourAnalyticsSchema);