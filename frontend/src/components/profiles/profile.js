import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";

import Welcome from './welcome';

class Profile extends Component {

	state = {
        isOpen: true
    }

	toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
	}
	
	render() {
		return (
			// <h3>
			// 	Hello {ls.get("username")}. You are a {ls.get("role")}
			// </h3>
			<div>
                <Welcome />
				{ls.get("userrole") === "Applicant" ? (
					<div>
						{/* <center>Hello there, Applicant {ls.get("username")}</center> */}
					</div>
				) : (
					<div>
						{/* <center>Hello there, Recruiter {ls.get("username")}</center> */}
					</div>
				)}
			</div>
		)
	}
}
export default Profile;