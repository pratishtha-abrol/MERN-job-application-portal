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
					<div>
						{/* <center>Hello there, Applicant {ls.get("username")}</center> */}
						<Navbar color="dark" dark expand="sm" className="mb-5">
							<Container>
								<NavbarBrand href="/">Welcome, {ls.get("username")}</NavbarBrand>
								<NavbarToggler onClick={this.toggle} />
								<Collapse isOpen={this.state.isOpen} navbar>
									<Nav className="ml-auto" navbar>
										<NavItem>
											<NavLink href="/applications">My Applications</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href="/applicant">Edit Profile</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href="/applicant/profile">View Profile</NavLink>
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
										<NavItem>
											<NavLink href="/recruiter/profile">View Profile</NavLink>
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