import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import {
	Card,
	Button,
	CardTitle,
	CardSubtitle,
	Badge,
	Label
} from 'reactstrap';
import axios from 'axios';

import Welcome from './welcome';

class Applications extends Component {

    constructor() {
		super();
		this.state = {
			List: [],
			order: "Ascending"
		};
		// this.handleChange = this.handleClick.bind(this);
	}

	componentDidMount() {
		const details = {
			jobId: ls.get("jobId")
		}
		axios.post('/applications', details)
			.then(res => {
				console.log(res.data);
				this.setState ({
					List: res.data,
				});
			});

    }
    
    statusClick = (id, status, name) => {
        const data = {
            id: id,
            status: status
		}

		const applicant = {
			name: name
		}

		const application = {
			name: name,
			id: id
		}

		const details = {
			jobId: ls.get("jobId")
		}

		if (status === "Accepted") {
			ls.set("applicanttobefound", name);
			axios.post("/applicant/accept", applicant)
				.then(res => {
					console.log(res)
				})
			axios.post("/applications/remove", application)
				.then(res => {
					console.log(res)
				})
			axios.post("/jobs/acceptnumber", details)
				.then(res => {
					alert(res);
				})
		}
		
        axios.post("/applications/status", data)
            .then(res => {
                console.log("Success: ", res.data);
                alert("Success")
                window.location.reload();
            })
    }

    applicantClick = (name) => {
        ls.set("applicanttobefound", name);
        window.location = "/applicant/publicprofile"
	}
	
	nameasc = async () => {
		const newList = await this.state.List.sort(function (a, b) {
			if (a.applicantname > b.applicantname) return 1
			if (a.applicantname < b.applicantname) return -1
			return 0
		})
		this.setState({List: newList});
	}

	namedesc = async () => {
		const newList = await this.state.List.sort(function (a, b) {
			if (a.applicantname > b.applicantname) return 1
			if (a.applicantname < b.applicantname) return -1
			return 0
		}).reverse();
		this.setState({List: newList});
	}

	timeasc = async () => {
		const newList = await this.state.List.sort(function (a, b) {
			return a.timestamps - b.timestamps
		})
		this.setState({List: newList});
	}

	timedesc = async () => {
		const newList = await this.state.List.sort(function (a, b) {
			return a.timestamps - b.timestamps
		}).reverse();
		this.setState({List: newList});
	}

    render() {

		return (
			<div>
				<div>
					<Welcome />
					<div>
						<Card body className="text-center">
						<Label>Sort on Applicant Name:</Label>
						<Button onClick={this.nameasc}>Ascending</Button>
						<Button onClick={this.namedesc}>Descending</Button>
						</Card>
						<Card body className="text-center">
						<Label>Sort on Application Date:</Label>
						<Button onClick={this.timeasc}>Ascending</Button>
						<Button onClick={this.timedesc}>Descending</Button>
						</Card>
					</div>
					{/* <center>Hello there, Recruiter {ls.get("username")}</center> */}
					<div class="row">  
							<div class="col-sm-12 btn btn-primary" style={{ "margin": "6px" }}>  
								Applications received
							</div>  
					</div>
					{
						this.state.List.map((p, index) => {
							return <div key={index}>
								<Card body color="light" className="text-center">
									<CardTitle><h5>Applicant Name: {p.applicantname}</h5></CardTitle>
									<CardSubtitle>SOP: {p.message}<br/><Badge color="secondary">Application Status: {p.status}</Badge></CardSubtitle>
									<div>
									<Button color="danger" onClick={(index) => this.statusClick(p._id, "Rejected", p.applicantname)}>Reject</Button>
									<Button color="info" onClick={(index) => this.applicantClick(p.applicantname)}>View Applicant Profile</Button>
									<Button color="success" onClick={(index) => this.statusClick(p._id, "Accepted", p.applicantname)}>Accept</Button>
                                    <Button color="warning" onClick={(index) => this.statusClick(p._id, "Shortlisted", p.applicantname)}>Shortlist</Button>
									</div>
								</Card>
							</div>
						})
					}
				</div>
			</div>
		)
	}
}

export default Applications;