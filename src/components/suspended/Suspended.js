import React, { Component } from 'react';
import {Row, Col, CardPanel, Input, Button, Icon, Navbar, NavItem} from 'react-materialize';
import DocumentTitle from 'react-document-title';
// import './login.css'
// import * as Api from '../api/auth';

declare var $: any;

class Suspended extends Component {
	constructor(props){
		super(props);

		this.handleLogout = this.handleLogout.bind(this);	

	}
	
	handleLogout(e) {
		this.props.handleLogout();
	}

	render(){
		return (
			<DocumentTitle title="SP - Suspended">
				<div >
						
					<div>
								<Navbar options={{ draggable: true, menuWidth: 200, closeOnClick: true }} className="navcolor"  right fixed>
								<div>
									

									<NavItem onClick={this.handleLogout}><Icon>exit_to_app</Icon></NavItem>
								</div>
								</Navbar>
							
						

						<Row>
							 <div className="design">
								
									<h1>Account Suspended </h1>
								
							</div>
						</Row>
					</div>

				</div>
			</DocumentTitle>
		);
	}
}

export default Suspended;
