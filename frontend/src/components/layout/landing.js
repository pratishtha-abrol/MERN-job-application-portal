import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage';
import { GoogleLogin } from 'react-google-login';


const responseSuccessGoogle = (response) => {
    console.log(response);
    const role = window.prompt("Enter Recruiter or Applicant (CASE SENSITIVE): ");
    axios.post('/googlelogin', {tokenId: response.tokenId, userrole: role})
        .then(response => {
            console.log(response);
            alert("Logged In!")
            ls.set("auth", "true");
            ls.set("username", response.name);
            ls.set("userrole", role);
            ls.set("useremail", response.email);
            // if(role === 'Recruiter') {
            //     window.location = '/recruiter';
            // } else {
            //     window.location = '/applicant';
            // }
            window.location = "/"
        })
        .catch( res => {
            console.log(res)
            window.location = '/'
        });
}

const responseFaliureGoogle = (response) => {
    console.log(response);
  }

class Landing extends Component {
    render() {
        return(
            <div>
            {/* <h1>Login with Google</h1> */}
            <center>
            <GoogleLogin
                clientId="965374062309-4i1qperm6sand7s6pptei6fn47upb0d8.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFaliureGoogle}
                cookiePolicy={'single_host_origin'}
            />,
            {document.getElementById('googleButton')}
            </center>
            </div>
        )
    }
}

export default Landing;