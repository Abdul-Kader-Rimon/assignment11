import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';

const SearchRequest = () => {
       const [upazilas, setUpazilas] = useState([]);
       const [upazila, setUpazila] = useState("");
       const [districts, setDistricts] = useState([]);
       const [district, setDistrict] = useState("");
       
      const [donors, setDonors] = useState([]);
      const [loading, setLoading] = useState(false);
  

       const axiosInstance = useAxios();

       useEffect(() => {
         axios.get("/upazila.json").then((res) => {
           setUpazilas(res.data.upazilas);
         });
         axios.get("/district.json").then((res) => {
           setDistricts(res.data.districts);
         });

         setLoading(true);

         axiosInstance.get("/search-requests")
           .then((res) => setDonors(res.data))
           .catch((err) => console.log(err))
           .finally(() => setLoading(false));
       }, []);
    
    
    const handleSearch = (e) => {
        e.preventDefault();
      const bloodGroup = e.target.bloodGroup.value.trim();
       setLoading(true);

        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
              
              setDonors(res.data)
            
            })
            .catch((error)=> console.log(error)
            )
            .finally(()=> setLoading(false))
    }
    
    
    return (
      <div>
        <form
          onSubmit={handleSearch}
          className="fieldset flex justify-center items-center gap-4 mt-5 "
        >
          <select name="bloodGroup" className="select rounded-full">
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

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select rounded-full"
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

          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select rounded-full"
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
          <button className="btn rounded-full">Search</button>
        </form>

        {/* donor search data  */}
        <div className="w-10/12 mx-auto">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <p className="text-center col-span-full text-gray-500">
                Loading...
              </p>
            )}

            {!loading && donors.length === 0 && (
              <p className="text-center col-span-full text-gray-500">
                No donors found.
              </p>
            )}

            {!loading &&
              donors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 p-6 flex flex-col gap-3 card-animate"
                >
                  <h3 className="font-bold text-xl text-blue-600">
                    {donor.name || donor.requester_name}
                  </h3>

                  <p className="text-gray-700">
                    Blood Group:{" "}
                    <span className="font-semibold text-red-500">
                      {donor.blood_group}
                    </span>
                  </p>

                  <p className="text-gray-700">
                    District:{" "}
                    <span className="font-medium">
                      {donor.recipient_district}
                    </span>
                  </p>

                  <p className="text-gray-700">
                    Upazila:{" "}
                    <span className="font-medium">
                      {donor.recipient_upazila}
                    </span>
                  </p>

                  <p className="text-gray-700">
                    Email:{" "}
                    <span className="font-medium">{donor.requester_email}</span>
                  </p>

                  <span
                    className={`mt-4 px-3 py-2 rounded-full text-white text-sm font-medium text-center   ${
                      donor.donation_status === "inprogress"
                        ? "bg-blue-500"
                        : donor.donation_status === "done"
                        ? "bg-green-500"
                        : donor.donation_status === "canceled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {donor.donation_status || "pending"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
};

export default SearchRequest;