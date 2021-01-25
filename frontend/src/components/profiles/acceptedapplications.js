import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import axios from 'axios';
import {
	Card,
	Button,
	CardTitle,
    CardSubtitle,
    Badge
} from 'reactstrap';
import Welcome from './welcome';

class AcceptedApplications extends Component {
    constructor() {
        super();
        this.state = {
            List:[]
        }
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

    applicantClick = (name) => {
        ls.set("applicanttobefound", name);
        window.location = "/applicant/publicprofile"
    }

    render() {
        return (
            <div>
                <Welcome/>
                {
                    this.state.List.map((p, index) => {
                        return <div key={index}>
                            <Card body color="light" className="text-center">
                                <CardTitle><h5>Applicant Name: {p.applicantname}</h5></CardTitle>
                                <CardSubtitle>SOP: {p.message}<br/><Badge color="secondary">Application Status: {p.status}</Badge></CardSubtitle>
                                <div>
                                <Button color="info" onClick={(index) => this.applicantClick(p.applicantname)}>View Applicant Profile</Button>
                                </div>
                            </Card>
                        </div>
                    })
                }
            </div>
        )
    }
    

}

export default AcceptedApplications;