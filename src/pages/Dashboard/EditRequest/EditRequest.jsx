 import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
 
const EditRequest = () => {
     
      const { id } = useParams();
      const navigate = useNavigate();
      const axiosSecure = useAxiosSecure();
      
    
    const [request, setRequest] = useState({
      recipient_name: "",
      recipient_district: "",
      recipient_upazila: "",
      donation_date: "",
      donation_time: "",
      blood_group: "",
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {

        if (!id) return;

        setLoading(true);

        axiosSecure.get(`/donation-requests/${id}`)
            .then((res) => {
                if (res.data) {
                    setRequest({
                      recipient_name: res.data.recipient_name || "",
                      recipient_district: res.data.recipient_district  || "",
                      recipient_upazila: res.data.recipient_upazila  || "",
                      donation_date: res.data.donation_date  || "",
                      donation_time: res.data.donation_time  ||  "",
                      blood_group: res.data.blood_group  || "",
                    });
            }
            })
            .catch((error)=> console.log("Failed to fetch request:", error)
            )
            .finally(()=> setLoading(false))
        
    }, [id, axiosSecure])
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequest((prev) => ({ ...prev, [name]: value }));
    }

    const handleSave = () => {
        for (let key in request) {
            if (!request[key]) {
                alert(`Please fill in ${key.replace("_", " ")}`);
                return;
            }
        }

        setUpdating(true);

        axiosSecure.patch(`/donation-requests/${id}`, request)
            .then((res) => {
                console.log("Update response:", res.data);
                alert("Request updated successfully!");
                navigate('/dashboard')
            
            })
            .finally(() => setUpdating(false))
    };
    
      if (loading) return <p className="text-center p-6">Loading...</p>;

    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Edit Your Donation Request
        </h2>

        <div className="space-y-4">
          {[
            { label: "Recipient Name", name: "recipient_name", type: "text" },
            { label: "District", name: "recipient_district", type: "text" },
            { label: "Upazila", name: "recipient_upazila", type: "text" },
            { label: "Donation Date", name: "donation_date", type: "date" },
            { label: "Donation Time", name: "donation_time", type: "time" },
            { label: "Blood Group", name: "blood_group", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-gray-700 mb-1 font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={request[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
             onClick={handleSave}
             disabled={updating}
            className={`w-full px-4 py-2 text-white rounded ${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 transition"
            }`}
          >
            {updating ? "Updating..." : "Update Request"}
          </button>
        </div>
      </div>
    );
 };
 
 export default EditRequest;