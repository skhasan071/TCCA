import Placement from "../models/Placement.js";

// ✅ Add Placement Data
// ✅ Add Placement Data
export const addPlacementData = async (req, res) => {
  try {
    const { collegeId, salaryRange, studentsPlaced, companiesVisited } =
      req.body;

    if (!collegeId || !salaryRange || !studentsPlaced || !companiesVisited) {
      return res.status(400).json({
        message:
          "All fields (collegeId, salaryRange, studentsPlaced, companiesVisited) are required",
      });
    }

    const placement = new Placement({
      collegeId,
      salaryRange,
      studentsPlaced,
      companiesVisited, // ✅ JSON format (Array of Strings)
    });

    await placement.save();

    res
      .status(201)
      .json({ message: "Placement data added successfully", placement });
  } catch (error) {
    console.error("❌ Error adding placement data:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get Placement Data by College
export const getPlacementByCollege = async (req, res) => {
  const { collegeId } = req.params;
  try {
    const placements = await Placement.find({ collegeId });

    if (!placements.length) {
      return res
        .status(404)
        .json({ message: "No placement data found for this college" });
    }

    res.status(200).json(placements);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update Placement Data
export const updatePlacement = async (req, res) => {
  try {
    const { placementId } = req.params;
    const { salaryRange, studentsPlaced, companiesVisited } = req.body;

    const updatedPlacement = await Placement.findByIdAndUpdate(
      placementId,
      {
        salaryRange,
        studentsPlaced,
        companiesVisited, // ✅ JSON format (Array of Strings)
      },
      { new: true, runValidators: true }
    );

    if (!updatedPlacement) {
      return res.status(404).json({ message: "Placement data not found" });
    }

    res
      .status(200)
      .json({ message: "Placement data updated", placement: updatedPlacement });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Delete Placement Data (Optional)
export const deletePlacement = async (req, res) => {
  try {
    const { placementId } = req.params;

    const deletedPlacement = await Placement.findByIdAndDelete(placementId);

    if (!deletedPlacement) {
      return res.status(404).json({ message: "Placement data not found" });
    }

    res.status(200).json({ message: "Placement data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default {
  addPlacementData,
  getPlacementByCollege,
  updatePlacement,
  deletePlacement,
};
