import mongoose from "mongoose";

const PlacementSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true
    },
    salaryRange: {
      type: String, // Example: "3-5 LPA"
      required: true
    },
    studentsPlaced: {
      type: Number,
      required: true
    },
    companiesVisited: {
      type: [String], // ✅ New field: List of companies that visited
      required: true
    },
    highestPackage: {
      type: String, // ✅ New field: List of companies that visited
      required: true
    },
    averagePackage: {
      type: String, // ✅ New field: List of companies that visited
      required: true
    },
    placementRate: {
      type: String, // ✅ New field: List of companies that visited
      required: true
    },
    recentPlacements: {
      type: [String], // ✅ New field: List of companies that visited
      required: true
    },
    fiveToTen: {
      type: String, // ✅ New field: List of companies that visited
      required: true
    },
    tenToFifteen : {
      type: String, // ✅ New field: List of companies that visited
      required: true
    },
    fifteenToTwenty: {
      type: String, // ✅ New field: List of companies that visited
      required: true
    },
    aboveTwenty: {
      type: String, // ✅ New field: List of companies that visited
      required: true
    },
  },
  { timestamps: true }
);

const Placement = mongoose.model("Placement", PlacementSchema);
export default Placement;
