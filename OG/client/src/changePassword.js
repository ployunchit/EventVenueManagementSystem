import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Link } from '@material-ui/core';
import axios from "axios";
const ChangePassword = () => {
  const { id, token } = useParams();
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `/api/auth/forgetpassword/${id}/${token}`,
      input
    );
    if (res.status === 200) {
      alert("password changed successfully");
    }
  };
  return (
    <section class="vh-100">
                    <form onSubmit={handleSubmit}>
                    <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Forgot Your <br></br>Password?</h2>
        </div>
        
        
          
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          placeholder="Enter New Password"
          value={input.newPassword}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          placeholder="Confirm Password"
          value={input.confirmPassword}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
          required
        />
        <br /><br />
        <Link href="/login">
        <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="large"
                    
                    >
                    Reset Password
        </Button>
        </Link>




        </div>             
    </form>
    </section>
  );
};

export default ChangePassword;