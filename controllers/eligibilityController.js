import Eligibility from "../models/Eligibility.js";

// 🔹 Add or Update Eligibility for a College
export const addOrUpdateEligibility = async (req, res) => {
  try {
    const { collegeId, gendersAllowed, categoriesAllowed } = req.body;

    const eligibility = await Eligibility.findOneAndUpdate(
      { collegeId },
      { gendersAllowed, categoriesAllowed },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Eligibility info added/updated",
      eligibility
    });
  } catch (err) {
    console.error("Error in eligibility update:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🔹 Get Eligibility by College ID
export const getEligibility = async (req, res) => {
  try {
    const { collegeId } = req.params;

    const eligibility = await Eligibility.findOne({ collegeId });

    if (!eligibility) return res.status(404).json({ message: "No eligibility info found" });

    res.status(200).json(eligibility);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
