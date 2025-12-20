 import React, { useContext, useEffect, useState } from "react";
 import { Link, NavLink, useNavigate } from "react-router";

 
 import toast from "react-hot-toast";
 
 import { FaEye } from "react-icons/fa";
 import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

 const Register = () => {
   const [show, setShow] = useState(false);
   const { createUser, updateUserProfile } = useContext(AuthContext);
   const [upazilas, setUpazilas] = useState([]);
   const [upazila, setUpazila] = useState('');
   const [districts, setDistricts] = useState([]);
   const [district, setDistrict] = useState('');

   

   useEffect(() => {
     axios.get('/upazila.json')
       .then(res => {
       setUpazilas(res.data.upazilas)
     })
     axios.get('/district.json')
       .then(res => {
        setDistricts(res.data.districts)
     })
   },[])

 

   const navigate = useNavigate();

 

   const handleRegister = async (event) => {
     event.preventDefault();
     const displayName = event.target.displayName.value; 
     const email = event.target.email.value;
     const password = event.target.password.value;
     const photoURL = event.target.photoURL;
     const file = photoURL.files[0]
     const blood = event.target.blood.value;

     const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

     if (!regExp.test(password)) {
       toast.error(
         "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter"
       );
       return;
     }

     toast.loading("Creating user...", { id: "create-user" });

     const res = await axios.post(
       `https://api.imgbb.com/1/upload?key=a48566e9267586b35577a0d37ff997f3`, { image: file }, {
         headers: {
           'Content-Type': 'multipart/form-data'
         }
     });
     
 
 

     const mainPhotoURL = res.data.data.display_url


     const formData = {
       displayName,
       email,
       password,
       mainPhotoURL,
       blood,
       district,
       upazila,
     };

 


     if (res.data.success == true) {
            createUser(email, password)
       .then((result) => {
         console.log(result.user);
         updateUserProfile(displayName, mainPhotoURL);
         
         toast.success("User created successfully!", { id: "create-user" });

         axios.post("http://localhost:5000/users", formData)
           .then(res => {
           console.log(res.data)
           })
           .catch(error => {
           console.log(error)
         })
         navigate("/");
       })
       .catch((error) => {
          
         toast.error(error.message, { id: "create-user" });
       });
     }
 


   };

  

   return (
     <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-12">
       <div className="card-body">
         <h1 className="text-3xl md:text-5xl text-[#422ad5] font-bold text-center">Register</h1>
         <form onSubmit={handleRegister}>
           <fieldset className="fieldset">
             <label className="label">Name</label>
             <input
               type="text"
               name="displayName"
               className="input rounded-full focus:border-0 focus:outline-gray-200"
               placeholder="Name"
             />

             <label className="label">Email</label>
             <input
               type="email"
               name="email"
               className="input rounded-full focus:border-0 focus:outline-gray-200"
               placeholder="Email"
             />

             <label className="label">PhotoURL</label>
             <input
               type="file"
               name="photoURL"
               className="input rounded-full focus:border-0 focus:outline-gray-200"
               placeholder="Photo URL"
             />
             <label className="label">Blood Group</label>
             <select name="blood" className="select rounded-full">
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

             <label className="label">District</label>
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
             <label className="label">Upazila</label>
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

             <div className="relative">
               <label className="label">Password</label>
               <input
                 type={show ? "text" : "password"}
                 name="password"
                 className="input rounded-full focus:border-0 focus:outline-gray-200"
                 placeholder="Password"
               />

               <span
                 onClick={() => setShow(!show)}
                 className="absolute right-[25px] top-[30px] cursor-pointer z-50"
               >
                 {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
               </span>
             </div>

             <button className="btn  bg-[#422ad5] text-white  mt-4 rounded-full ">
               Register
             </button>
           </fieldset>
         </form>

         <p className="text-center">
           Already have an account? Please{" "}
           <Link to={"/login"} className="text-blue-500 hover:text-blue-800">
             Login
           </Link>{" "}
         </p>
       </div>
     </div>
   );
 };

 export default Register;