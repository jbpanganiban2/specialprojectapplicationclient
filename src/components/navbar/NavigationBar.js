import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import "./index.css";

class NavigationBar extends Component {
	constructor(props){
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
		this.toClientProfile = this.toClientProfile.bind(this);
		this.toWorkerProfile = this.toWorkerProfile.bind(this);
		this.toJobOffer = this.toJobOffer.bind(this);
		this.toSearchJobOffer = this.toSearchJobOffer.bind(this);
		this.toSearchBid = this.toSearchBid.bind(this);
		this.toViewJobOffer = this.toViewJobOffer.bind(this);
		this.toViewAllClients = this.toViewAllClients.bind(this);
		this.toViewAllWorkers = this.toViewAllWorkers.bind(this);
		this.toOnGoingClient = this.toOnGoingClient.bind(this);
		this.toOnGoingWorker = this.toOnGoingWorker.bind(this);
		this.toDoneWorker = this.toDoneWorker.bind(this);
		this.toDoneClient = this.toDoneClient.bind(this);
		this.toViewReported = this.toViewReported.bind(this);
		this.toChatClient = this.toChatClient.bind(this);
		this.toApproveWorker = this.toApproveWorker.bind(this);
		this.toUnapproved = this.toUnapproved.bind(this);
		this.toChatWorker = this.toChatWorker.bind(this);
		this.toChatAdmin = this.toChatAdmin.bind(this);
	}

	handleLogout(e) {
		this.props.handleLogout();
	}

	toClientProfile(e){
		this.props.history.push('/client-profile/');
	}

	toWorkerProfile(e){
		this.props.history.push('/worker-profile/');
	}

	toJobOffer(e){
		this.props.history.push('/job-offer/');
	}

	toSearchJobOffer(e){
		this.props.history.push('/search-job-offer/');
	}

	toSearchBid(e){
		this.props.history.push('/search-bid/');
	}

	toViewJobOffer(e){
		this.props.history.push('/view-job-offer/');
	}

	toViewAllClients(e){
		this.props.history.push('/view-all-clients/');
	}

	toViewAllWorkers(e){
		this.props.history.push('/view-all-workers/');
	}

	toOnGoingClient(e){
		this.props.history.push('/on-going-client/');
	}

	toOnGoingWorker(e){
		this.props.history.push('/on-going-worker/');
	}

	toDoneWorker(e){
		this.props.history.push('/done-worker/');
	}

	toDoneClient(e){
		this.props.history.push('/done-client/');
	}

	toViewReported(e){
		this.props.history.push('/view-reported/');
	}

	toChatClient(e){
		this.props.history.push('/chat-client/');
	}

	toApproveWorker(e){
		this.props.history.push('/approve-worker/');
	}

	toUnapproved(e){
		this.props.history.push('/approve-worker/');
	}

	toChatWorker(e){
		this.props.history.push('/chat-worker/');
	}

	toChatAdmin(e){
		this.props.history.push('/chat-admin/');
	}

	render() {
		return (
			<div>
				{ this.props.loggedIn ? (
						<Navbar options={{ draggable: true, menuWidth: 200, closeOnClick: true }} className="navcolor"  right fixed>
						<div>

							{this.props.user.user_type === 'client' && (<NavItem className={this.props.activePage[0] ? 'lighter': ''} onClick={this.toJobOffer}>Post Job Offer</NavItem>)}
							
							{this.props.user.user_type === 'client' && (<NavItem className={this.props.activePage[1] ? 'lighter': ''} onClick={this.toSearchBid}>My Job Offers</NavItem>)}
							
							{this.props.user.user_type === 'client' && (<NavItem className={this.props.activePage[2] ? 'lighter': ''} onClick={this.toOnGoingClient}>On Going</NavItem>)}
							
							{this.props.user.user_type === 'client' && (<NavItem className={this.props.activePage[3] ? 'lighter': ''} onClick={this.toDoneClient}>Completed</NavItem>)}
							
							{this.props.user.user_type === 'worker' && (<NavItem className={this.props.activePage[4] ? 'lighter': ''} onClick={this.toSearchJobOffer}>Search Job Offers</NavItem>)}

							{this.props.user.user_type === 'worker' && (<NavItem className={this.props.activePage[5] ? 'lighter': ''} onClick={this.toViewJobOffer}>View Offered Job</NavItem>)}
							
							{this.props.user.user_type === 'client' && (<NavItem className={this.props.activePage[6] ? 'lighter': ''} onClick={this.toChatClient}>Chat</NavItem>)}
							
							{this.props.user.user_type === 'client' && (<NavItem className={this.props.activePage[7] ? 'lighter': ''} onClick={this.toClientProfile}> Hi, {this.props.user ? this.props.user.first_name : "" }!</NavItem>)}
							
							{this.props.user.user_type === 'worker' && (<NavItem className={this.props.activePage[8] ? 'lighter': ''} onClick={this.toOnGoingWorker}>On Going</NavItem>)}
							
							{this.props.user.user_type === 'worker' && (<NavItem className={this.props.activePage[9] ? 'lighter': ''} onClick={this.toDoneWorker}>Completed</NavItem>)}
							
							{this.props.user.user_type === 'worker' && (<NavItem className={this.props.activePage[10] ? 'lighter': ''} onClick={this.toChatWorker}>Chat</NavItem>)}
							
							{this.props.user.user_type === 'worker' && (<NavItem className={this.props.activePage[11] ? 'lighter': ''} onClick={this.toWorkerProfile}> Hi, {this.props.user ? this.props.user.first_name : "" }!</NavItem>)}
							
							{this.props.user.user_type === 'admin' && (<NavItem className={this.props.activePage[12] ? 'lighter': ''} onClick={this.toViewAllClients}>View All Clients</NavItem>)}

							{this.props.user.user_type === 'admin' && (<NavItem className={this.props.activePage[13] ? 'lighter': ''} onClick={this.toViewAllWorkers}>View All Workers</NavItem>)}
				
							{this.props.user.user_type === 'admin' && (<NavItem className={this.props.activePage[14] ? 'lighter': ''} onClick={this.toApproveWorker}>Approve Worker</NavItem>)}
							
							{this.props.user.user_type === 'admin' && (<NavItem className={this.props.activePage[15] ? 'lighter': ''} onClick={this.toViewReported}>Reported Users</NavItem>)}
							
							{this.props.user.user_type === 'admin' && (<NavItem className={this.props.activePage[16] ? 'lighter': ''} onClick={this.toChatAdmin}>Chat</NavItem>)}

							<NavItem divider></NavItem>
							

							<NavItem onClick={this.handleLogout}><Icon>exit_to_app</Icon></NavItem>
						</div>
						</Navbar>
					):(
						<Navbar options={{ draggable: true, menuWidth: 200, closeOnClick: true }} className="blue-grey darken-3" fixed>
				
						<div>
							<NavItem divider></NavItem>
						</div>
						</Navbar>
					)
				}
			</div>
		);
	}
}

export default NavigationBar;