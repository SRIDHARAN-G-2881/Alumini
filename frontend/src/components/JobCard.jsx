import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaExternalLinkAlt } from 'react-icons/fa';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleViewAlumniClick = () => {
    navigate(`/officebearer/${job.companyname}`);
  };

  return (
    <div className="relative flex flex-col my-6 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg w-96 transition-transform hover:scale-105">
      <div className="p-5">
        <h5 className="mb-3 text-gray-900 dark:text-white text-2xl font-bold">{job.companyname}</h5>
        
        <p className="text-gray-700 dark:text-gray-300 leading-normal mb-2">
          <strong className="text-gray-800 dark:text-gray-200">Role:</strong> {job.role}
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 leading-normal mb-2">
          <strong className="text-gray-800 dark:text-gray-200">Location:</strong> {job.location}
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 leading-normal mb-2">
          <strong className="text-gray-800 dark:text-gray-200">Required Skills:</strong> {job.requireskills}
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 leading-normal mb-2">
          <strong className="text-gray-800 dark:text-gray-200">Course:</strong> {job.coursespecialization}
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {job.description}
        </p>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          <strong>Posted on:</strong> {formatDate(job.createdAt)}
        </p>

        <div className="flex justify-between items-center mt-4">
          <button
            className="rounded-md bg-blue-600 dark:bg-blue-500 py-2 px-4 text-sm text-white font-medium transition-all hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
            type="button"
            onClick={handleViewAlumniClick}
          >
            View Alumni
          </button>

          {job.websiteUrl && (
            <a
              href={job.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center font-medium"
            >
              Visit <FaExternalLinkAlt className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
