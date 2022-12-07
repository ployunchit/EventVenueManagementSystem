import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Link } from '@material-ui/core';


const ForgotPassword = () => {
  const [mailerState, setMailerState] = useState({
    email: "drewmesker@gmail.com",
    message: "Test",
  });

  function handleSubmit(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log({ mailerState });
    const response = await fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(() => {
        setMailerState({
          email: mailerState.email,
          message: "Test",
        });
      });
  };



  return (
    <section class="vh-100">
        <form onSubmit={submitEmail}>
        <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Forgot Your <br></br>Password?</h2>
        </div>

        <div>
        
          
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            placeholder="Enter Email"
            onChange={handleSubmit}
            name="email"
           value={mailerState.email}
            required
          />
          <br /><br />
          <Link href="/emailsent">
                <Button
                    className="button_style"
                    variant="contained"
                    color="primary"
                    size="large"
                    style = {{height: '30px', width : '100px'}}
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