import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Link } from '@material-ui/core';
const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const res = await axios.post("/api/auth/forget-password", { email });

    //if (res) {
      alert("email Sent");
    //}
  };

  return (
    <section class="vh-100">
        <form onSubmit={handleSubmit}>
        <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Forgot Your <br></br>Password?</h2>
        </div>

        <div>
        
          
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br /><br />
          <Link href="/emailsent">
                <Button
                    className="button_style"
                    variant="contained"
                    color="primary"
                    size="large"
                    
                    >
                    Send
                </Button>
                </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href="/login">
                        Go Back
                    </Link>
                </div>
            </div>
        </form>
    </section>
  );
};

export default ForgotPassword;