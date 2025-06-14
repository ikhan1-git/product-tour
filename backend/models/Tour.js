import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  stepTitle: {
    type: String,
    required: true,
  },
  stepDescription: {
    type: String,
    required: true,
  }
});

const PageSchema = new mongoose.Schema({
  tourPageUrl: {
    type: String,
    required: true,
  },
  continueOnNextPage: {
    type: Boolean,
    default: false,
  },
  steps: {
    type: [StepSchema],
    required: true,
    validate: [steps => steps.length > 0, 'At least one step is required.'],
  }
});

const tourSchema = new mongoose.Schema({
  tourName: {
    type: String,
    required: true,
  },
  tourDescription: {
    type: String,
    required: true,
  },
  pages: {
    type: [PageSchema],
    required: true,
    validate: [pages => pages.length > 0, 'At least one page is required.'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },  
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// export default mongoose.model('Tour', tourSchema);
export const Tour = mongoose.model('Tour', tourSchema);
