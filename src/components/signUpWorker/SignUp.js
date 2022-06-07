import React, { Component } from 'react';
import { Icon, Row, Col, Card, Tab, Tabs, CardPanel, Input, Button, Modal, Collapsible, CollapsibleItem, Form } from 'react-materialize';
import DocumentTitle from 'react-document-title';
import "./index.css";

import * as Api from '../api/auth';
import * as Api2 from '../api/client';

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
		  skills: '',
		  change: '',
		  temp: '',

		  error_first_name: '',
		  error_last_name: '',
		  error_address: '',
		  error_birthday: '',
		  error_age: '',
		  error_sex: '',
		  error_email: '',
		  error_username: '',
		  error_password: '',
		  error_confirm_password: '',
		  error_skills: '',
		  error_change: '',

		  data: [],
		  kakayahan: {
		  	description: ''
		  },

		  talent: [],
		  talento: {
		  	talent_id: '',
		  	skill: ''
		  },

		  skl: {
		  	talent_id: '',
		  	skill: ''
		  }



		}

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleSignUpClient = this.handleSignUpClient.bind(this);
		// this.handleSignUpWorker = this.handleSignUpWorker.bind(this);
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
		this.handleSkillsChange = this.handleSkillsChange.bind(this);
		this.handleTalent = this.handleTalent.bind(this);
		this.handleDeleteSkill = this.handleDeleteSkill.bind(this);
		this.handleAddSkill = this.handleAddSkill.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTemp = this.handleTemp.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleOkay = this.handleOkay.bind(this);
	}

	handleKeyUp(e) {
		if(e.keyCode === 13){
			this.handleSubmit(e);
		}
	}

	handleLogIn(e) {
		this.props.history.push('/');
	}

	handleSignUpClient(e){
		this.props.history.push('/sign-up-client/');
	}

	// handleSignUpWorker(e){
	// 	this.props.history.push('/sign-up-worker/');
	// }

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

  	handleSkillsChange(skill) {
		this.setState({ skills: skill })

	}

	handleTalent = () => {
    $('#editModal').modal('open');
  	}



  	handleDeleteSkill = (id) => {
  	    const talent = this.state.talent.filter(talento => {
  	      return talento.talent_id !== id
  	    });
  	    this.setState({
  	      talent
  	    });
  	  }

  	handleAddSkill = (skl) => {
  	  skl.talent_id = Math.random() + 100;
  	  let talent = [...this.state.talent, skl];
  	  this.setState({
  	    talent
  	  });
  	  console.log("WHYYYYYYYYYYYYYYYYYYYYYYYYYYY");
  	  console.log(talent);
  	  console.log(this.state.temp);
  	  console.log(this.state.skl);

  	}

	handleChange = async function(e){
		await this.setState({ change: e.target.value })
		await this.setState({
		    skl: {                   // object that we want to update
		        ...this.state.skl,    // keep all other key-value pairs
		        skill: this.state.change       // update the value of specific key
		    }
		})
	}

	handleTemp = async function(e) {
		await this.setState({ temp: e.target.value })
		await this.setState({
		    skl: {                   // object that we want to update
		        ...this.state.skl,    // keep all other key-value pairs
		        skill: this.state.temp       // update the value of specific key
		    }
		})
		await console.log("WAZZUUUUUUUUUUUUP");
		await console.log(this.state.temp);
		await this.handleAddSkill(this.state.skl);
	}


  	handlePass = (e) => {
  		var mali = false;
  		var tingin = false;
		e.preventDefault();
		this.setState({
			error_change: ''
		});

		if(this.state.change === '') {
			this.setState({ error_change: 'Error' });
			mali = true;
			if (!tingin) { $("#change").focus(); tingin = true; }
		}

		if(!mali){
			this.handleAddSkill(this.state.skl);
			this.setState({
		    	change: ''
		    })	
		}

	}

	handleOkay(){
		if((this.state.talent).length != 0){
			var i;
			var string = this.state.talent[0].skill.toString();
			console.log("OKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY")
				for(i=1;i < (this.state.talent).length;i++) {
					var string = string + ", " + this.state.talent[i].skill.toString();
				}
		this.handleSkillsChange(string);
		}
		console.log(string);
		$('#editModal').modal('close');
		string = '';
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
			error_confirm_password: '',
			error_skills: ''
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
		if(this.state.skills === '') {
			this.setState({ error_skills: 'Required' });
			error = true;
			if (!focus) { $("#skills").focus(); focus = true; }
		}

		if(!error){
			Api.signUpWorker({
			  		first_name: this.state.first_name,
			  		last_name: this.state.last_name,
					address: this.state.address,
					birthday: new Date(this.state.birthday + 'EDT').toISOString().slice(0, 10),
					// age: this.state.age,
					sex: this.state.sex,
					email: this.state.email,
					username: this.state.username,
					password: this.state.password,
					confirm_password: this.state.confirm_password,
					skills: this.state.skills
					// system_position: this.state.system_position,
					// status: this.state.status,
				})
			   .then((result) => {
		   			window.Materialize.toast("Sign up successful.", 3000, 'green-text');
		   			this.handleLogIn();
			   })
				.catch((e) => {
					var error = e.toString().split(' ');
					error = parseInt(error[error.length - 1], 10);
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
			// Api2.addWorkerRating({
			// 	client_id: null,
			//     worker_id: this.state.worker_id,
			//     rating: 5,
			//     review: "New Worker"
			// }); 	
		} else {
			window.Materialize.toast("Invalid or incomplete information.", 3000, 'red-text');
		}
	}

	componentDidMount(){
		$("#first_name").focus();
		Api.viewSkills()
		  .then((result) => {
		    if(result.status === 200){
		      this.setState({ data: result.data.data });
		    }
		  })
		  .catch((e) => { console.log(e) 
		  })  
	}

	render() {

		return (
			<DocumentTitle title="SP - Sign Up">
				<div className="background">
					<Row>
						<Col m={3} l={4}></Col>
						<Col s={12} m={6} l={4}>
								
								<Col fixed-width>
									<Button className="btn-client waves-effect waves-light" onClick={this.handleSignUpClient}>
										<Icon className="fix-client" left></Icon>
										Client
									</Button>
									<Button className="btn-worker waves-effect waves-light">
										<Icon className="fix-worker" left></Icon>
										Worker
									</Button>
								</Col>
									<br/>
									<CardPanel className="hoverable cardPanel1">
									
									<div className="sign">
										<h5>Worker Sign Up</h5>
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
											
											<div s={12} m={6} className="course-action1 clickable" onClick={ () => { this.handleTalent()} } >
											    <Input label={"Skills"} />
											</div>

											
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

					<Modal id="editModal">
						
						<h6>Skills: </h6>
						<CardPanel>
							<div class="skillsup">
							    <ul>
							        {this.state.talent.map(talento => {
							                   return (
							                    
										    		<li className="collection-item clickable" key={talento.talent_id} onClick={() => {this.handleDeleteSkill(talento.talent_id)}}>{talento.skill}</li>
												
							                    ) 
							                })}
							    </ul>
							    
							</div>
						</CardPanel>
						<br/>

						<Input className="cat" s={12} m={6} label="Skills" onKeyUp={this.handleKeyUp} onChange={this.handleTemp} type="select" >
						  {
						    this.state.data.map(kakayahan => {
						      return(
						        <option value={kakayahan.description}>{kakayahan.description}</option>
						      )
						    })
						  }


						</Input>

						<form onSubmit={this.handlePass}>
						    <label>Add a skill:</label>
						    <input type="text" onChange={this.handleChange} value={this.state.change}/>
						</form>
						<br/>
						<Button className="btn-new waves-effect waves-light" onClick={this.handleOkay}>
							Done
						</Button>


					</Modal>
				</div>
			</DocumentTitle>
		);
	}
}

export default SignUp;
