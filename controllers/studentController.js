import Student from "../models/studentModel.js";
import mongoose from "mongoose";

// ✅ Middleware to Check Authentication
import jwt from "jsonwebtoken";

// ✅ Helper function to get user from token
const getUserFromToken = (req) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1]; // This removes the "Bearer " part
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
};

// ✅ Add or Update Student Profile
export const addOrUpdateStudent = async (req, res) => {
    try {
        const user = getUserFromToken(req);
        if (!user) {
            return res.status(403).json({ message: "Unauthorized. Please log in." });
        }

        const { mobileNumber, studyingIn, city, passedIn, gender, dob } = req.body;
        let image = req.file ? req.file.path : null;

        // ✅ Validate required fields
        if (!mobileNumber || !studyingIn || !city || !passedIn) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobileNumber)) {
            return res.status(400).json({ message: "Invalid mobile number format." });
        }

        if(gender){
            const validGenders = ["Male", "Female", "Other"];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender. Allowed values: Male, Female, Other" });
        }}

        if(dob){
            const parsedDob = new Date(dob);
        if (isNaN(parsedDob)) {
            return res.status(400).json({ message: "Invalid date format for DOB" });
        }
        }

        // ✅ Check if student profile exists for this user
        let student = await Student.findOne({ email: user.email });

        if (student) {
            // ✅ Update existing student profile
            student.mobileNumber = mobileNumber;
            student.studyingIn = studyingIn;
            student.city = city;
            if(gender) student.gender = gender;
            if(dob) student.dob = parsedDob;
            student.passedIn = passedIn || student.passedIn;
            if (image) student.image = image;

            await student.save();
            return res.status(200).json({ message: "Profile updated successfully", student });
        } else {
            // ✅ Create new student profile
            student = new Student({
                name: user.name, // Take name from registered user
                email: user.email, // Take email from registered user
                mobileNumber,
                studyingIn,
                city,
                gender,
                dob: parsedDob,
                image,
                passedIn,
            });

            await student.save();
            return res.status(201).json({ message: "Profile created successfully", student });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Save Course Preferences for a Student
export const saveCoursePreferences = async (req, res) => {
    try {
        const user = getUserFromToken(req);
        if (!user) {
            return res.status(403).json({ message: "Unauthorized. Please log in." });
        }

        const { interestedStreams, coursesInterested, preferredYearOfAdmission, preferredCourseLevel, modeOfStudy } = req.body;

        // ✅ Find student by logged-in user's email
        const student = await Student.findOne({ email: user.email });
        if (!student) {
            return res.status(404).json({ message: "Student profile not found. Please complete your profile first." });
        }

        // ✅ Predefined options
        const validStreams = ["Engineering", "Management", "Arts", "Science", "Law", "Medicine", "Design", "Humanities"];
        const validCourses = ["BBA/MBA(General)", "MBA(Finance)", "MBA(Marketing)", "MBA(HR)", "MBA(Operations)", "PGDM", "Entrepreneurship & Startups", "Business Analytics"];
        const validCourseLevels = ["UG", "PG", "Diploma(certification)"];
        const validModes = ["Online", "Full-time", "Part-time", "Distance learning"];
        const validYears = ["2025", "2026"];

        // ✅ Validate interestedStreams
        if (interestedStreams) {
            if (!Array.isArray(interestedStreams)) {
                return res.status(400).json({ message: "interestedStreams should be an array." });
            }
            for (let stream of interestedStreams) {
                if (!validStreams.includes(stream)) {
                    return res.status(400).json({ message: `Invalid stream: ${stream}` });
                }
            }
            student.interestedStreams = interestedStreams;
        }

        // ✅ Validate coursesInterested
        if (coursesInterested) {
            if (!Array.isArray(coursesInterested)) {
                return res.status(400).json({ message: "coursesInterested should be an array." });
            }
            for (let course of coursesInterested) {
                if (!validCourses.includes(course)) {
                    return res.status(400).json({ message: `Invalid course: ${course}` });
                }
            }
            student.coursesInterested = coursesInterested;
        }

        // ✅ Validate preferredCourseLevel
        if (preferredCourseLevel) {
            if (!validCourseLevels.includes(preferredCourseLevel)) {
                return res.status(400).json({ message: "Invalid preferredCourseLevel." });
            }
            student.preferredCourseLevel = preferredCourseLevel;
        }

        // ✅ Validate modeOfStudy
        if (modeOfStudy) {
            if (!validModes.includes(modeOfStudy)) {
                return res.status(400).json({ message: "Invalid modeOfStudy." });
            }
            student.modeOfStudy = modeOfStudy;
        }

        // ✅ Validate preferredYearOfAdmission
        if (preferredYearOfAdmission) {
            if (!validYears.includes(preferredYearOfAdmission)) {
                return res.status(400).json({ message: "Invalid preferredYearOfAdmission." });
            }
            student.preferredYearOfAdmission = preferredYearOfAdmission;
        }

        // ✅ Save updated student preferences
        await student.save();

        res.status(200).json({ message: "Preferences saved successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getStudentById = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }
  
    try {
      // ❌ Remove .populate('favorites')
      const student = await Student.findById(id);
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student);
    } catch (error) {
      console.error('Error getting student by ID:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  