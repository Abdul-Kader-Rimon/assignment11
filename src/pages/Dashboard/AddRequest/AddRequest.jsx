import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
 
 

const AddRequest = () => {

    const { user } = useContext(AuthContext);

    const [upazilas, setUpazilas] = useState([]);
    const [upazila, setUpazila] = useState("");
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState("");

 
  const axiosSecure = useAxiosSecure()

    useEffect(() => {
      axios.get("/upazila.json").then((res) => {
        setUpazilas(res.data.upazilas);
      });
      axios.get("/district.json").then((res) => {
        setDistricts(res.data.districts);
      });
    });

    const handleRequest = (e) => {
        e.preventDefault();

        const form = e.target

        const requester_name = form.requester_name.value;
        const requester_email = form.requester_email.value;
        const recipient_name = form.recipient_name.value;
        const recipient_district = district;
        const recipient_upazila = upazila;
        const hospital_name = form.hospital_name.value;
        const full_address = form.full_address.value;
        const blood_group = form.blood_group.value;
        const donation_date = form.donation_date.value;
        const donation_time = form.donation_time.value;
        const request_message = form.request_message.value;


        const formData = {
          requester_name,
          requester_email,
          recipient_name,
          recipient_district,
          recipient_upazila,
          hospital_name,
          full_address,
          blood_group,
          request_message,
          donation_date,
          donation_time,
          donation_status:"panding",
        };

        axiosSecure.post('/requests', formData)
            .then(res => {
            alert(res.data.insertedId)
            })
            .catch(error=> console.log(error))
    }

    return (
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Donation Request
        </h2>

        <form onSubmit={handleRequest} className="space-y-4">
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Requester Name</label>
              <input
               name="requester_name"
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="label">Requester Email</label>
              <input
               name="requester_email"
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

 
          <div>
            <label className="label">Recipient Name</label>
            <input
              type="text"
              name="recipient_name"
              required
              className="input input-bordered w-full"
              placeholder="Recipient full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Recipient District</label>
              <select
                name="recipient_district"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="select select-bordered w-full"
              >
                <option disabled selected value="">
                  Select Your District
                </option>
                {districts.map((d) => (
                  <option value={d?.name} key={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Recipient Upazila</label>
              <select
                name="recipient_upazila"
                required
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="select select-bordered w-full"
              >
                <option disabled selected value="">
                  Select Your Upazila
                </option>
                {upazilas.map((u) => (
                  <option value={u?.name} key={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

 
          <div>
            <label className="label">Hospital Name</label>
            <input
              type="text"
              name="hospital_name"
              required
              className="input input-bordered w-full"
              placeholder="Enter Hospital Name"
            />
          </div>

 
          <div>
            <label className="label">Full Address</label>
            <input
              type="text"
              name="full_address"
              required
              className="input input-bordered w-full"
              placeholder="Enter your Address"
            />
          </div>

 
          <div className="grid grid-cols-1  md:grid-cols-3  gap-4">
            <div>
              <label className="label">Blood Group</label>
              <select
                name="blood_group"
                required
                defaultValue=""
                className="select select-bordered w-full"
              >
                  <option disabled selected value="">
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

            <div>
              <label className="label">Donation Date</label>
              <input
                type="date"
                name="donation_date"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Donation Time</label>
              <input
                type="time"
                name="donation_time"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
 
          <div>
            <label className="label">Request Message</label>
            <textarea
              name="request_message"
              required
              rows="4"
              className="textarea textarea-bordered w-full"
              placeholder="Explain why blood is needed..."
            ></textarea>
          </div>

       
          <button
            type="submit"
            className="btn btn-error w-full text-white rounded-full mt-4"
          >
            Request Donation
          </button>
        </form>
      </div>
    );
};

export default AddRequest;