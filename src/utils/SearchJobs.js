import axios from "axios";

const API_URL = "http://localhost:8000";

export const searchJobs = async ({ location, role, sort, limit } = {}) => {
  try {
    const response = await axios.post(`${API_URL}/jobs/search`, {
      location,
      role,
      sort,
      limit,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { jobs: [] };
  }
};
