import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";

class Welcome extends Component {

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
				{ls.get("userrole") === "Applicant" ? (
					<center>Hello there, Applicant {ls.get("username")}</center>
				) : (
					<center>Hello there, Recruiter {ls.get("username")}</center>
				)}
			</div>
		)
	}
}
export default Welcome;