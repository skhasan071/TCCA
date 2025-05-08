import mongoose from "mongoose";

const EligibilitySchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true
  },
  gendersAllowed: {
    type: String,
    enum: ["Male", "Female", "Both"],
    required: true
  },
  categoriesAllowed: {
    type: [String],
    enum: ["General", "OBC", "SC", "ST", "EWS", "PWD", "Other"],
    default: ["General"]
  }
});

const Eligibility = mongoose.model("Eligibility", EligibilitySchema);
export default Eligibility;
