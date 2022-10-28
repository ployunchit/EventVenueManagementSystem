import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
 
export default function SignIn() {
 const [form, getForm] = useState({
   username: "",
   password: "",
   accountType: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return getForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/signin", {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   getForm({ username: "", password: "", accountType: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Welcome Back!</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="email">Email Address</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             email="passwordOptions"
             id="passwordUser"
             value="User"
             checked={form.accountType === "User"}
             onChange={(e) => updateForm({ accountType: e.target.value })}
           />
           <label htmlFor="passwordUser" className="form-check-label">User</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             email="passwordOptions"
             id="passwordOwner"
             value="Owner"
             checked={form.accountType === "Owner"}
             onChange={(e) => updateForm({ accountType: e.target.value })}
           />
           <label htmlFor="passwordOwner" className="form-check-label">Owner</label>
         </div>
       </div>
       <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password?</p>
				</Link>
       <div className="form-group">
         <input
           type="submit"
           value="Log In"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}