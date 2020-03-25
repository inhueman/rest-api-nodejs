import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateDriver extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeDriverName = this.onChangeDriverName.bind(this);
    this.onChangeDriverEmail = this.onChangeDriverEmail.bind(this);
    this.onChangeDriverTel = this.onChangeDriverTel.bind(this);
    this.onChangeDriverPassword = this.onChangeDriverPassword.bind(this);
    this.onChangeDriverType = this.onChangeDriverType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      tel: '',
      password: '',
      type: ''
    }
  }

  onChangeDriverName(e) {
    this.setState({name: e.target.value})
  }

  onChangeDriverEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeDriverTel(e) {
    this.setState({tel: e.target.value})
  }

  onChangeDriverPassword(e) {
    this.setState({password: e.target.value})
  }

  onChangeDriverType(e) {
    this.setState({type: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    let id = 100;
    id++;

    const driverObj = {
      name: this.state.name,
      email: this.state.email,
      tel: this.state.tel,
      password: this.state.password,
      type: this.state.type
    };

    axios.post(`http://localhost:4000/drivers/${id}`, driverObj)
      .then(res => console.log(res.data));
     
    this.setState({name: '', email: '', tel: '', password: '', type: ''})

    console.log(`User successfully created!`);
    console.log(`Name: ${this.state.name}`);
    console.log(`Email: ${this.state.email}`);
    console.log(`Tel: ${this.state.tel}`);
    console.log(`Password: ${this.state.password}`);
    console.log(`Type: ${this.state.type}`);

    // Redirect to Login 
    this.props.history.push('/login');
  }

  render() {
    return (
    <div className="form-wrapper">
      <Form onSubmit={ this.onSubmit }>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeDriverName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeDriverEmail}/>
        </Form.Group>

        <Form.Group controlId="Tel">
          <Form.Label>Tel</Form.Label>
          <Form.Control type="number" value={this.state.tel} onChange={this.onChangeDriverTel}/>
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangeDriverPassword}/>
        </Form.Group>

        <Form.Group controlId="Role">
          <Form.Label>Choose your role</Form.Label>
          <Form.Control as="select">
            <option>Driver</option>
            <option>Shipper</option>
          </Form.Control>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Account
        </Button>
      </Form>
    </div>);
  }
}