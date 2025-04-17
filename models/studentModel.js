import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    studyingIn: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    passedIn: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    interestedStreams: {
      type: [String],
      required: false,
    },
    coursesInterested: {
      type: [String],
      required: false,
    },
    preferredCourseLevel: {
      type: String,
      required: false,
    },
    modeOfStudy: {
      type: String,
      required: false,
    },
    preferredYearOfAdmission: {
      type: String,
      required: false,
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "College",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
