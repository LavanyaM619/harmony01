import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaUser, FaClock, FaEdit, FaTrash, FaHome, FaAddressBook, FaCodeBranch, FaRoute, FaCalendarAlt, FaSignOutAlt ,FaCog} from 'react-icons/fa';

interface Branch {
  _id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  hours: string;
  district: string;
}

const AdminBranch = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:3001/branches');
        if (response.ok) {
          const data: Branch[] = await response.json(); 
          setBranches(data);
        } else {
          alert('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
        alert('An error occurred while fetching branches');
      }
    };

    fetchBranches();
  }, []);

  // Delete a branch
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        const response = await fetch(`http://localhost:3001/branches/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBranches(branches.filter(branch => branch._id !== id));
          alert('Branch deleted successfully');
        } else {
          alert('Failed to delete branch');
        }
      } catch (error) {
        console.error('Error deleting branch:', error);
        alert('An error occurred while deleting the branch');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-gray-900 text-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <Link 
              to="/Admin/admin" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/admin" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>

            <Link 
              to="/Admin/admincontactus" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/admincontactus" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaAddressBook className="mr-3" />
              Contact Us Request
            </Link>

            <Link 
              to="/Admin/adminbranch" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/adminbranch" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaCodeBranch className="mr-3" />
              Branch Management
            </Link>

            <Link 
              to="/Admin/adminroot" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/adminroot" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaRoute className="mr-3" />
              Route Management
            </Link>

            <Link 
              to="/Admin/adminevent" 
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                location.pathname === "/Admin/adminevent" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FaCalendarAlt className="mr-3" />
              Event Management
            </Link>

             <Link 
                          to="/Admin/adminsettings" 
                          className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                            location.pathname === "/Admin/adminsettings" 
                              ? "bg-blue-600 text-white" 
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                        >
                          <FaCog className="mr-3" />
                          Settings
                        </Link>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <Link 
              to="/Admin/logout" 
              className="flex items-center px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-white transition-all"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      <div className="ml-72 flex-1 p-8">
        <div className="flex items-center mb-6">
          <FaBuilding className="text-3xl text-gray-700 mr-3" />
          <h1 className="text-3xl font-bold text-gray-700">Branch Management</h1>
        </div>

        <Link to="/admin/branchadd">
          <button className="bg-green-500 text-white px-6 py-2 rounded mb-6 hover:bg-green-600 transition-colors">
            Add Branch
          </button>
        </Link>

        {/* Branch and District Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaBuilding className="mr-2" /> Branch Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> District
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> Address
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaPhone className="mr-2" /> Phone
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> Manager
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  <div className="flex items-center">
                    <FaClock className="mr-2" /> Hours
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {branches.map(branch => (
                <tr key={branch._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {branch.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {branch.district}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {branch.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {branch.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {branch.manager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {branch.hours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <Link to={`/admin/branchadd`} state={{ branch }}>
                      <button
                        className="bg-indigo-600 text-white p-2 rounded-lg mr-2 hover:bg-indigo-700 transition-colors"
                        title="Edit Branch"
                      >
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="bg-rose-600 text-white p-2 rounded-lg hover:bg-rose-700 transition-colors"
                      onClick={() => handleDelete(branch._id)}
                      title="Delete Branch"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBranch;
