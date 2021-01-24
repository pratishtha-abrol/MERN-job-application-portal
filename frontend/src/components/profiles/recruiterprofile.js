import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";


class RecruiterProfile extends Component {
		
	render() {

		return (
			<div>
				<div>
					<center>Hello there, Recruiter {ls.get("username")}</center>
				</div>
			</div>
		)
	}
}

export default RecruiterProfile;