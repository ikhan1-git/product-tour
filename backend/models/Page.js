// models/Page.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PageAnalyticsSchema = new Schema({
  totalViews: { type: Number, default: 0 },
  avgEngagementRate: { type: Number, default: 0 },
  lastVisited: { type: Date },
}, { _id: false });

const PageSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  tours: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
  }],
  analytics: {
    type: PageAnalyticsSchema,
    default: {},
  }
}, { timestamps: true });

const Page = model('Page', PageSchema);
export default Page;
