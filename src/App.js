import React, { Component } from 'react';

import LogIn from './components/login/LogInContainer';
import SignUpClient from './components/signUpClient/SignUpContainer';
import SignUpWorker from './components/signUpWorker/SignUpContainer';
import NavigationBar from './components/navbar/NavigationBarContainer';
import UserClient from './components/editClient/UserClientContainer';
import UserWorker from './components/editWorker/UserWorkerContainer';
import AddJobOffer from './components/addJobOffer/addJobOfferContainer';
import SearchJobOffer from './components/searchJobOffer/searchJobOfferContainer';
import SearchBid from './components/searchBid/searchBidContainer';
import ViewJobOffer from './components/viewJobOffer/viewJobOfferContainer';
import ViewAllClients from './components/viewAllClients/viewAllClientsContainer';
import ViewAllWorkers from './components/viewAllWorkers/viewAllWorkersContainer';
import OnGoingClient from './components/onGoingClient/onGoingClientContainer';
import OnGoingWorker from './components/onGoingWorker/onGoingWorkerContainer';
import DoneWorker from './components/doneWorker/doneWorkerContainer';
import DoneClient from './components/doneClient/doneClientContainer';
import ViewReported from './components/viewReported/viewReportedContainer';
import ChatClient from './components/chat/ChatClientContainer';
import ChatWorker from './components/workerChat/ChatWorkerContainer';
import ChatAdmin from './components/adminChat/ChatAdminContainer';
import ApproveWorker from './components/approveWorker/approveWorkerContainer';
import Unapproved from './components/unapproved/UnapprovedContainer';
import Suspended from './components/suspended/SuspendedContainer';

import Loader from './features/auth/loader/loader';

import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component {

	componentDidMount(e) {
		this.props.handleGetSession();
	}
	render() {
		// console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEY");
		// console.log(this.props.user);
		return (
		<div>
			<Router history={withRouter}>
				{
					this.props.isGettingSession? (
						<div>
							<NavigationBar activePage={[0,0,0,0,0]} />
							<Loader />
						</div>
					) : 
						!this.props.user? (
							<Switch>
					             <Route exact={true} path="/" render={(props) => {
					             												return(
							             											<div>
							             												<LogIn   {...props} />
							             											</div>
					             												)}
					             											}> </Route>
					             <Route exact={true} path="/sign-up-client" render={(props) => {
					             												return(
							             											<div>
							             												<SignUpClient   {...props} />
							             											</div>
					             												)}
					             											}> </Route>	
					             <Route exact={true} path="/sign-up-worker" render={(props) => {
					               												return(
					                       											<div>
					                       												<SignUpWorker   {...props} />
					                       											</div>
					               												)}
					               											}> </Route>									

					             <Redirect to="/" />
				            </Switch>
			          	) : (
			          		this.props.user.user_type === 'client' ? (

			          		this.props.user.suspended === 'suspended' ? ( 
			          			<Route exact={true} path="/" render={(props) => {
				                     												return(
				        		             											<div>
				        		             												<Suspended   {...props} />
				        		             											</div>
				                     												)}
				                     											}> </Route>  
				            ) : (         											
				            <div>
				            	<Switch>
				                 	<Route exact={true} path="/job-offer" render={(props) => {
				                 												return(
				    		             											<div>
				    		             												<NavigationBar {...props} activePage={[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}/>
				    		             												<AddJobOffer   {...props} />
				    		             											</div>
				                 												)}
				                 											}> </Route> 
				               		<Route exact={true} path="/search-bid" render={(props) => {
				                 												return(
				    		             											<div>
				    		             												<NavigationBar {...props} activePage={[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}/>
				    		             												<SearchBid   {...props} />
				    		             											</div>
				                 												)}
				                 											}> </Route> 								
					                <Route exact={true} path="/on-going-client" render={(props) => {
				                 												return(
				    		             											<div>
				    		             												<NavigationBar {...props} activePage={[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}/>
				    		             												<OnGoingClient   {...props} />
				    		             											</div>
				                 												)}
				                 											}> </Route> 
							        <Route exact={true} path="/done-client" render={(props) => {
							                 												return(
							    		             											<div>
							    		             												<NavigationBar {...props} activePage={[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]}/>
							    		             												<DoneClient   {...props} />
							    		             											</div>
							                 												)}
							                 											}> </Route> 	         												            											                
					             	<Route exact={true} path="/client-profile" render={(props) => {
					             												return(
							             											<div>
							             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]}/>
							             												<UserClient   {...props} />
							             											</div>
					             												)}
					             											}> </Route>
				                 	<Route exact={true} path="/chat-client" render={(props) => {
				                 												return(
				    		             											<div>
				    		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]}/>
				    		             												<ChatClient   {...props} />
				    		             											</div>
				                 												)}
				                 											}> </Route>         	  											
					             	           											            		
									<Redirect to="/job-offer/" />
								</Switch>
				            </div>
				            )
				            ) : (

				            
				            this.props.user.user_type === 'worker' ? (

				            	this.props.user.approved === 'false' ? (

				                     <Route exact={true} path="/" render={(props) => {
				                     												return(
				        		             											<div>
				        		             												<Unapproved   {...props} />
				        		             											</div>
				                     												)}
				                     											}> </Route>    		

					            ) : (    

					            	 this.props.user.suspended === 'suspended' ? (  

					            	 	<Route exact={true} path="/" render={(props) => {
				                     												return(
				        		             											<div>
				        		             												<Suspended   {...props} />
				        		             											</div>
				                     												)}
				                     											}> </Route>  
				                    ) : (        	

						            <div>
						            	<Switch>   

						            		<Route exact={true} path="/search-job-offer" render={(props) => {
					                 												return(
					    		             											<div>
					    		             												<NavigationBar {...props} activePage={[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]}/>
					    		             												<SearchJobOffer   {...props} />
					    		             											</div>
					                 												)}
					                 											}> </Route>   
						                 	<Route exact={true} path="/view-job-offer" render={(props) => {
						                 												return(
						    		             											<div>
						    		             												<NavigationBar {...props} activePage={[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]}/>
						    		             												<ViewJobOffer   {...props} />
						    		             											</div>
						                 												)}
						                 											}> </Route>  
								            <Route exact={true} path="/on-going-worker" render={(props) => {
						                 												return(
						    		             											<div>
						    		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]}/>
						    		             												<OnGoingWorker   {...props} />
						    		             											</div>
						                 												)}
						                 											}> </Route> 
					    		            <Route exact={true} path="/done-worker" render={(props) => {
					                     												return(
					        		             											<div>
					        		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]}/>
					        		             												<DoneWorker   {...props} />
					        		             											</div>
					                     												)}
					                     											}> </Route>
					                     	<Route exact={true} path="/chat-worker" render={(props) => {
				                 												return(
				    		             											<div>
				    		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]}/>
				    		             												<ChatWorker   {...props} />
				    		             											</div>
				                 												)}
				                 											}> </Route>										              											       											 
			                             	<Route exact={true} path="/worker-profile" render={(props) => {
			                             												return(
			                		             											<div>
			                		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]}/>
			                		             												<UserWorker   {...props} />
			                		             											</div>
			                             												)}
			                             											}> </Route>   
				                            <Redirect to="/search-job-offer/" /> 

				                        	
				                        	    											         											
						            	</Switch>
						            </div>	
						            )	            	

					        	)    	

				            ) : (
				            
					            <div>
					            	<Switch>
					            		<Route exact={true} path="/view-all-clients" render={(props) => {
		                             												return(
		                		             											<div>
		                		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0]}/>
		                		             												<ViewAllClients   {...props} />
		                		             											</div>
		                             												)}
		                             											}> </Route>
							            <Route exact={true} path="/view-all-workers" render={(props) => {
		                             												return(
		                		             											<div>
		                		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]}/>
		                		             												<ViewAllWorkers   {...props} />
		                		             											</div>
		                             												)}
		                             											}> </Route>
							            <Route exact={true} path="/approve-worker" render={(props) => {
		                             												return(
		                		             											<div>
		                		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0]}/>
		                		             												<ApproveWorker   {...props} />
		                		             											</div>
		                             												)}
		                             											}> </Route>                                											         
        					            <Route exact={true} path="/view-reported" render={(props) => {
                                     												return(
                        		             											<div>
                        		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]}/>
                        		             												<ViewReported   {...props} />
                        		             											</div>
                                     												)}
                                     											}> </Route> 
                                     	<Route exact={true} path="/chat-admin" render={(props) => {
                                     												return(
                        		             											<div>
                        		             												<NavigationBar {...props} activePage={[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]}/>
                        		             												<ChatAdmin   {...props} />
                        		             											</div>
                                     												)}
                                     											}> </Route> 										                 											        											
		                             	<Redirect to="/view-all-clients/" />										
					            	</Switch>
					            </div>
				            
				            )
				            )
			          	)
			      	}
				</Router>
			</div>
		);
	}
}

export default App;
