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

    // download = resume => {
    //     const link = "../../../public/resume/"+resume;
    //     fetch(link)
    //     .then(response => {
    //         response.blob().then(blob => {
    //             let url = window.URL.createObjectURL(blob);
    //             let a = document.createElement('a');
    //             a.href = url;
    //             a.download = url;
    //             a.click();
    //         });
    //         console.log(response)
    //     })

    //     // var data = new Blob(link);
    //     // var url = window.URL.createObjectURL(data);
    //     // let temp = document.createElement('a');
    //     // temp.href = url;
    //     // temp.setAttribute('download', resume);
    //     // temp.click()
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
                                <center><h2>{p.name}</h2>
                                <Badge color="info">Status: {p.status}</Badge>
                                </center>
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
                                {/* <Button onClick={this.download.bind(p.resume)}>Download Resume</Button> */}
                                <a href={"../resume/" + p.resume}>Download Resume</a>
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