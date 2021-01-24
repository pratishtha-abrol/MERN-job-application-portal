import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import axios from 'axios';
import { Card, CardText, Badge, Button } from "reactstrap";

import Welcome from './welcome';

class ApplicantPublicProfile extends Component {

    constructor() {
		super();
		this.state = {
			Applicant: []
		};
		// this.handleChange = this.handleClick.bind(this);
	}

	componentDidMount() {
		const details = {
			name: ls.get("applicanttobefound")
        }
        // console.log(details.name)
		axios.post('/applicant/find', details)
			.then(res => {
				console.log(res.data);
				this.setState ({
					Applicant: res.data,
				});
			});

    }    

    // onClick = e => {
    //     window.location = '/applications'
    // }

    render() {

		return (
			<div>
				<div>
                    <Welcome/>
					{/* <center>Hello there, Recruiter {ls.get("username")}</center> */}
					<div class="row">  
                    {/* <Button color="info" onClick={(e) => this.onClick(e)}>Back</Button> */}
							<div class="col-sm-12 btn btn-primary" style={{ "margin": "6px" }}>  
								Applicant Profile
							</div>  
					</div>
					{
                        this.state.Applicant.map((p, index) => {
                            return <div key={index}>
                                <center><h2>{p.name}</h2></center>
                                <center>
                                <Badge color="info">Rating: {p.rating}</Badge>
                                <Card body className="text-center">
                                    <CardText>Skills: {p.skills.map(skill => {return (<Badge color="info">{skill}</Badge>)})}</CardText>
                                </Card>
                                <Card>
                                    {
                                        p.education.map((item, i) => {
                                            return <div key={i}>
                                                <CardText>
                                                    School: {item.school} <br/>
                                                    Degree: {item.degree} <br/>
                                                    Field of Study: {item.fieldofstudy} <br/>
                                                    Start date: {item.from} <br/>
                                                    End date: {item.to} <br/>
                                                </CardText>
                                            </div>
                                        })
                                    }
                                </Card>
                                <Button>Download Resume</Button>
                                </center>
                            </div>
                        })
                    }
				</div>
			</div>
		)
	}
}

export default ApplicantPublicProfile;