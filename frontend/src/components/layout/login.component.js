import React, { Component } from 'react';
import {
    Card,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    CardTitle
} from 'reactstrap';
import axios from 'axios';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': "",
            'password': ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.setState({ 
            [ name ]: value,
        });
    }

    submitForm(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log(`Email: ${ this.state.email }`);
        axios
            .post("/login", userData)
            .then(function (res) {
                console.log(res);
                window.location = "/"
            })
            .catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            })
    }

    render() {
        const { email, password } = this.state;
        return(
            <div>
                <center>
                    <Col sm="6">
                        <Card body>
                            <center><CardTitle tag="h5" name="login">LOGIN</CardTitle></center>
                            <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" placeholder="abc@xyz.com" value={ email } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                        <Input type="password" name="password" id="password" placeholder="password" value={ password } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <center><Button type="submit">Login</Button></center>
                            </Form>
                        </Card>
                    </Col>
                </center>
            </div>
        );
    }
};

export default UserLogin;