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

export default class User extends Component {
    render() {
        return(
            <div>
                <center>
                    <Col sm="6">
                        <Card body>
                            <center><CardTitle tag="h5" name="register">REGISTER</CardTitle></center>
                            <Form>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                        <Input type="name" name="name" id="name" placeholder="full name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" placeholder="abc@xyz.com" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                        <Input type="password" name="password" id="password" placeholder="password" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="select">Role</Label>
                                        <Input type="select" name="select" id="select">
                                            <option>Applicant</option>
                                            <option>Recruiter</option>
                                        </Input>
                                </FormGroup>
                                <center><Button type="submit">Register</Button></center>
                            </Form>
                        </Card>
                    </Col>
                </center>
            </div>
        );
    }
};