import React, { Component } from 'react';
import {Row, Col, CardPanel, Input, Button, Icon, Navbar, NavItem} from 'react-materialize';
import DocumentTitle from 'react-document-title';
// import './login.css'
import './Unapproved.css'
// import * as Api from '../api/auth';

declare var $: any;

class Unapproved extends Component {
	constructor(props){
		super(props);

		this.handleLogout = this.handleLogout.bind(this);	

	}
	
	handleLogout(e) {
		this.props.handleLogout();
	}

	render(){
		return (
			<DocumentTitle title="SP - Unapproved">
				<div >
						
					<div>
								<Navbar options={{ draggable: true, menuWidth: 200, closeOnClick: true }} className="navcolor"  right fixed>
								<div>
									

									<NavItem onClick={this.handleLogout}><Icon>exit_to_app</Icon></NavItem>
								</div>
								</Navbar>
							
						

						<Row s={10}>
						</Row>
						<Row s={4}>
							<div className="design">
								
									<h1>Account Pending for Approval </h1>
								
							</div>
						</Row>
						<Row s={4}>
						</Row>
					</div>

				</div>
			</DocumentTitle>
		);
	}
}

export default Unapproved;
