import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import axios from 'axios';
import {
	Card,
	Button,
	CardTitle,
    CardSubtitle,
    Badge,
    FormGroup,
    Label,
    Input
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
		axios.post('/applications/accepted', details)
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

    onclick = async (e, name) => {

        const details = {
            name: name
        }

        const res = await axios.post('/applicant/find', details)
        console.log(res.data)
        const rating = res.data[0].rating;
        const timesrated = res.data[0].timesrated;
        const newrating = ((rating*timesrated) + e.target.value) / (timesrated+1);
        const data = {
            name: name,
            rating: newrating
        }
        console.log(data);
        axios.post('/applicant/rate', data)
            .then(res => {
                console.log(res.data);
            })

        alert("Rated");
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
                                <FormGroup>
                                    <Label for="rating"> Rate on 5: </Label>
                                    <Input type="number" min="0" max="5" onChange={(e) => this.onclick(e, p.applicantname)}/>
                                </FormGroup>
                                {/* <Button>Submit Rating</Button> */}
                            </Card>
                        </div>
                    })
                }
            </div>
        )
    }
    

}

export default AcceptedApplications;