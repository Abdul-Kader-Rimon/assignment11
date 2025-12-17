import React, {   useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Context/AuthContext';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([]);
    const [filter , setFilter] = useState('')
 
    const fetchUsers = () => {
           axiosSecure.get(`/users${filter ? `?status=${filter}`: ""}`)
            .then(res => {
            setUsers(res.data)
        })
    }
    

    useEffect(() => {
      fetchUsers()
     
    },[ filter ])

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
            console.log(res.data)
            fetchUsers();
        })
    } 
    const handleRoleChange = (email, role) => {
        axiosSecure.patch(`/users/make-${role}/${email}`)
            .then( () => {
            
            fetchUsers();
        })
    } 
 

    return (
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">All Users</h2>

        <select
          className="select select-bordered mb-4"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.mainPhotoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.displayName}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user?.role}</td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {user?.status}
                  </span>
                </td>
                <th>
                  {user?.status == "active" ? (
                    <button
                      onClick={() => handleStatusChange(user?.email, "blocked")}
                      className="btn btn-error text-white btn-xs"
                    >
                      Blocked
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(user?.email, "active")}
                      className="btn btn-ghost btn-xs"
                    >
                      Active
                    </button>
                  )}

                  {user?.role === "Donor" ? (
                    <button
                      onClick={() => handleRoleChange(user?.email, "volunteer")}
                      className="btn btn-primary btn-xs ml-5"
                    >
                      Volunteer
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user?.email, "Donor")}
                      className="btn btn-primary btn-xs ml-5"
                    >
                       Donor
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default AllUsers;