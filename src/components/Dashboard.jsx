import { useState } from "react";

const Dashboard = () => {
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA (Remote)", 
      salary: "$120k - $180k",
      skills: ["React", "TypeScript", "GraphQL"],
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupX",
      location: "New York, NY",
      salary: "$100k - $150k", 
      skills: ["Node.js", "Vue.js", "AWS"],
      postedDate: "5 days ago",
    },
  ]);

  const handleScrape = () => {
    setIsScrapingActive(true);
    // Simulate scraping process
    setTimeout(() => {
      setIsScrapingActive(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
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
                Currently tracking <span className="font-medium text-primary-600">{jobs.length} jobs</span>
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
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-medium">Scraping completed successfully! New jobs have been added to your dashboard.</span>
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
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-primary-600 font-medium">{job.company}</p>
                </div>
                <span className="text-sm font-medium px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
                  {job.postedDate}
                </span>
              </div>
              <div className="mt-6 space-y-3">
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
                  <span className="font-medium">{job.location}</span>
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
                  <span className="font-medium">{job.salary}</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
