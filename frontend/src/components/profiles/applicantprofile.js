import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import {
	Card,
	Button,
	CardTitle,
	CardText,
	Badge,
	CardSubtitle
} from 'reactstrap';
import axios from 'axios';

class ApplicantProfile extends Component {
	constructor() {
		super();
		this.state = {
			JobList: []
		};
		// this.handleChange = this.handleClick.bind(this);
	}

	componentDidMount() {
		axios.get('/jobs')
			.then(res => {
				console.log(res.data);
				this.setState ({
					JobList: res.data,
				});
			});

	}

	handleClick = (id) => {
		// return(
		// 	<div class="alert">
		// 		<center><h4>Message: </h4></center> 
		// 		<center><Input type="text" onChange={this.onChange} placeholder="Add a SOP here" /></center>
		// 	</div>
		// )
		const msg = window.prompt("Enter SOP here");
		const app = {
			jobId: id,
			applicantname: ls.get("username"),
			applicantemail: ls.get("useremail"),
			message: msg
		}

		axios.post("/jobs/apply", app)
			.then( res => {
				alert("Applied!");
				window.location.reload();
			})
			.catch(res => {
				alert(JSON.stringify(res.response.data[Object.keys(res.response.data)[0]]));
			})

		document.getElementById("submit").color = "info";

	}
	
	render() {

		return (
			// <h3>
			// 	Hello {ls.get("username")}. You are a {ls.get("role")}
			// </h3>
			<div>
				{/* {ls.get("userrole") === "Applicant" ? ( */}
					<div>
						{/* <center>Hello there, Applicant {ls.get("username")}</center> */}
						<div class="row">  
							<div class="col-sm-12 btn btn-primary" style={{ "margin": "6px" }}>  
								Job Listing 
							</div>  
						</div>
						{
							this.state.JobList.map((p, index) => {
								return <div key={index}>
									<Card body color="light" className="text-center">
										<CardTitle><h5>{p.title}</h5></CardTitle>
										<CardSubtitle>Id: {p._id}</CardSubtitle>
										<div>
											<Badge color="info">{p.rating}</Badge>
											<Badge color="secondary">{p.type}</Badge>
											<Badge color="success">{p.status}</Badge>
										</div>
										<div>
										<CardSubtitle>Recruiter: {p.postedby} <br/>Email: {p.recruiteremail} <br/> Date of Posting: {p.date}</CardSubtitle>
										</div>
										<div>
										<CardText>Skills: {p.requiredSkills.map(skill => {return (<Badge color="info">{skill}</Badge>)})} <br/>Salary: {p.salary}<br/>Duration: {p.duration}</CardText>
										</div>
										<Button color="success" id="submit" onClick={(index) => this.handleClick(p._id)}>Apply</Button>
									</Card>
								</div>
							})
						}
					</div>
				{/* ) : ( */}
					{/* <div>
						<center>Hello there, Recruiter {ls.get("username")}</center>
					</div>
				)} */}
			</div>
		)
	}
}

export default ApplicantProfile;