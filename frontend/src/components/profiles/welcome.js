import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
	Container
} from 'reactstrap';
// import axios from 'axios';

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state= {

		}
	}

	state = {
        isOpen: true
    }

	toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
	}

	onClick() {
		ls.set("auth", "false");
		window.location="/";
	}

	// createProfile (e) {
	// 	const user = ls.get("username");
	// 	const role = ls.get("userrole")
	// 	console.log(user, role);
	// 	if (ls.get("userrole") === "Applicant") {
	// 		axios
	// 			.post("/applicant/find", user)
	// 			.then(function (response) {
	// 				console.log(response);
	// 				window.location = "/profile";
	// 			})
	// 			.catch(function (res) {
	// 				console.log(res);
    //             	alert(res.response.data[Object.keys(res.response.data)[0]]);
	// 			})
	// 	}
	// }
	
	render() {
		return (
			// <h3>
			// 	Hello {ls.get("username")}. You are a {ls.get("role")}
			// </h3>
			<div>
				{ls.get("userrole") === "Applicant" ? (
					<div>
						{/* <center>Hello there, Applicant {ls.get("username")}</center> */}
						<Navbar color="dark" dark expand="sm" className="mb-5">
							<Container>
								<NavbarBrand href="/">Welcome, {ls.get("username")}</NavbarBrand>
								<NavbarToggler onClick={this.toggle} />
								<Collapse isOpen={this.state.isOpen} navbar>
									<Nav className="ml-auto" navbar>
										<NavItem>
											<NavLink href="/myapplications">My Applications</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href="/acceptedjobs">My Jobs</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href="/applicant">Edit Profile</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href="/applicant/publicprofile" onClick={ls.set("applicanttobefound", ls.get("username"))} >View Profile</NavLink>
										</NavItem>
										<NavItem>
											<NavLink onClick={this.onClick}>Logout</NavLink>
										</NavItem>
									</Nav>
								</Collapse>
							</Container>
						</Navbar>
					</div>
				) : (
					<div>
						{/* <center>Hello there, Recruiter {ls.get("username")}</center> */}
						<Navbar color="dark" dark expand="sm" className="mb-5">
							<Container>
								<NavbarBrand href="/">Welcome, {ls.get("username")}</NavbarBrand>
								<NavbarToggler onClick={this.toggle} />
								<Collapse isOpen={this.state.isOpen} navbar>
									<Nav className="ml-auto" navbar>
										<NavItem>
											<NavLink href="/jobs/create">Create Job</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href="/recruiter">Edit Profile</NavLink>
										</NavItem>
										{/* <NavItem>
											<NavLink href="/acceptedapplications">Accepted Applications</NavLink>
										</NavItem> */}
										{/* <NavItem>
											<NavLink onClick={() => console.log(ls.get("username"))} >View Profile</NavLink>
										</NavItem> */}
										<NavItem>
											<NavLink onClick={this.onClick}>Logout</NavLink>
										</NavItem>
									</Nav>
								</Collapse>
							</Container>
						</Navbar>
					</div>
				)}
			</div>
		)
	}
}
export default Welcome;