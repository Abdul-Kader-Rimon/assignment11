import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';

const SearchRequest = () => {
       const [upazilas, setUpazilas] = useState([]);
       const [upazila, setUpazila] = useState("");
       const [districts, setDistricts] = useState([]);
       const [district, setDistrict] = useState("");
       const axiosInstance = useAxios();

       useEffect(() => {
         axios.get("/upazila.json").then((res) => {
           setUpazilas(res.data.upazilas);
         });
         axios.get("/district.json").then((res) => {
           setDistricts(res.data.districts);
         });
       }, []);
    
    
    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.bloodGroup.value.trim();

        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
            console.log(res.data);
            
        })
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
      </div>
    );
};

export default SearchRequest;