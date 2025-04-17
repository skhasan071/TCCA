import AdmissionProcess from "../models/AdmissionProcess.js";

// ✅ Add Admission Process
export const addAdmissionProcess = async (req, res) => {
  try {
    const {
      collegeId,
      admissionCriteria,
      applicationProcess,
      importantDates,
      documentsRequired,
      selectionProcess,
    } = req.body;

    if (
      !collegeId ||
      !admissionCriteria ||
      !applicationProcess ||
      !importantDates ||
      !documentsRequired ||
      !selectionProcess
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admissionProcess = new AdmissionProcess({
      collegeId,
      admissionCriteria,
      applicationProcess,
      importantDates,
      documentsRequired,
      selectionProcess,
    });

    await admissionProcess.save();

    res.status(201).json({
      message: "Admission process added successfully",
      admissionProcess,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get Admission Process by College
export const getAdmissionProcessByCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;

    const admissionProcess = await AdmissionProcess.findOne({ collegeId });

    if (!admissionProcess) {
      return res.status(404).json({ message: "Admission process not found" });
    }

    res.status(200).json(admissionProcess);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update Admission Process
export const updateAdmissionProcess = async (req, res) => {
  try {
    const { admissionProcessId } = req.params;
    const {
      admissionCriteria,
      applicationProcess,
      importantDates,
      documentsRequired,
      selectionProcess,
    } = req.body;

    const updatedAdmissionProcess = await AdmissionProcess.findByIdAndUpdate(
      admissionProcessId,
      {
        admissionCriteria,
        applicationProcess,
        importantDates,
        documentsRequired,
        selectionProcess,
      },
      { new: true, runValidators: true }
    );

    if (!updatedAdmissionProcess) {
      return res.status(404).json({ message: "Admission process not found" });
    }

    res.status(200).json({
      message: "Admission process updated successfully",
      admissionProcess: updatedAdmissionProcess,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default {
  addAdmissionProcess,
  getAdmissionProcessByCollege,
  updateAdmissionProcess,
};
