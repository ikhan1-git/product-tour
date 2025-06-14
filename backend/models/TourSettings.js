import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Notification Settings schema
const NotificationSettingsSchema = new Schema({
  tourCompletionReports: { type: Boolean, default: false },
  weeklyAnalyticsSummary: { type: Boolean, default: false },
  tourErrorsAlerts: { type: Boolean, default: false },
  lowCompletionRateAlerts: { type: Boolean, default: false },
  apiUsageLimitWarnings: { type: Boolean, default: false },
  newPageDetection: { type: Boolean, default: false }
});

// API Integration schema
const APIIntegrationSchema = new Schema({
  apiKey: String,
  webhookUrl: String,
  allowedDomains: [String],
  enableCORS: { type: Boolean, default: false }
});

// Tour Settings schema
const TourSettingsSchema = new Schema({
  organizationName: String,
  theme: { type: String, enum: ['light', 'dark', 'custom'], default: 'light' },
  defaultPosition: { type: String, enum: ['auto', 'top', 'bottom', 'left', 'right'], default: 'auto' },
  autoStartNewUsers: { type: Boolean, default: false },
  enableAdvancedAnalytics: { type: Boolean, default: false },
  notificationSettings: NotificationSettingsSchema,
  apiIntegration: APIIntegrationSchema,
});
export const TourSettings = model('TourSettings', TourSettingsSchema);