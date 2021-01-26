import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from "local-storage";
import {
	Card,
	Button,
	CardTitle,
	CardText,
	Badge,
	CardSubtitle,
	Row,
	Input,
	Label,
	FormGroup
} from 'reactstrap';
import axios from 'axios';

let num = 0;

class ApplicantProfile extends Component {
	constructor() {
		super();
		this.state = {
			JobList: [],
			titlesearch: null,
			typesearch: "",
			durationfilter: "undefined",
			min: "",
			max: ""
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

	handleClick = (id, title) => {
		// return(
		// 	<div class="alert">
		// 		<center><h4>Message: </h4></center> 
		// 		<center><Input type="text" onChange={this.onChange} placeholder="Add a SOP here" /></center>
		// 	</div>
		// )
		num = num + 1;
		if (num > 10) {
			alert("Exceeded application limit");
			window.location.reload();
		}
		else {

			const msg = window.prompt("Enter SOP here");
			const app = {
				jobId: id,
				jobName: title,
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
		}

	}

	searchSpace = (event) => {
		let keyword = event.target.value;
		this.setState({ titlesearch: keyword })
	}

	Change = async (e) => {
		var val = e.target.value;
		await this.setState({ typesearch: val });
		console.log(this.state.typesearch)
	}

	toggle = () => this.setState({dropdownOpen: !this.state.dropdownOpen});

	handleChange = async (event) => {
        await this.setState({ 
            durationfilter: event.target.value,
		});
		console.log(this.state.durationfilter)
	}
	
	minChange = async (e) => {
		await this.setState({ 
            min: e.target.value,
		});
		console.log(this.state.min)
	}

	maxChange = async (e) => {
		await this.setState({ 
            max: e.target.value,
		});
		console.log(this.state.max)
	}

	salarysortasc = async (e) => {
		const List = await this.state.JobList.sort(function (a, b) {
			return a.Job.salary - b.Job.salary;
		})
		// console.log(this.state.JobList)
		// window.location.reload();
		this.setState({JobList: List})
	}

	salarysortdesc = async (e) => {
		const List = await this.state.JobList.sort(function (a, b) {
			return a.Job.salary - b.Job.salary;
		}).reverse();
		// console.log(this.state.JobList)
		// window.location.reload();
		this.setState({JobList: List})
	}

	durationsortasc = async (e) => {
		const List = await this.state.JobList.sort(function (a, b) {
			return a.Job.duration - b.Job.duration;
		})
		// console.log(this.state.JobList)
		// window.location.reload();
		this.setState({JobList: List})
	}

	durationsortdesc = async (e) => {
		const List = await this.state.JobList.sort(function (a, b) {
			return a.Job.duration - b.Job.duration;
		}).reverse();
		// console.log(this.state.JobList)
		// window.location.reload();
		this.setState({JobList: List})
	}

	ratingsortasc = async (e) => {
		const List = await this.state.JobList.sort(function (a, b) {
			return a.Job.rating - b.Job.rating;
		})
		// console.log(this.state.JobList)
		// window.location.reload();
		this.setState({JobList: List})
	}

	ratingsortdesc = async (e) => {
		const List = await this.state.JobList.sort(function (a, b) {
			return a.Job.rating - b.Job.rating;
		}).reverse();
		// console.log(this.state.JobList)
		// window.location.reload();
		this.setState({JobList: List})
	}
	
	
	render() {

		return (
			// <h3>
			// 	Hello {ls.get("username")}. You are a {ls.get("role")}
			// </h3>
			<div>
				{/* {ls.get("userrole") === "Applicant" ? ( */}
				<div>
					<Card body color="light" className="text-center">
					<Row>
						<Input type="text" id="search" placeholder="search for title" onChange={(e) => this.searchSpace(e)}/>
					</Row>
					{/* <Row> */}
					<Card body className="text-center">
						<CardTitle>Filter on Job Type</CardTitle>
						<Card>
						<Input type="radio" name="radio2" value="Full Time" onChange={this.handleChange}/>{' '} Full Time
						</Card>
						<Card>
						<Input type="radio" name="radio2" value="Part Time" onChange={this.handleChange}/>{' '} Part Time
						</Card>
						<Card>
						<Input type="radio" name="radio2" value="Internship" onChange={this.handleChange}/>{' '} Internship/WFH
						</Card>
					</Card>
					{/* <FormGroup> */}
                        <Label for="select">Job Duration Filter</Label>
                            <Input type="select" name="role" id="role" onChange={ (e) => {this.Change(e)} }>
                                <option value="0">undefined</option>
                                <option value="1">1 month</option>
								<option value="2">2 month</option>
								<option value="3">3 month</option>
								<option value="4">4 month</option>
								<option value="5">5 month</option>
								<option value="6">6 month</option>
                            </Input>

							<Label for="salary">Salary Filter</Label>
                            <Input type="number" min="0" placeholder="minimum" onChange={ (e) => {this.minChange(e)}} />
							<Input type="number" min="0" placeholder="maximum" onChange={ (e) => {this.maxChange(e)}} />
                    {/* </FormGroup> */}
					{/* </Row> */}
					</Card>
					<div>
						<center>
						<Card body>
						<FormGroup tag="fieldset">
							<legend>Sort on Salary</legend>
							<FormGroup check>
								<Button onClick={(e) => this.salarysortasc(e)}>Ascending</Button>
							</FormGroup>
							<FormGroup check>
								<Button onClick={this.salarysortdesc}>Descending</Button>
							</FormGroup>
						</FormGroup>
						</Card>
						<Card>
						<FormGroup tag="fieldset">
							<legend>Sort on Duration</legend>
							<FormGroup check>
								<Button onClick={this.durationsortasc}>Ascending</Button>
							</FormGroup>
							<FormGroup check>
								<Button onClick={this.durationsortdesc}>Descending</Button>
							</FormGroup>
						</FormGroup>
						</Card>
						<Card>
						<FormGroup tag="fieldset">
							<legend>Sort on Job Rating</legend>
							<FormGroup check>
								<Button onClick={this.ratingsortasc}>Ascending</Button>
							</FormGroup>
							<FormGroup check>
								<Button onClick={this.ratingsortdesc}>Descending</Button>
							</FormGroup>
						</FormGroup>
						</Card>
						</center>
					</div>
				</div>
					<div>
						{/* <center>Hello there, Applicant {ls.get("username")}</center> */}
						<div class="row">  
							<div class="col-sm-12 btn btn-primary" style={{ "margin": "6px" }}>  
								Job Listing 
							</div>  
						</div>
						{
							this.state.JobList.filter((p) => {
								if(this.state.titlesearch === null) return p
								else if(p.Job.title.includes(this.state.titlesearch.toLowerCase())) return p
							})
							.filter((p) => {
								if(this.state.typesearch === "") return p
								else if(p.Job.type === (this.state.typesearch)) return p
							})
							.filter((p) => {
								if(this.state.durationfilter === "undefined") return p
								// else if(p.Job.duration < (this.state.durationfilter)) return p
							})
							.filter(p => {
								if(this.state.min === "") return p
								else if(p.Job.salary > (this.state.min)) return p
							})
							.filter(p => {
								if(this.state.max === "") return p
								else if(p.Job.salary < (this.state.max)) return p
							})
							.map((p, index) => {
								return <div key={index}>
									<Card body color="light" className="text-center">
										<CardTitle><h5>{p.Job.title}</h5></CardTitle>
										<CardSubtitle>Id: {p.Job._id}</CardSubtitle>
										<div>
											<Badge color="info">Rating: {p.Job.rating}</Badge>
											<Badge color="secondary">{p.Job.type}</Badge>
											<Badge color="success">{p.Job.status}</Badge>
										</div>
										<div>
										<CardSubtitle>Recruiter: {p.Job.postedby} <br/>Email: {p.Job.recruiteremail} <br/> Date of Posting: {p.Job.date}</CardSubtitle>
										</div>
										<div>
										<CardText>Skills: {p.Job.requiredSkills.map(skill => {return (<Badge color="info">{skill}</Badge>)})} <br/>Salary: {p.Job.salary}<br/>Duration: {p.Job.duration} <br/>Job Type: {p.Job.type}</CardText>
										</div>
										<Button color={p.hasapplied==="true" ? "success" : "danger"} id="submit" onClick={(index) => this.handleClick(p.Job._id, p.Job.title)}>{p.hasapplied==="true" ? "Applied!" : "Apply"}</Button>
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