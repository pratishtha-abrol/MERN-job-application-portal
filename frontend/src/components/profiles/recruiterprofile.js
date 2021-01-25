import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import axios from 'axios';
import {
	Card,
	Button,
	CardTitle,
	CardText,
	Badge,
	CardSubtitle
} from 'reactstrap';

class RecruiterProfile extends Component {
	constructor() {
		super();
		this.state = {
			JobList: []
		};
		// this.handleChange = this.handleClick.bind(this);
	}

	componentDidMount() {
		const deatils = {
			postedby: ls.get("username")
		}
		axios.post('/jobs/postedby', deatils)
			.then(res => {
				console.log(res.data);
				this.setState ({
					JobList: res.data,
				});
			});

	}

	editClick = (id) => {
		ls.set("jobId", id);
		window.location='/jobs/edit'
	}

	applicantClick = (id) => {
		ls.set("jobId", id);
		window.location='/applications'
	}

	deleteClick = (id) => {
		const data = {
			id: id
		}

		axios.post("/jobs/delete", data)
			// .then(() => {
			// 	alert("Job Deleted");
			// 	window.location.reload();
			// })

		axios.post("applications/deleted", data)
			.then(() => {
				window.location.reload();
			})

			alert("Job Deleted");
			window.location.reload();
	}

	acceptedapplicantClick = (id) => {
		ls.set("jobId", id);
		window.location='/acceptedapplications'
	}

	render() {

		return (
			<div>
				<div>
					{/* <center>Hello there, Recruiter {ls.get("username")}</center> */}
					<div class="row">  
							<div class="col-sm-12 btn btn-primary" style={{ "margin": "6px" }}>  
								Jobs Posted
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
									<CardText>Skills: {p.requiredSkills.map(skill => {return (<Badge color="info">{skill}</Badge>)})} <br/>Salary: {p.salary}<br/>Duration: {p.duration}</CardText>
									<CardText>Deadline: {p.deadline} <br/>Number of Psotions: {p.numberOfPositions} <br/>Max Applicants: {p.maxApplicants}</CardText>
									</div>
									<div>
									<Button color="danger" onClick={(index) => this.editClick(p._id)}>Edit</Button>
									<Button color="success" onClick={(index) => this.applicantClick(p._id)}>View Applications</Button>
									<Button color="danger" onClick={(index) => this.deleteClick(p._id)}>Delete</Button>
									</div>
									<Button color="danger" onClick={(index) => this.acceptedapplicantClick(p._id)}>View Accepted Applicants</Button>
								</Card>
							</div>
						})
					}
				</div>
			</div>
		)
	}
}

export default RecruiterProfile;