import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Context/AuthContext';
import { FaMoneyBillWave, FaTint, FaUsers } from 'react-icons/fa';
import DonationRequest from '../../Donor/DonationRequest';
import { Link } from 'react-router';

const MainDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user, role, roleLoading } = useContext(AuthContext);

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFunding: 0,
        totalRequests: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user || !role) return;

            setLoading(true);
            const userRole = role.toLowerCase();

            try {
                let totalUsers = 0;
                let totalFunding = 0;
                let totalRequests = 0;
                
                if (userRole === "admin") {

                    const res = await axiosSecure.get("/admin/dashboard-stats");

                    totalUsers = res.data.totalUsers;
                    totalRequests = res.data.totalRequests;
                    totalFunding = res.data.totalFunding;
                }

                if (userRole === "volunteer") {
                     const res = await axiosSecure.get(
                       "/admin/dashboard-stats"
                     );

                     totalUsers = res.data.totalUsers;
                     totalRequests = res.data.totalRequests;
                     totalFunding = res.data.totalFunding;
                }


                if (userRole === "donor") {
                    const paymentsRes = await axiosSecure.get("/payments/total");
                    totalFunding = paymentsRes.data.totalAmount;
                }

                setStats({ totalUsers, totalRequests, totalFunding });
            } catch (error) {
                console.log("Error fetching dashboard stats: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [axiosSecure, user, role]);

    if (!user || roleLoading) {
        return <p className='text-center p-6'>Loading  user info....</p>
    }
    if (loading) {
        return <p className='text-center p-6'>Loading desboard stats....</p>
    }

    const userRole = role.toLowerCase();

    return (
      <div className="p-6 space-y-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md w-4/6 mx-auto">
          <h1 className="text-2xl font-bold text-center">
            {userRole === "admin" && " Welcome to Admin Dashboard"}
            {userRole === "volunteer" && "Welcome Volunteer"}
          </h1>
          <h1 className="text-2xl font-bold text-center">
            Welcome, {user.displayName} 👋
          </h1>
          <p className="mt-2 text-center">
            {userRole === "admin" &&
              "Manage users, funding, and blood donation requests efficiently."}
            {userRole === "volunteer" &&
              "View and manage assigned blood donation requests."}
            {userRole === "donor" &&
              "Track your donations and support blood donation efforts."}
          </p>
        </div>

        {userRole === "admin" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                <FaUsers className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-500">Total Users</p>
                  <h2 className="text-xl font-bold">{stats.totalUsers}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                <FaMoneyBillWave className="text-green-500 text-3xl" />
                <div>
                  <p className="text-gray-500">Total Funding</p>
                  <h2 className="text-xl font-bold">${stats.totalFunding}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                <FaTint className="text-red-500 text-3xl" />
                <div>
                  <p className="text-gray-500">Total Blood Requests</p>
                  <h2 className="text-xl font-bold">{stats.totalRequests}</h2>
                </div>
              </div>
            </div>

            <div className="text-center">This is for admin</div>
          </>
        )}

        {userRole === "volunteer" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                <FaUsers className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-500">Total Users</p>
                  <h2 className="text-xl font-bold">{stats.totalUsers}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                <FaMoneyBillWave className="text-green-500 text-3xl" />
                <div>
                  <p className="text-gray-500">Total Funding</p>
                  <h2 className="text-xl font-bold">${stats.totalFunding}</h2>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
                <FaTint className="text-red-500 text-3xl" />
                <div>
                  <p className="text-gray-500">Total Blood Requests</p>
                  <h2 className="text-xl font-bold">{stats.totalRequests}</h2>
                </div>
              </div>
            </div>

            <div className="text-center">This is for volunteer</div>
          </>
        )}

        {userRole === "donor" && (
          <>
            <div className="w-3/6 mx-auto  bg-white rounded-lg shadow p-6 flex items-center justify-center space-x-4">
              <FaMoneyBillWave className="text-green-500 text-3xl" />
              <div>
                <p className="text-gray-500">My Total Donation</p>
                <h2 className="text-xl font-bold">${stats.totalFunding}</h2>
              </div>
            </div>

            <DonationRequest />
            {/* View All Requests Button */}
            <div className="text-center mt-4">
              <Link to={"my-request"}>
                <button className="btn btn-outline btn-sm">
                  View My All Requests
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    );
};

export default MainDashboard;