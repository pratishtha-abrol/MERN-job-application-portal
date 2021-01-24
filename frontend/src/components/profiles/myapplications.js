import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import {
	Card,
	CardTitle,
	CardText,
	Badge
} from 'reactstrap';
import axios from 'axios';

import Welcome from './welcome';

class MyApplications extends Component {
	constructor() {
		super();
		this.state = {
			List: []
		};
		// this.handleChange = this.handleClick.bind(this);
	}

	componentDidMount() {
        const data = {
            name: ls.get("username")
        }
		axios.post('/applications/mine', data)
			.then(res => {
				console.log(res.data);
				this.setState ({
					List: res.data,
				});
			});

    }
	
	render() {

		return (
			<div>
                <Welcome />
                {
                    this.state.List.map((p, index) => {
                        return <div key={index}>
                            <Card body className="text-center">
                                <CardTitle>Job ID: {p.jobId}</CardTitle>
                                {/* <Button onClick={this.knowmore.bind(p.jobId)}>Click to get Job Details</Button> */}
                                <CardText>
                                    <Badge color="secondary">Status: {p.status}</Badge>
                                    <br />
                                    <p>SOP:</p>
                                    <p>{p.message}</p>
                                </CardText>
                            </Card>
                        </div>
                    })
                }
			</div>
		)
	}
}

export default MyApplications;