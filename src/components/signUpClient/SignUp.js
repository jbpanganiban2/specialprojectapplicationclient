import React, { Component } from 'react';
import { Icon, Row, Col, Card, Tab, Tabs, CardPanel, Input, Button } from 'react-materialize';
import DocumentTitle from 'react-document-title';
import "./index.css";

import * as Api from '../api/auth';
import * as Api2 from '../api/worker';

import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

declare var $: any;

class SignUp extends Component {
	constructor(props){
		super(props);

		this.state = {
		  first_name: '',
		  last_name: '',
		  address: '',
		  birthday: '',
		  age: '',
		  sex: 'male',
		  email: '',
		  username: '',
		  password: '',
		  confirm_password: '',

		  // system_position: 'faculty',
		  // status: 'active',

		  error_first_name: '',
		  error_last_name: '',
		  error_address: '',
		  error_birthday: '',
		  error_age: '',
		  error_sex: '',
		  error_email: '',
		  error_username: '',
		  error_password: '',
		  error_confirm_password: ''
		}

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
		// this.handleSignUpClient = this.handleSignUpClient.bind(this);
		this.handleSignUpWorker = this.handleSignUpWorker.bind(this);
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleSexChange = this.handleSexChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		// this.handleStatusChange = this.handleStatusChange.bind(this);
		// this.handleSystemPositionChange = this.handleSystemPositionChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleConfPassChange = this.handleConfPassChange.bind(this);

		// this.createUser = this.createUser.bind(this)
	}

	handleKeyUp(e) {
		if(e.keyCode === 13){
			this.handleSubmit(e);
		}
	}

	handleLogIn(e) {
		this.props.history.push('/');
	}

	// handleSignUpClient(e){
	// 	this.props.history.push('/sign-up-client/');
	// }

	handleSignUpWorker(e){
		this.props.history.push('/sign-up-worker/');
	}

	handleFirstNameChange(e) {
		this.setState({ first_name: e.target.value })
	}

	handleLastNameChange(e) {
		this.setState({ last_name: e.target.value })
	}

	handleAddressChange(e) {
		this.setState({ address: e.target.value })
	}

	handleBirthdayChange(e) {
		this.setState({ birthday: e.target.value })
	}

	handleAgeChange(e) {
		this.setState({ age: e.target.value })
	}

	handleSexChange(e) {
		this.setState({ sex: e.target.value })
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value })
	}

	handleUsernameChange(e) {
		this.setState({ username: e.target.value.toLowerCase() })
	}

 //  	handleStatusChange(e) {
 //    	this.setState({ status: e.target.value });
 //  	}

	// handleSystemPositionChange(e) {
 //    	this.setState({ system_position: e.target.value });
 //  	}

  	handlePassChange(e) {
  		this.setState({ password: e.target.value })
  	}

  	handleConfPassChange(e) {
  		this.setState({ confirm_password: e.target.value })
  	}

	handleSubmit(e) {
		var error = false;
		var focus = false;
		e.preventDefault();
		this.setState({ error_first_name: '',
			error_last_name: '',
			error_address: '',
			error_birthday: '',
			// error_age: '',
			error_sex: '',
			error_email: '',
			error_username: '',
			error_password: '',
			error_confirm_password: ''
		});

		if(this.state.first_name === '') {
			this.setState({ error_first_name: 'Required' });
			error = true;
			if (!focus) { $("#first_name").focus(); focus = true; }
		}
		if(this.state.last_name === '') {
			this.setState({ error_last_name: 'Required' });
			error = true;
			if (!focus) { $("#last_name").focus(); focus = true; }
		}
		if(this.state.address === '') {
			this.setState({ error_address: 'Required' });
			error = true;
			if (!focus) { $("#address").focus(); focus = true; }
		}
		if(this.state.birthday === '') {
			this.setState({ error_birthday: 'Required' });
			error = true;
			if (!focus) { $("#birthday").focus(); focus = true; }
		}
		// if(this.state.age === '') {
		// 	this.setState({ error_age: 'Required' });
		// 	error = true;
		// 	if (!focus) { $("#age").focus(); focus = true; }
		// }
		if(this.state.sex === '') {
			this.setState({ error_sex: 'Required' });
			error = true;
			if (!focus) { $("#sex").focus(); focus = true; }
		}
		// if(this.state.email === '') {
		// 	this.setState({ error_email: 'Required' });
		// 	error = true;
		// 	if (!focus) { $("#email").focus(); focus = true; }
		// }
		if(this.state.email === '') {
			this.setState({ error_email: 'Required' });
			error = true;
			if (!focus) { $("#email").focus(); focus = true; }
		}	else {
			var pattern = /^[a-z0-9]+(@gmail.com|@yahoo.com|@up.edu.ph)$/;
			var didMatch = this.state.email.match( pattern );
			if(!didMatch){
				this.setState({ error_email: 'Invalid email' });
				error = true ;
				if (!focus) { $("#email").focus(); focus = true; }
			}
		}		
		if(this.state.username === '') {
			this.setState({ error_username: 'Required' });
			error = true;
			if (!focus) { $("#user").focus(); focus = true; }
		}
		 
		// else {
		// 	var pattern = /^[a-z0-9]+@up.edu.ph$/;
		// 	var didMatch = this.state.email.match( pattern );
		// 	if(!didMatch){
		// 		this.setState({ error_email: 'Invalid UPmail' });
		// 		error = true ;
		// 		if (!focus) { $("#email").focus(); focus = true; }
		// 	}
		// }
		if(this.state.password === '') {
			this.setState({ error_password: 'Required' });
			error = true;
			if (!focus) { $("#pass").focus(); focus = true; }
		}
		else if(this.state.password.length < 8){
			this.setState({error_password: 'Too short'});
			error = true;
			if (!focus) { $("#pass").focus(); focus = true; }
		}
		if(this.state.password.length >= 8 && this.state.confirm_password === '') {
			this.setState({ error_confirm_password: 'Required' });
			error = true;
			if (!focus) { $("#cpass").focus(); focus = true; }
		} else if(this.state.password.length >= 8){
			if(this.state.password !== this.state.confirm_password){
				this.setState({ error_confirm_password: 'Doesn\'t match'});
				error = true;
				if (!focus) { $("#cpass").focus(); focus = true; }
			}
		}

		if(!error){
			Api.signUpClient({
			  		first_name: this.state.first_name,
			  		last_name: this.state.last_name,
					address: this.state.address,
					birthday: new Date(this.state.birthday + 'EDT').toISOString().slice(0, 10),
					// age: this.state.age,
					sex: this.state.sex,
					email: this.state.email,
					username: this.state.username,
					password: this.state.password,
					confirm_password: this.state.confirm_password
					// system_position: this.state.system_position,
					// status: this.state.status,
				})
			   .then((result) => {
		   			window.Materialize.toast("Sign up successful.", 3000, 'green-text');
		   			// Api2.addClientRating({
		   			// 	worker_id: 1,
		   			//     client_id: this.state.client_id,
		   			//     rating: 5,
		   			//     review: "New Client"
		   			// });
		   			window.setTimeout(function(){}, 1000);
		   			this.handleLogIn();
		   			
			   })
				.catch((e) => {
					var error = e.toString().split(' ');
					error = parseInt(error[error.length - 1], 10);
					console.log("MAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLI");
					console.log(e);
					if(error === 405){
						this.setState({ error_username: 'Username taken' });
						window.Materialize.toast('Username already taken.', 3000, 'red-text');
					}
					if(error === 406){
						this.setState({ error_email: 'Email taken' });
						window.Materialize.toast('Email already taken.', 3000, 'red-text');
					}
					if(error === 408){
						this.setState({ error_email: 'Email banned by the admin' });
						window.Materialize.toast('Email banned by the admin.', 3000, 'red-text');
					}
					else {
						window.Materialize.toast("Failed to create user.", 3000, 'red-text');
					}
				});
			 
		} else {
			window.Materialize.toast("Invalid or incomplete information.", 3000, 'red-text');
		}

		// const chatClient = new StreamChat('myfzwuxvrsyg');

  //       // create a new user, if the user already exists an error is returned
  //       chatClient.user(this.state.username).create({
  //           name: this.state.user.first_name + ' ' + this.state.user.last_name, 
  //           gender: this.state.user.sex
  //       });
	}

	// createUser() {
 //        const chatClient = new StreamChat('myfzwuxvrsyg');

 //        // create a new user, if the user already exists an error is returned
 //        chatClient.user(this.state.username).create({
 //            name: this.state.user.first_name + ' ' + this.state.user.last_name, 
 //            gender: this.state.user.sex
 //        });
 //    }

	componentDidMount(){
		$("#first_name").focus();
	}

	render() {

		return (
			<DocumentTitle title="SP - Sign Up">
				<div className="background">
					<Row>
						<Col m={3} l={4}></Col>
						<Col s={12} m={6} l={4}>
								
								<Col fixed-width>
									<Button className="btn-client waves-effect waves-light">
										<Icon className="fix-client" left></Icon>
										Client
									</Button>
									<Button className="btn-worker waves-effect waves-light" onClick={this.handleSignUpWorker}>
										<Icon className="fix-worker" left></Icon>
										Worker
									</Button>
								</Col>
									<br/>
									<CardPanel className="hoverable cardPanel1">

										<div className="sign">
											<h5>Client Sign Up</h5>
										</div>
										<hr/>
										<br/>

										<Row>
											
											<Input s={12} m={6} id="first_name" label="First Name" onKeyUp={this.handleKeyUp} onChange={this.handleFirstNameChange} error={this.state.error_first_name?this.state.error_first_name: null} />
											<Input s={12} m={6} id="last_name" label="Last Name" onKeyUp={this.handleKeyUp} onChange={this.handleLastNameChange} error={this.state.error_last_name?this.state.error_last_name: null} />
											<Row>
											<Input s={12}  id="address" label="Address" onKeyUp={this.handleKeyUp} onChange={this.handleAddressChange} error={this.state.error_address?this.state.error_address: null} />
											</Row>
											<Input s={12} m={6} id="birthday" label="Birthday" onKeyUp={this.handleKeyUp} onChange={this.handleBirthdayChange} type="date" />
											<Input s={12} m={6} id="sex" label="Sex" onKeyUp={this.handleKeyUp} onChange={this.handleSexChange} type="select" defaultValue="male">
											 	<option value="male">Male</option>
							                	<option value="female">Female</option>
											</Input>
											<Input s={12} m={6} id="email" label="Email" onKeyUp={this.handleKeyUp} onChange={this.handleEmailChange} error={this.state.error_email?this.state.error_email: null} />
											<Input s={12} m={6} id="user" label="Username" onKeyUp={this.handleKeyUp} onChange={this.handleUsernameChange} error={this.state.error_username?this.state.error_username: null} />
											
											
											
											<Input s={12} m={6} id="pass" type="password" label="Password" onKeyUp={this.handleKeyUp} onChange={this.handlePassChange} error={this.state.error_password?this.state.error_password: null} />
											<Input s={12} m={6} id="cpass" type="password" label="Confirm Password" onKeyUp={this.handleKeyUp} onChange={this.handleConfPassChange} error={this.state.error_confirm_password?this.state.error_confirm_password: null} />
											<br/>
											<br/>
											<Col s={12}>
												<Button className="btn-new waves-effect waves-light" onClick={this.handleSubmit}>

													Sign Up
												</Button>
											</Col>
											<Col s={12} className="marginize">
												<Button className="btn-new waves-effect waves-light" onClick={this.handleLogIn}>
													<Icon className="fix-margin" left>keyboard_arrow_left</Icon>
													Back to LogIn
												</Button>
											</Col>
										</Row>
									</CardPanel>
							
						</Col>
					</Row>
				</div>
			</DocumentTitle>
		);
	}
}

export default SignUp;
