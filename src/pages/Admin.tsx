import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { FaUsers, FaEnvelope, FaBuilding, FaRoute, FaChartLine, FaHome, FaAddressBook, FaCodeBranch, FaCalendarAlt, FaSignOutAlt, FaCog } from "react-icons/fa";
interface Contact {
  _id: string;
  name: string;
  subject: string;
  createdAt: string;
}

interface Branch {
  _id: string;
  name: string;
  district: string;
  manager: string;
}

interface Root {
  _id: string;
  name: string;
  district: string;
  managerName: string;
}

interface DashboardStats {
  contactCount: number;
  branchCount: number;
  rootCount: number;
  recentContacts: Contact[];
  recentBranches: Branch[];
  recentRoots: Root[];
}


const Admin = () => {
  const location = useLocation();
  const [stats, setStats] = useState<DashboardStats>({
    contactCount: 0,
    branchCount: 0,
    rootCount: 0,
    recentContacts: [],
    recentBranches: [],
    recentRoots: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [contactsRes, branchesRes, rootsRes] = await Promise.all([
          axios.get("http://localhost:3001/ContactMessages"),
          axios.get("http://localhost:3001/branches"),
          axios.get("http://localhost:3001/roots")
        ]);

        setStats({
          contactCount: contactsRes.data.length,
          branchCount: branchesRes.data.length,
          rootCount: rootsRes.data.length,
          recentContacts: contactsRes.data.slice(0, 5),
          recentBranches: branchesRes.data.slice(0, 5),
          recentRoots: rootsRes.data.slice(0, 5)
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

      {/* Main Content */}
      <div className="ml-72 flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Contact Requests Card */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Contact Requests</h3>
                    <p className="text-3xl font-bold">{stats.contactCount}</p>
                  </div>
                  <FaEnvelope className="text-4xl" />
                </div>
                <div className="mt-4">
                  <Link to="/Admin/admincontactus" className="text-sm hover:underline">
                    View All Requests →
                  </Link>
                </div>
              </div>

              {/* Branches Card */}
              <div className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Total Branches</h3>
                    <p className="text-3xl font-bold">{stats.branchCount}</p>
                  </div>
                  <FaBuilding className="text-4xl" />
                </div>
                <div className="mt-4">
                  <Link to="/Admin/adminbranch" className="text-sm hover:underline">
                    Manage Branches →
                  </Link>
                </div>
              </div>

              {/* Roots Card */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Total Routes</h3>
                    <p className="text-3xl font-bold">{stats.rootCount}</p>
                  </div>
                  <FaRoute className="text-4xl" />
                </div>
                <div className="mt-4">
                  <Link to="/Admin/adminroot" className="text-sm hover:underline">
                    Manage Routes →
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Contacts */}
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaEnvelope className="mr-2" /> Recent Contact Requests
                </h3>
                <div className="space-y-4">
                  {stats.recentContacts.map((contact) => (
                    <div key={contact._id} className="border-b pb-2">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.subject}</p>
                      <p className="text-xs text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Branches */}
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaBuilding className="mr-2" /> Recent Branches
                </h3>
                <div className="space-y-4">
                  {stats.recentBranches.map((branch) => (
                    <div key={branch._id} className="border-b pb-2">
                      <p className="font-medium">{branch.name}</p>
                      <p className="text-sm text-gray-600">{branch.district}</p>
                      <p className="text-xs text-gray-500">{branch.manager}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Roots */}
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaRoute className="mr-2" /> Recent Routes
                </h3>
                <div className="space-y-4">
                  {stats.recentRoots.map((root) => (
                    <div key={root._id} className="border-b pb-2">
                      <p className="font-medium">{root.name}</p>
                      <p className="text-sm text-gray-600">{root.district}</p>
                      <p className="text-xs text-gray-500">{root.managerName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
