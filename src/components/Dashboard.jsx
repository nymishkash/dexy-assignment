import { useEffect, useState } from "react";
import { searchJobs } from "../utils/SearchJobs";

const Dashboard = () => {
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    searchJobs({})
      .then((response) => {
        setJobs(response?.jobs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleScrape = () => {
    setIsScrapingActive(true);
    setTimeout(() => {
      setIsScrapingActive(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const parseRawData = (rawDataString) => {
    try {
      // Replace Python booleans with JavaScript booleans
      const jsonString = rawDataString
        .replace(/'/g, '"')
        .replace(/True/g, 'true')
        .replace(/False/g, 'false');
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse raw data:", error, rawDataString);
      return {
        liveStartAt: Date.now() / 1000 // fallback to current time
      };
    }
  };
  
  const getTimeAgo = (timestamp) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    console.log('Processing timestamp:', {
      raw: timestamp,
      date: new Date(timestamp * 1000).toISOString(),
      now: new Date(now * 1000).toISOString(),
      diff
    });
  
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
  
    if (diff < 0) {
      return "Scheduled";
    }
  
    if (months > 0) {
      return `${months} month${months === 1 ? "" : "s"} ago`;
    }
    if (days > 0) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
    if (hours > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }
    return "Just now";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status Section */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Job Hunt Dashboard
              </h1>
              <p className="text-lg text-gray-500">
                Currently tracking{" "}
                <span className="font-medium text-primary-600">
                  {jobs.length} jobs
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isScrapingActive ? (
                <div className="flex items-center text-primary-600 bg-primary-50 px-6 py-3 rounded-lg">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="font-medium">Scraping in progress...</span>
                </div>
              ) : (
                <button
                  onClick={handleScrape}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Start New Scrape
                </button>
              )}
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">
                Scraping completed successfully! New jobs have been added to
                your dashboard.
              </span>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Salary Range
              </label>
              <select className="w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 bg-white hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                <option>All Ranges</option>
                <option>$80k - $100k</option>
                <option>$100k - $150k</option>
                <option>$150k+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <select className="w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 bg-white hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                <option>All Locations</option>
                <option>Remote</option>
                <option>United States</option>
                <option>Europe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Type
              </label>
              <select className="w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 bg-white hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                <option>All Types</option>
                <option>Full-time</option>
                <option>Contract</option>
                <option>Part-time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job) => {
            const rawData = parseRawData(job.raw_data);
            const liveStartAt = rawData.liveStartAt;
            const now = Date.now() / 1000;
            const daysDiff = (now - liveStartAt) / (60 * 60 * 24);
            const showPostedTime = daysDiff < 3;

            return (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={job.company_logo}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 flex-wrap truncate">
                          {job.title}
                        </h3>
                        <p className="text-primary-600 font-medium">
                          {job.company}
                        </p>
                        {showPostedTime && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                            Posted {getTimeAgo(liveStartAt)}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full whitespace-nowrap">
                        {job.remote ? "Remote" : "On-site"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium truncate">
                      {job.location || "No location specified"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">{job.compensation}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <a
                    href={`https://wellfound.com/jobs?job_listing_id=${job.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                  >
                    View Details
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
