import Course from "../models/Course.js";
import College from "../models/College.js";

export const predictColleges = async (req, res) => {
    try {
        const { examType, category, rankType, rankOrPercentile } = req.body;

        if (!examType || !category || !rankType || rankOrPercentile === undefined) {
            return res.status(400).json({ message: "All fields are required: examType, category, rankType, rankOrPercentile" });
        }

        if (!["Rank", "Percentile"].includes(rankType)) {
            return res.status(400).json({ message: "Invalid rankType. Must be 'Rank' or 'Percentile'." });
        }

        let filterCondition = { examType, category, rankType };

        if (rankType === "Rank") {
            // User's rank should be ≤ maxRank
            filterCondition.maxRankOrPercentile = { $gte: rankOrPercentile };
        } else {
            // User's percentile should be ≥ maxPercentile
            filterCondition.maxRankOrPercentile = { $lte: rankOrPercentile };
        }

        // Find courses based on user input
        const eligibleCourses = await Course.find(filterCondition).populate("collegeId", "name location");

        if (eligibleCourses.length === 0) {
            return res.status(404).json({ message: "No eligible colleges found for this input." });
        }

        // Format response
        const result = eligibleCourses.map(course => ({
            college: course.collegeId,
            courseName: course.courseName,
            duration: course.duration,
            fees: course.fees
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
