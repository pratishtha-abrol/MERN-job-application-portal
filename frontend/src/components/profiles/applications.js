import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import {
	Card,
	Button,
	CardTitle,
	CardSubtitle
} from 'reactstrap';
import axios from 'axios';

class Applications extends Component {

    constructor() {
		super();
		this.state = {
			List: []
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
    
    statusClick = (id, status) => {
        const data = {
            id: id,
            status: status
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

    render() {

		return (
			<div>
				<div>
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
									<CardSubtitle>SOP: {p.message}<br/>Application Status: {p.status}</CardSubtitle>
									<div>
									<Button color="danger" onClick={(index) => this.statusClick(p._id, "Rejected")}>Reject</Button>
									<Button color="info" onClick={(index) => this.applicantClick(p.applicantname)}>View Applicant Profile</Button>
									<Button color="success" onClick={(index) => this.statusClick(p._id, "Accepted")}>Accept</Button>
                                    <Button color="warning" onClick={(index) => this.statusClick(p._id, "Shortlisted")}>Shortlist</Button>
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