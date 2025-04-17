import mongoose from "mongoose";

const AdmissionProcessSchema = new mongoose.Schema(
    {
        collegeId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true
        },
        admissionCriteria: {
            type: String,
            required: true
        },
        applicationProcess: {
            type: String,
            required: true
        },
        importantDates: {
            type: String,
            required: true
        },
        documentsRequired: {
            type: [String], 
      required: true
        },
        selectionProcess: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const AdmissionProcess = mongoose.model("AdmissionProcess", AdmissionProcessSchema);
export default AdmissionProcess;