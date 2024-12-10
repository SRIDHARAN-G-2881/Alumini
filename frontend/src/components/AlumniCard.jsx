import { FaLinkedin, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const AlumniCard = ({ alumnus }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const openLinkedInProfile = () => {
    window.open(alumnus.linkedinUrl, "_blank");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleConnect = () => {
    setIsConnected(true);
  };

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative">
      {/* Dropdown Button */}
      <div className="flex justify-end px-4 pt-4">
        <button
          onClick={toggleDropdown}
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="z-10 absolute top-12 right-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Profile Image and Name */}
      <div className="flex flex-col items-center justify-center p-4 rounded-t-lg">
        <img
          src={alumnus.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 border-2 border-blue-500"
        />
        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{alumnus.name}</p>
      </div>

      {/* Alumni Info */}
      <div className="px-5 pb-4 text-gray-700 dark:text-gray-300">
        <p className="mb-2"><strong>Company:</strong> {alumnus.company}</p>
        <p className="mb-2"><strong>Job Title:</strong> {alumnus.role}</p>
        <p className="mb-2"><strong>Graduation Year:</strong> {alumnus.graduationYear}</p>
        <p className="mb-2"><strong>Phone:</strong> {alumnus.contact}</p>
        <p className="mb-2"><strong>Email:</strong> {alumnus.email}</p>
      </div>

      {/* LinkedIn and Connect Buttons */}
      <div className="flex items-center justify-end space-x-4 px-5 pb-4">
        <button
          onClick={openLinkedInProfile}
          className="bg-blue-600 text-white py-1 px-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <FaLinkedin className="text-white" />
          <span>LinkedIn</span>
        </button>

        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
          >
            Connect
          </button>
        ) : (
          <div className="flex items-center space-x-2 text-green-600 font-medium">
            <FaCheckCircle className="text-green-600" />
            <span>Request Sent Successfully</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniCard;
