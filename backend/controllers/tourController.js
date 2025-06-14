import { Tour } from '../models/Tour.js'
// Create
export const createTour = async (req, res) => {
  try {
    const tour = new Tour({
      ...req.body,
      createdBy: req.user?._id // optional
    });
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    console.error('Error in createTour:', error);
    res.status(500).json({ error: error.message });
  }
};

// Read All
export const getTours = async (req, res) => {
  try {
    const clientId = req.query.clientId;
    const filter = clientId ? { clients: clientId } : {};
    const tours = await Tour.find(filter);
    res.json(tours);
  } catch (error) {
    console.error('Error in createTour:', error);
    res.status(500).json({ error: error.message });
  }
};

// Read One
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    console.error('Error in createTour:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user?._id,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    if (!updatedTour) return res.status(404).json({ error: 'Tour not found' });
    res.json(updatedTour);
  } catch (error) {
    console.log("Tour creation failed:", error)
    res.status(500).json({ error: error.message });
  }
};
// Delete
export const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ error: 'Tour not found' });
    res.json({ message: 'Tour deleted' });
  } catch (error) {
    console.error('Error in createTour:', error);
    res.status(500).json({ error: error.message });
  }
};
