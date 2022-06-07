import React, { Component } from 'react';
import {Row, Col, CardPanel, Input, Button, Icon, Modal, Table} from 'react-materialize';
import DocumentTitle from 'react-document-title';
import './login.css'
import * as Api from '../api/auth';

declare var $: any;

class LogIn extends Component {
	constructor(props){
		super(props);

		this.state = {
		  username:'',
		  password:'',
		  error_username: '',
		  error_password: '',
		  data: [],
		  clientdata: [],
		  workerdata: [],

		  joboffer: {
		    title: '',
		    description: '',
		    category: ''
		  },

		  client: {
		  	first_name: '',
		  	last_name: ''
		  },

		  worker: {
		  	first_name: '',
		  	last_name: ''
		  }


		}

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleSignUpClient = this.handleSignUpClient.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAbout = this.handleAbout.bind(this);
	}

	handleKeyUp(e){
		if(e.keyCode === 13){
			this.handleSubmit(e);
		}
	}

	handleSignUpClient(e){
		this.props.history.push('/sign-up-client/');
	}

	handleUsernameChange(e){
		this.setState({ username: e.target.value })
	}

  	handlePassChange(e){
  		this.setState({ password: e.target.value })
  	}

  	handleAbout = async function(){
	    $('#showAbout').modal('open');
  	}


	handleSubmit(){
		this.setState({
			error_username: '',
			error_password: ''
		})

		var error = false;
		var focus = false;
		if(this.state.username === ''){
			this.setState({ error_username: 'Required' });
			error = true;
			if (!focus) { $("#user").focus(); focus = true; }
		}
		if(this.state.password === ''){
			this.setState({ error_password: 'Required' });
			error = true;
			if (!focus) { $("#pass").focus(); focus = true; }
		}
		if(!error){
			const data = {
				username: this.state.username,
				password: this.state.password
			};
			Api.login(data)
			.then((result) => {
				this.props.handlePutUser(result.data.data);
			})
			.catch((e) => {
				var error = e.toString().split(' ');
				error = parseInt(error[error.length - 1], 10);
				if(error === 404){
					this.setState({
						username: '',
						password: '',
						error_username: ' ',
						error_password: ' '
					})
					window.Materialize.toast('Incorrect username or password.', 3000, 'red-text');
				} else if(error === 405){
					this.setState({
						username: '',
						password: ''
					})
					window.Materialize.toast('Account not yet approved.', 3000, 'red-text');
				} else {
					window.Materialize.toast('Log in error.', 3000, 'red-text');
				}
			});
		}
	}

	componentDidMount(){
		$("#user").focus();
		Api.topJobOffer()
		  .then((result) => {
		    if(result.status === 200){
		      this.setState({ data: result.data.data });
		    }
		  })
		  .catch((e) => { console.log(e) 
		  })
		// Api.topWorker()
		//   .then((result) => {
		//     if(result.status === 200){
		//       this.setState({ workerdata: result.data.data });
		//     }
		//   })
		//   .catch((e) => { console.log(e) 
		//   })
		// Api.topClient()
		//   .then((result) => {
		//     if(result.status === 200){
		//       this.setState({ clientdata: result.data.data });
		//     }
		//   })
		//   .catch((e) => { console.log(e) 
		//   })  

	}

	render(){
		return (
			<DocumentTitle title="SP - Login">

				<div className="body-wrapper valign-wrapper background">
					
					<CardPanel className="topoffer">
						
						 
						    <ul>
						      
						      <h6>Top Job Offers</h6>
						        <hr/>
						      
						    </ul>
						  
						  {
						    this.state.data?.length > 0 ? 
						    	(
								    this.state.data.map(joboffer => {
								        return(
								          <ul>
								          	<CardPanel className="rank" hoverable>
								              <li>{joboffer.title}</li>
								            </CardPanel>  
								          </ul> 
								        )
								    })
							    )
							    :
							    null
						    
						  }
						   
					</CardPanel>

					


					<Row>
						<Col m={3}></Col>
						<Col s={12} m={6}>
							
							<CardPanel className="hoverable cardPanel">
								<Row>
									

									<Input s={12} id="user" label="Username" onKeyUp={this.handleKeyUp} onChange={(event,newValue) => this.setState({username: newValue.toLowerCase()})} value={this.state.username} error={this.state.error_username?this.state.error_username: null} ><Icon>account_circle</Icon></Input>
									<Input s={12} id="pass" type="password" label="Password" onKeyUp={this.handleKeyUp} onChange={(event,newValue) => this.setState({password: newValue})} value={this.state.password} error={this.state.error_password?this.state.error_password: null} ><Icon>lock</Icon></Input>
									<Col s={6}>
										<Button className="btn-new waves-effect waves-light" onClick={this.handleSubmit}>
											Log<span className="hide-on-small-only">{` `}</span>In
										</Button>
									</Col>
									<Col s={6}>
										<Button className="btn-new waves-effect waves-light" onClick={this.handleSignUpClient}>
											Sign<span className="hide-on-small-only">{` `}</span>up
										</Button>
									</Col>
								</Row>
							</CardPanel>
							<Button className="btn-new waves-effect waves-light" onClick={this.handleAbout}>
								About<span className="hide-on-small-only">{` `}</span>
							</Button>
						</Col>
					</Row>
					<Modal id="showAbout">
					  
					   <CardPanel>

					    <ul> This web application aims to connect clients and independent workers. </ul>

					   </CardPanel>
					
					</Modal>
				</div>
			</DocumentTitle>
		);
	}
}

export default LogIn;
