import College from "../models/College.js";

// ✅ Filter Colleges by Stream, Country, State, and City
export const filterCollegesByStream = async (req, res) => {
  try {
    const { stream, country, state, city } = req.query;

    // ✅ Ensure `stream` is provided (must come first)
    if (!stream) {
      return res.status(400).json({ message: "Stream is required for filtering." });
    }

    // ✅ Define valid streams
    const validStreams = ["Engineering", "Medical", "Law", "Graduation"];
    if (!validStreams.includes(stream)) {
      return res.status(400).json({ message: `Invalid stream. Allowed values: ${validStreams.join(", ")}` });
    }

    // ✅ Build dynamic query object
    let query = { stream };

    // ✅ Allow filtering by country (optional)
    if (country) {
      query.country = country;
    }

    // ✅ Allow filtering by state (optional)
    if (state) {
      query.state = state;
    }

    // ✅ Allow filtering by city (optional)
    if (city) {
      query.city = city;
    }

    // ✅ Fetch colleges based on filters
    const colleges = await College.find(query);

    if (colleges.length === 0) {
      return res.status(404).json({ message: "No colleges found for the given filters." });
    }

    res.status(200).json(colleges);

  } catch (error) {
    console.error("Error filtering colleges:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
