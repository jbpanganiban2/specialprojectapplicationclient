import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Row, Col, CardPanel, Input, Table, Icon, Button, Modal, Collapsible, CollapsibleItem, Form, View, Text } from 'react-materialize';
import Delete from '../delete/Delete';
import "./UserWorkerIndex.css";
import Ratings from 'react-ratings-declarative';
import * as Api from '../api/worker';
import * as Api2 from '../api/admin';
import * as Api3 from '../api/auth';
import * as Api4 from '../api/client';

const axios = require("axios");

declare var $: any;

class User extends Component {
	constructor(props){
		super(props);

		this.state = {
			isPassword: false,
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
			sortUp: true,
			sortBy: 'last_name',
			first_name: '',
			last_name: '',
			address: '',
			birthday: '',
			age: '',
			sex: '',
			email: '',
			username: '',
			skills: '',
			worker_id: '',
			change: '',
		  	temp: '',
		  	pwede: true,
		  	file: '',
			profile: '',
			picture: '',
			photo: '',

			error_first_name: '',
			error_last_name: '',
			error_address: '',
			error_birthday: '',
			error_age: '',
			error_sex: '',
			error_email: '',
			error_username: '',
			error_skills: '',
			error_change: '',
			// error_password: '',
			// error_newPassword: '',
			// error_confirmPassword: '',
			data: [],
			laman: [],
			// unapproved: [],
			edit: false,
			delete: false,
			talent: [],
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
			},
			box: [],
			curl: {
				talent_id: '',
				skill: ''
			},

			rate: [],

			rating: {
			  fname: '',	
			  lname: '',
			  profpic: '',			
			  rating: '',
			  review: ''
			},

			stars: [],
			tala: {
			  rating: ''
			},
      		iskils: []



		}

		this.handleSort = this.handleSort.bind(this);
		this.sort = this.sort.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		// this.handleUserDelete = this.handleUserDelete.bind(this);

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleSexChange = this.handleSexChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleSkillsChange = this.handleSkillsChange.bind(this);

		// this.handleStatusChange = this.handleStatusChange.bind(this);
		// this.handleSystemPositionChange = this.handleSystemPositionChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		// this.handleUserDelete = this.handleUserDelete.bind(this);
		// this.handlePassword = this.handlePassword.bind(this);
		// this.handlePasswordChange = this.handlePasswordChange.bind(this);
		// this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
		// this.handleConfirmChange = this.handleConfirmChange.bind(this);
		// this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleTalent = this.handleTalent.bind(this);
		this.handleDeleteSkill = this.handleDeleteSkill.bind(this);
		this.handleAddSkill = this.handleAddSkill.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTemp = this.handleTemp.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleOkay = this.handleOkay.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
		this.handlePwede = this.handlePwede.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
	}



	componentDidMount(){
		// if(this.props.user.user_type === 'admin'){
		// 	$('.tap-target').tapTarget('open');
		// }
		// // $('.mustValidate > div > label').addClass('active');

		const data = {
			username: this.props.user.username,
			password: this.props.user.password
		};

		console.log("CREDENTIALS");
		console.log(this.props.user.username);
		console.log(this.props.user.password);
		// Api4.login(this.props.user.username, this.props.user.password)
		Api3.login(data)
		.then((result) => {
			this.props.handlePutUser(result.data.data);
		})

		console.log("YAAAAAAAAAAAAAAAAAAAAAAAAAAAS");
		console.log(this.props.user.profilepic);
		this.setState({
			photo: this.props.user.profilepic,
			first_name: this.props.user.first_name,
			last_name: this.props.user.last_name,
			address: this.props.user.address,
			birthday: this.props.user.birthday,
			// age: this.props.user.age,
			sex: this.props.user.sex,
			email: this.props.user.email,
			username: this.props.user.username,
			skills: this.props.user.skills
		})
		this.setState({iskils: this.props.user.skills.split(', ')})
		Api3.viewSkills()
		  .then((result) => {
		    if(result.status === 200){
		      this.setState({ laman: result.data.data });
		    }
		  })
		  .catch((e) => { console.log(e) 
		  })
		Api4.viewReview(this.props.user.worker_id)
		  .then((result) => {
		    console.log(result);
		    console.log("HAHAHAHAHAHAHAHAHA");
		    if(result.status === 200){
		      this.setState({ rate: result.data.data });
		    }
		  })
		  .catch((e) => { console.log(e) 
		  })
		Api4.getWorkerRating(this.props.user.worker_id)
		  .then((result) => {
		    if(result.status === 200){
		      this.setState({ stars: result.data.data });
		    }
		  })
		  .catch((e) => { console.log(e) 
		  })  


	}
	


	sort(){
		const temp = this;
		this.setState({
			data: (this.state.sortBy === 'first_name' ? (this.state.data.slice(0).sort(function(a,b) {return (a.first_name > b.first_name) ? (temp.state.sortUp ? 1 : -1) : ((b.first_name > a.first_name) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
			  : (this.state.sortBy === 'last_name' ? (this.state.data.slice(0).sort(function(a,b) {return (a.last_name > b.last_name) ? (temp.state.sortUp ? 1 : -1) : ((b.last_name > a.last_name) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
              : (this.state.sortBy === 'username' ? (this.state.data.slice(0).sort(function(a,b) {return (a.username > b.username) ? (temp.state.sortUp ? 1 : -1) : ((b.username > a.username) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
              : (this.state.sortBy === 'email' ? (this.state.data.slice(0).sort(function(a,b) {return (a.email > b.email) ? (temp.state.sortUp ? 1 : -1) : ((b.email > a.email) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
              // : (this.state.sortBy === 'teaching_load' ? (this.state.data.slice(0).sort(function(a,b) {return (a.teaching_load > b.teaching_load) ? (temp.state.sortUp ? 1 : -1) : ((b.teaching_load > a.teaching_load) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
              // : (this.state.sortBy === 'system_position' ? (this.state.data.slice(0).sort(function(a,b) {return (a.system_position > b.system_position) ? (temp.state.sortUp ? 1 : -1) : ((b.system_position > a.system_position) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
              : null ))))
		});
		// this.props.handleSort(this.state.sortBy, this.state.sortUp);
	}

	handleSort(sortBy){
		if(this.state.sortBy === sortBy){
			this.setState({ sortUp: !this.state.sortUp }, () => { this.sort() });
		} else {
			this.setState({ sortBy: sortBy }, () => { this.sort() });
		}
	}

	// handlePassword(){
	// 	if(this.state.edit){
	// 		this.componentDidMount();
	// 		this.setState({
	// 			edit : false,
	// 			error_name: '',
	// 			error_username: '',
	// 			error_email: ''
	// 		});
	// 		$("#name").focus();

	// 	} else {
	// 		this.setState({
	// 			currentPassword: '',
	// 			newPassword: '',
	// 			confirmPassword: ''
	// 		});
	// 		$("#cpass").focus();
	// 	}
	// 	this.setState({ isPassword: !this.state.isPassword });
	// }

	handleKeyUp(e) {
		if(e.keyCode === 13){
			// if(this.state.isPassword){
			// 	this.handleChangePassword(e)
			// } else {
				this.handleSubmit(e);
			// }
		}
	}

	handleCancel(e) {
		this.componentDidMount();
		this.setState({
			edit : false,
			error_name: '',
			error_username: '',
			error_email: ''
		});
	}

	handleDelete(e) {
		this.setState({delete : !this.state.delete}, () => {
			if(this.state.delete) this.handleUpdate();
		} );
	}

	handleUpdate() {
		// Api2.getUnapprovedUsers()
		// 	.then((result) => {
		// 		if(result.status === 200){
		// 			this.setState({ unapproved: result.data.data });
		// 		}
		// 	})
		// 	.catch((e) => { 
		// 		var error = e.toString().split(' ');
		// 		error = parseInt(error[error.length - 1], 10);
		// 		if(error === 404){
		// 			this.setState({ unapproved: [] })
		// 		}
		// 	})
		Api2.viewWorkerProfile(this.props.user.worker_id)
			.then((result) => {
				if(result.status === 200){
					this.setState({ data: result.data.data });
				}
			})
			.catch((e) => { console.log(e) })
	}

	handleOpenDelete(worker_id, last_name){
		this.setState({
			worker_id: worker_id,
			last_name: last_name
		})
		$('#deleteForm').modal('open');
	}

	// handleUserDelete(){
	// 	$('#deleteForm').modal('close');
	// 	Api.deleteWorker(this.state.worker_id)
	// 		.then((result) => {
	// 			window.Materialize.toast("Successfully deleted user.", 3000, 'green-text');
	// 			this.handleUpdate();
	// 		})
	// 		.catch((e) => {
	// 			window.Materialize.toast("Failed to delete user.", 3000, 'red-text');
	// 		})
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

	handleSkillsChange(skill) {
		this.setState({ skills: skill })
	}

	handlePwede() {
		this.setState({ pwede: false })
	}


	handleTalent = () => {
	    $('#editModal').modal('open');
	    this.handleLoad();

  	}

  	handleLoad = async function() {
		if(this.state.pwede){  
		    this.state.box = (this.state.skills).split(",");
		    
		    var i;
		    
		    for(i=1;i<(this.state.box).length+1;i++){
			    // this.state.curl.talent_id = Math.random() + 100;
			    // this.state.curl.skill = this.state.box[i-1];


			    await this.setState({
			        curl: {                   // object that we want to update
			            ...this.state.curl,    // keep all other key-value pairs
			            talent_id: i,       // update the value of specific key
			            skill: this.state.box[i-1]       // update the value of specific key
			        }
			    })


			    let talent = [...this.state.talent, this.state.curl];
			    await this.setState({
			      talent
			    });
		    await console.log(this.state.curl);
		    await console.log(this.state.talent);
		    }
		    // console.log(this.state.talent);
		    this.handlePwede();
		}    
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

	// handlePasswordChange(e) {
 //    	this.setState({ currentPassword: e.target.value });
 //  	}

	// handleNewPasswordChange(e) {
 //    	this.setState({ newPassword: e.target.value });
 //  	}

	// handleConfirmChange(e) {
 //    	this.setState({ confirmPassword: e.target.value });
 //  	}

  	// handleApprove(empno){
  	// 	Api.approveUser(empno)
  	// 		.then((result) => {
  	// 			this.handleUpdate();
  	// 		})
  	// 		.catch((e) => {
			// 	window.Materialize.toast('An error occurred.', 3000, 'red-text');
  	// 		})
  	// }

  	errorCheck(e){
  		var error = false;
		var focus = false;
  		e.preventDefault();
		this.setState({
			error_first_name: '',
			error_last_name: '',
			error_address: '',
			error_birthday: '',
			// error_age: '',
			error_sex: '',
			error_email: '',
			error_username: '',
			error_skills: ''

			// error_password: '',
			// error_newPassword: '',
			// error_confirmPassword: ''
		});

		// if(this.state.isPassword){
		// 	if(this.state.currentPassword === '') {
		// 		this.setState({ error_password: 'Required' });
		// 		error = true;
		// 		if (!focus) { $("#pass").focus(); focus = true; }
		// 	}
		// 	if(this.state.newPassword === '' || this.state.confirmPassword === ''){
		// 		if(this.state.newPassword === '') {
		// 			this.setState({ error_newPassword: 'Required' });
		// 			error = true;
		// 			if (!focus) { $("#npass").focus(); focus = true; }
		// 		}
		// 		if(this.state.confirmPassword === ''){
		// 			this.setState({ error_confirmPassword: 'Required' });
		// 			error = true;
		// 			if (!focus) { $("#cpass").focus(); focus = true; }
		// 		}
		// 	} else {
		// 		if(this.state.newPassword !== this.state.confirmPassword){
		// 			this.setState({
		// 				confirmPassword: '',
		// 				error_confirmPassword: 'Doesn\'t match'
		// 			});
		// 			error = true;
		// 			if (!focus) { $("#cpass").focus(); focus = true; }
		// 		}
		// 	}
		// } else {
		
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
		if(this.state.skills === '') {
			this.setState({ error_skills: 'Required' });
			error = true;
			if (!focus) { $("#skills").focus(); focus = true; }
		}	


		// }

		return error;
  	}

	handleSubmit(e) {
		if(!this.state.edit){
			this.setState({edit : true});
		}
		else{
			if(!this.errorCheck(e)){
				Api.editWorkerProfile({
						worker_id: this.props.user.worker_id,

				  		first_name: this.state.first_name,
				  		last_name: this.state.last_name,
						address: this.state.address,
						birthday: new Date(this.state.birthday + 'EDT').toISOString().slice(0, 10),
						// age: this.state.age,
						sex: this.state.sex,
						email: this.state.email,
						// username: this.state.username,
						skills: this.state.skills
				})
					.then((result) => {
						window.Materialize.toast("Changes saved.", 3000, 'green-text');
						this.setState({edit: false});
						// this.props.handleUpdateWorkerSession(this.props.user, result.data.data[0]);
						this.props.handleUpdateSession(this.props.user, result.data.data[0]);
						// this.forceUpdate();

						const data = {
							username: this.props.user.username,
							password: this.props.user.password
						};
						
						Api3.login(data)
						.then((result) => {
							this.props.handlePutUser(result.data.data);
						})
						window.setTimeout(function(){window.location.reload()}, 1000);

					})
					.catch((e) => {
						var error = e.toString().split(' ');
						error = parseInt(error[error.length - 1], 10);
						console.log("DIIIIIIIIIIIITTTTTTTTTTTTTTTTTTOOOOOOOOOOOOO");
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
							window.Materialize.toast('An error occurred.', 3000, 'red-text');
						}
					});
			} else {
				window.Materialize.toast("Invalid or incomplete information.", 3000, 'red-text');
			}
		}
	}

	// handleChangePassword(e){
	// 	if(!this.errorCheck(e)){
	// 		Api.changePassword({
	// 			username: this.state.username,
	// 			password: this.state.currentPassword,
	// 			new_password: this.state.newPassword,
	// 			confirm_password: this.state.confirmPassword
	// 		})
	// 			.then((result) => {
	// 	   			this.setState({
	// 	   				isPassword: false,
	// 	   				currentPassword: '',
	// 	   				newPassword: '',
	// 	   				confirmPassword: ''
	// 	   			});
	// 	   			window.Materialize.toast("Successfull changed password.", 3000, 'green-text');
	// 	   			this.props.handleUpdateSession(this.props.user, result.data.data);
	// 			})
	// 			.catch((e) => {
	// 				var error = e.toString().split(' ');
	// 				error = parseInt(error[error.length - 1], 10);
	// 				if(error === 401){
	// 					this.setState({
	// 						currentPassword: '',
	// 						error_password: 'Incorrect'
	// 					});
	// 					window.Materialize.toast('Incorrect passsword.', 3000, 'red-text');
	// 				} else {
	// 					window.Materialize.toast('Error in changing password.', 3000, 'red-text');
	// 				}
	// 			});
	// 	}
	// }

	// handleFileChange(e) {
 //        // this.setState({picture: "http://localhost:3000/public/uploads/" + e.target.files[0].name});
 //        // await this.setState({file:e.target.files[0]});
 //        // await console.log("YEEEEEEEEEEEEEEEEEEEEEEEY");
 //        // console.log(e.target.files[0].name);
 //        // await console.log(this.state.picture);
 //        this.setState({file:e.target.files[0]});
 //        console.log("FREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
 //        console.log(e.target.files[0]);
 //        console.log(e.target.files[0].name);
 //        this.setState({picture: "http://localhost:3000/public/uploads/" + e.target.files[0].name});

 //    }

	// onFormSubmit = async e => {
 //        e.preventDefault();
 //        const formData = new FormData();
 //        formData.append('myImage',this.state.file);
 //        const config = {
 //            headers: {
 //                'content-type': 'multipart/form-data'
 //            }
 //        };
 //        this.setState({
 //        	photo: this.state.picture
 //        });
 //        axios.post("/upload",formData,config)
 //            .then((response) => {
 //                alert("The file is successfully uploaded");
 //                Api.editWorkerPicture({
 //                	profilepic: this.state.picture,
 //                	worker_id: this.props.user.worker_id
 //                })
 //                	.then((result) => {
 //                		window.Materialize.toast("Changes saved.", 3000, 'green-text');
 //                		this.props.handleUpdateSession(this.props.user, result.data.data[0]);
 //                	})
 //                	.catch((e) => {
                				
 //                	});
 //            }).catch((error) => {
 //        });   
	// 	await console.log("WAZZUUUUUUUUUUUP");
	// 	await console.log(this.state.photo);
	// 	await console.log(this.state.first_name);
 //        await this.setState({profile: this.state.picture});
 //        // await console.log(this.state.profile);
        

	// 	await this.setState({photo: this.state.profile});
	// 	await console.log(this.state.profile);
	// 	await console.log(this.state.photo);
	// 	// await this.props.handleUpdateSession(this.props.user, result.data.data);
 //    }

 	    handleFileChange(e) {
 	        this.setState({file:e.target.files[0]});
 	        console.log("FREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
 	        console.log(e.target.files[0]);
 	        console.log(e.target.files[0].name);
 	        this.setState({picture: "http://localhost:3000/public/uploads/" + e.target.files[0].name});
 	        // await console.log("YEEEEEEEEEEEEEEEEEEEEEEEY");
 	        // console.log(e.target.files[0].name);
 	        // await console.log(this.state.picture);

 	    }

 		onFormSubmit = async e => {
 	        e.preventDefault();
 	        const formData = new FormData();
 	        formData.append('myImage',this.state.file);
 	        const config = {
 	            headers: {
 	                'content-type': 'multipart/form-data'
 	            }
 	        };
 	        this.setState({
 	        	photo: this.state.picture
 	        });
 	        axios.post("/upload",formData,config)
 	            .then((response) => {
 	                alert("The file is successfully uploaded");
 					
 	                Api.editWorkerPicture({
 						profilepic: this.state.picture,
 						worker_id: this.props.user.worker_id
 					}).then((result) => {
 							window.Materialize.toast("Changes saved.", 3000, 'green-text');
 							// this.setState({edit: false});
 							// console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
 							// console.log(result.data.data);
 							// console.log(result.data.data[0]);
 							// console.log("11111111111111111111111111111111111111");
 							// console.log(this.props.user);
 							// this.props.handleUpdateWorkerSession(this.props.user, result.data.data[0]);
 							// console.log("22222222222222222222222222222222222222");
 							// console.log(this.props.user);
 							// window.setTimeout(function(){window.location.reload()}, 1000);

 							const data = {
 								username: this.props.user.username,
 								password: this.props.user.password
 							};
 							
 							Api3.login(data)
 							.then((result) => {
 								this.props.handlePutUser(result.data.data);
 							})
 							window.setTimeout(function(){window.location.reload()}, 1000);
 							
 						})
 						.catch((e) => {
 							var error = e.toString().split(' ');
 							console.log("ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR!");
 							console.log(error);
 							error = parseInt(error[error.length - 1], 10);
 							if(error === 405){
 								this.setState({ error_username: 'Username taken' });
 								window.Materialize.toast('Username already taken.', 3000, 'red-text');
 							} else {
 								window.Materialize.toast('An error occurred.', 3000, 'red-text');
 							}
 						});
 					
 	            }).catch((error) => {
 	        });
 			await console.log("WAZZUUUUUUUUUUUP");
 			await console.log(this.state.photo);
 			await console.log(this.state.first_name);
 	        // await this.setState({profile: this.state.picture});
 	        // await console.log(this.state.profile);
 	        
 			// await this.setState({photo: this.state.profile});
 			await console.log(this.state.profile);
 			await console.log(this.state.photo);
 	    }

	


	handleEdit = async function(){
    
    
    $('#editWorker').modal('open');
  	}




	render() {

		return (
			<DocumentTitle title="Worker Profile">

				
						<div style={{backgroundColor:'#263238'}}>
							<Row>
								<Col m={3} l={this.state.isPassword? 3 : 4}></Col>
								<Col s={12} m={6} l={this.state.isPassword? 6 : 4}>

								</Col>
							</Row>


							<div class="container" >
								<div class="main-body2">

								<div class="thebody2">
								  <div class="card-container2">
								      
								      <img
								          class="round"
								          src={this.state.photo}
								          alt="user"
								          width="200" height="200"
								      />
								      <h4>{this.state.first_name + ' ' + this.state.last_name}</h4>
								      {
								      this.state.stars.map(tala => {
								            return(
								              
								                <Ratings
								      	        rating={tala.rating}
								      	        widgetDimensions="20px"
								      	      >
								      	        <Ratings.Widget widgetRatedColor="yellow" />
								      	        <Ratings.Widget widgetRatedColor="yellow" />
								      	        <Ratings.Widget widgetRatedColor="yellow" />
								      	        <Ratings.Widget widgetRatedColor="yellow" />
								      	        <Ratings.Widget widgetRatedColor="yellow" />
								      	       
								      	    </Ratings>
								              
								            )
								          })
								      }

								       <br/>
								      <br/>
								      <Row>
								      <form >
										    <input type="file" name="myImage" onChange={this.handleFileChange} />
										    <button onClick={this.onFormSubmit}>Upload</button>
										</form>
								      </Row>

										<br/>

									<hr/>	
										<br/>
								      
								      <br/>
								      <p>{this.state.email}</p>
								      <br/>
								      <p>{this.state.address}</p>

									

										<br/>
								      <hr/>
								      <div class="skills">
								          <h6>Skills</h6>
								          <ul>
								              {this.state.iskils.map(iskils => {
								                         return (
								                          
								                            <li>{iskils}</li>
								                          
								                          ) 
								                      })}
								          </ul>
								          
								      </div>
								      <br/>

								      <div class="buttons">
								          <button class="primary" clickable onClick={ () => { this.handleEdit(this.state.first_name, this.state.last_name, this.state.address, this.state.birthday, this.state.sex, this.state.email)} } >
								              Edit
								          </button>
								      </div>

								   
								      
								  </div>
								</div>
							</div>
							</div>






							<div className = "reviewcontainer">

								<div class="thebody2">
									<div class="ratingbody1">

								<div className="card-containerreview">
									
									 <h4>Reviews </h4>
									 <hr/>
									 <br/>

									 {
									   this.state.rate.map(rating => {
									     return(
									       <CardPanel className="review">
									       		
									       		
									       		
									       		

									           
									           <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }} >
									              <img class="round" alt="user" src={rating.profpic} style={{ height: "50px", width: "50px", border: "1px solid #03bfcb", padding: "2px", verticalAlign: 'middle' }} />
									           <span style={{ fontSize: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
									            &nbsp; {rating.fname} {rating.lname}</span>
									             
									             </div>
									         
									       		<br/>
									           {
									           this.state.stars.map(tala => {
									                 return(
									                   
									                     <Ratings
									           	        rating={rating.rating}
									           	        widgetDimensions="20px"
									           	      >
									           	        <Ratings.Widget widgetRatedColor="yellow" />
									           	        <Ratings.Widget widgetRatedColor="yellow" />
									           	        <Ratings.Widget widgetRatedColor="yellow" />
									           	        <Ratings.Widget widgetRatedColor="yellow" />
									           	        <Ratings.Widget widgetRatedColor="yellow" />
									           	       	
									           	    </Ratings>
									                   
									                 )
									               })
									           }

									           

									          
									           <br/>
									           <div className="reviewleft">
									           <p style={{whiteSpace:"pre-line"}}>{rating.review}</p>
									           </div>
									           
									       
									       </CardPanel>
									     )
									   })
									 }

									
								</div>	
								</div>
								</div>
								
								</div>




							

							<Modal id="editWorker">

									<CardPanel className="cardPanel hoverable">
										<Row>
											<div className="mustValidate">

												
												{
													!this.state.isPassword && (
														<Col>
															<Input s={12} m={6} id="first_name" label="First Name" onKeyUp={this.handleKeyUp} onChange={this.handleFirstNameChange} placeholder={this.state.first_name} value={this.state.first_name} error={this.state.error_first_name?this.state.error_first_name: null} disabled={!this.state.edit}/>
															<Input s={12} m={6} id="last_name" label="Last Name" onKeyUp={this.handleKeyUp} onChange={this.handleLastNameChange} placeholder={this.state.last_name} value={this.state.last_name} error={this.state.error_last_name?this.state.error_last_name: null} disabled={!this.state.edit}/>
															<Input s={12} m={6} id="address" label="Address" onKeyUp={this.handleKeyUp} onChange={this.handleAddressChange} placeholder={this.state.address} value={this.state.address} error={this.state.error_address?this.state.error_address: null} disabled={!this.state.edit} />
															<Input s={12} m={6} id="birthday" label="Birthday" onKeyUp={this.handleKeyUp} onChange={this.handleBirthdayChange} placeholder={this.state.birthday} value={this.state.birthday} type="date" disabled={!this.state.edit} />
															<Input s={12} m={6} label="Sex" onKeyUp={this.handleKeyUp} onChange={this.handleSexChange} type="select" defaultValue={this.state.sex} disabled={!this.state.edit}>
											                	<option value="male">Male</option>
											                	<option value="female">Female</option>
											                </Input>
															<Input s={12} m={6} id="email" label="Email" onKeyUp={this.handleKeyUp} onChange={this.handleEmailChange} placeholder={this.state.email} value={this.state.email} error={this.state.error_email?this.state.error_email: null} disabled={!this.state.edit} />
															
															<div s={12} m={6} className="course-action1 clickable" onClick={ () => {!this.state.edit || this.handleTalent()} }>
															    <Input label={"Skills"}  disabled={!this.state.edit} />
															</div>

												        </Col>
											        )
											    }
											    
												<Col s={this.state.isPassword? 12 : 6}>
													<Button className="btn-new waves-effect waves-light" onClick={this.handleSubmit}>
														{
															this.state.isPassword?
																"Submit"
															:
																this.state.edit?
																	"Save"
																:
																	"Edit"
														}
													</Button>
												</Col>
												{
													!this.state.isPassword && (
														<Col s={6}>
															<Button className="btn-new waves-effect waves-light" onClick={this.state.isPassword? this.handleChangePassword : this.handleCancel} disabled={!this.state.edit}>
																Cancel
															</Button>
														</Col>
													)
												}
												
								            </div>
										</Row>
									</CardPanel>

									


							</Modal>


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

								<Input className="cat" s={12} m={6} label="Skills" onKeyUp={this.handleKeyUp} onChange={this.handleTemp} type="select"  >
								  {
								    this.state.laman.map(kakayahan => {
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
								<br/>
								<Button className="btn-new waves-effect waves-light" onClick={this.handleOkay}>
									Confirm
								</Button>


							</Modal>
							
						</div>
					 
				
			</DocumentTitle>
		);
	}
}


export default User;
