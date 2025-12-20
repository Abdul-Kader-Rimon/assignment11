import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa';
import { MdSaveAs } from 'react-icons/md';
import Loader from '../../../components/Loader/Loader';

const ProfilePage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState({
      name: "",
      email: "",
      avatar: "",
      district: "",
      upazila: "",
      bloodGroup: "",
    });

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

      const [districts, setDistricts] = useState([]);
      const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        axios.get("/district.json")
            .then((res) => setDistricts(res.data.districts || []))
            .catch((error) => console.error("Error loading  Districts:", error));
        axios.get("/upazila.json")
            .then((res) =>  setUpazilas(res.data.upazilas || []))
            .catch((error) => console.error("Error loading  Districts:", error));
    }, []);
    

    const fetchProfile = () => {
        if (!user?.email) return;
        setLoading(true);
    axiosSecure.get("/users")
        .then((res) => {
            const data = res.data.find((u) => u.email === user.email);
            if (data) {
                setProfile({
                  name: data.displayName || "",
                  email: data.email || "",
                  avatar: data.mainPhotoURL || "",
                  district: data.district || "",
                  upazila: data.upazila || "",
                  bloodGroup: data.blood || "",
                });
            }
        })
        .catch((error) => console.error("Error fetching profile: ", error))
         .finally(() => setLoading(false))

    }


    useEffect(() => {
        fetchProfile();
    }, [axiosSecure, user]);


    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    }


    const handleSave = () => {
        const formData = {
            displayName: profile.name,
            district: profile.district,
            upazila: profile.upazila,
            blood: profile.bloodGroup,
            mainPhotoURL: profile.avatar,
        };

        axiosSecure.patch(`/update-profile/${user.email}`, formData)
            .then(() => {
                setProfile((prev) => ({ ...prev, ...formData }));

                alert("Profile Updateed SuccessFully");

                setEditMode(false)
            }).catch((error) => {
                alert("Failed to update profile!", error);
            })
    };

     if (loading) return  <Loader/>;

    return (
      <div>
        <div className="p-6 max-w-2xl mx-auto space-y-6">
          <form className="bg-white shadow rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <img
                src={profile.avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            <div>
              <label className="block text-gray-500">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border px-3 py-2 rounded ${
                  editMode ? "border-blue-500" : "border-gray-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-500">District</label>
              <select
                name="district"
                value={profile.district}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border px-3 py-2 rounded ${
                  editMode ? "border-blue-500" : "border-gray-300 bg-gray-100"
                }`}
              >
                <option value="">Select District</option>
                {districts.map((d, index) => (
                  <option key={index} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-500">Upazila</label>
              <select
                name="upazila"
                value={profile.upazila}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border px-3 py-2 rounded ${
                  editMode ? "border-blue-500" : "border-gray-300 bg-gray-100"
                }`}
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u, idx) => (
                  <option key={idx} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

 

            <div>
              <label className="block text-gray-500">Blood Group</label>
              <select
                name="bloodGroup"
                value={profile.bloodGroup}  
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border px-3 py-2 rounded ${
                  editMode ? "border-blue-500" : "border-gray-300 bg-gray-100"
                }`}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </form>

          <div className="flex justify-end">
            {!editMode ? (
              <button
                className=" flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => setEditMode(true)}
              >
                <FaUserEdit size={20} /> Edit Profile
              </button>
            ) : (
              <button
                className=" flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={handleSave}
              >
                <MdSaveAs size={20} /> Save Profile
              </button>
            )}
          </div>
        </div>
      </div>
    );
};

export default ProfilePage;