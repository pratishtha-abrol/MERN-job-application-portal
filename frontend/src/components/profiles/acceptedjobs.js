import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import axios from 'axios';
import {
	Card,
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
			applicantname: ls.get("username")
		}
		axios.post('/applications/findaccepted', details)
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

    onclick = async (e, id) => {

        const details = {
            id: id
        }

        const res = await axios.post('/jobs/find', details)
        console.log(res.data)
        const rating = res.data.rating;
        const timesrated = res.data.timesrated;
        const newrating = ((rating*timesrated) + e.target.value) / (timesrated+1);
        const data = {
            id: id,
            rating: newrating
        }
        console.log(data);

        axios.post('/jobs/rate', data)
            .then(res => {
                console.log(res.data);
            })

        alert("Rated");
        window.location="/"
    }

    render() {
        return (
            <div>
                <Welcome/>
                {
                    this.state.List.map((p, index) => {
                        return <div key={index}>
                            <Card body color="light" className="text-center">
                                <CardTitle><h5>JobId: {p.jobId}</h5></CardTitle>
                                <CardSubtitle>SOP: {p.message}<br/><Badge color="secondary">Application Status: {p.status}</Badge></CardSubtitle>
                                <FormGroup>
                                    <Label for="rating"> Rate Job on 5: </Label>
                                    <Input type="number" min="0" max="5" onChange={(e) => this.onclick(e, p.jobId)}/>
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