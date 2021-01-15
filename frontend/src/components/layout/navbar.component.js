import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

export default class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Job Application Portal</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Form inline>
                                        <FormGroup>
                                            <Label for="email" hidden>Email</Label>
                                            <Input type="email" name="email" id="email" placeholder="Email"></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password" hidden>Password</Label>
                                            <Input type="password" name="password" id="password" placeholder="Password"></Input>
                                        </FormGroup>
                                        <Button>Login</Button>
                                    </Form>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
};