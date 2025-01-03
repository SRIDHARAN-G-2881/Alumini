import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../url';

const AdminDeletePic = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/server/gallery/displaygallery`, {
          credentials: 'include',
        });
        const data = await response.json();
        setPictures(data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  const deletePicture = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/server/gallery/deletepicture/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setPictures(pictures.filter((picture) => picture._id !== id));
        console.log('Picture deleted successfully');
      } else {
        console.error('Failed to delete picture');
      }
    } catch (error) {
      console.error('Error deleting picture:', error);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {pictures.map((picture) => (
          <div key={picture._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`${BACKEND_URL}${picture.imageUrl}`}
              alt={picture.description}
              className="w-full h-64 object-cover rounded-md"
            />
            <p className="mt-2 text-center">{picture.description}</p>
            <button
              onClick={() => deletePicture(picture._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDeletePic;
