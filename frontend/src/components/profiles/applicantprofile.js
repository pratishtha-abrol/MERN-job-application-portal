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

let num = 0;

class ApplicantProfile extends Component {
	constructor() {
		super();
		this.state = {
			JobList: [],
			value: "Apply",
			color: "danger"
		};
		// this.handleChange = this.handleClick.bind(this);
	}

	componentDidMount() {
		const data = {
			name: ls.get("username"),
			email: ls.get("useremail")
		}
		axios.post('/jobs', data)
			.then(res => {
				console.log(res.data);
				this.setState ({
					JobList: res.data				
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
		num = num + 1;
		if (num > 10) {
			alert("Exceeded application limit for login session");
			window.location.reload();
		}
		else {

			const msg = window.prompt("Enter SOP here");
			const app = {
				jobId: id,
				// applicantId: ls.get("userid"),
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

			this.setState({
				value: "Applied!",
				color: "success",
			})

		}

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
										<CardTitle><h5>{p.Job.title}</h5></CardTitle>
										<CardSubtitle>Id: {p.Job._id}</CardSubtitle>
										<div>
											<Badge color="info">{p.Job.rating}</Badge>
											<Badge color="secondary">{p.Job.type}</Badge>
											<Badge color="success">{p.Job.status}</Badge>
										</div>
										<div>
										<CardSubtitle>Recruiter: {p.Job.postedby} <br/>Email: {p.Job.recruiteremail} <br/> Date of Posting: {p.Job.date}</CardSubtitle>
										</div>
										<div>
										<CardText>Skills: {p.Job.requiredSkills.map(skill => {return (<Badge color="info">{skill}</Badge>)})} <br/>Salary: {p.Job.salary}<br/>Duration: {p.Job.duration}</CardText>
										</div>
										<Button color={p.hasapplied==="true" ? "success" : "danger"} id="submit" onClick={(index) => this.handleClick(p.Job._id)}>{p.hasapplied==="true" ? "Applied!" : "Apply"}</Button>
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