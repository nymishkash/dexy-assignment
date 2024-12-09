import axios from "axios";

const API_URL = "http://localhost:8000";

export const startScrape = async () => {
  try {
    const response = await axios.post(`${API_URL}/scrape`);

    if (response.status === 200) {
      return {
        success: true,
        jobsCount: response.data.jobs_count,
        status: response.data.status,
      };
    } else {
      throw new Error(response.data.error || "Scraping failed");
    }
  } catch (error) {
    console.error("Error starting scrape:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message,
      status: "scrape failed",
    };
  }
};
