import React, { Component } from 'react';
import { Button, Row, Col, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import DocumentTitle from 'react-document-title';

import * as Api from '../api/client';
import * as Api2 from '../api/worker';
import './onGoingClientIndex.css';
import Ratings from 'react-ratings-declarative';

import { StreamChat } from 'stream-chat';

declare var $: any;

class OnGoingClient extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortBy: 'title',
      sortUp: true,
      search: '',
      error_search: '',
      data: [],
      reasons: [],
      isShowing: false,
      reason: '',
      error_reason: '',
      job_offer_id: '',
      worker_id: '',
      code: '',

      stars: [],
      tala: {
        rating: ''
      },

      rate: [],

      rating: {
        rating: '',
        review: ''
      },

      info: {
        job_offer_id: '',
        worker_id: '',
        category: '',
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        price: '',
        profilepic: '',
        first_name: '',
        last_name: '',
        skills: '',
        rating: '',
        username: '',
        client_reported: ''
      },

      dahilan: {
        description: ''
      },
      iskils: []

    }

    // this.handleSort = this.handleSort.bind(this);
    // this.sort = this.sort.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleWorker = this.handleWorker.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleJobIDChange = this.handleJobIDChange.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleChatCode = this.handleChatCode.bind(this);
    this.toChatClient = this.toChatClient.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleReported = this.handleReported.bind(this);
  }

  
  // handleKeyUp(e) {
  //   if(e.keyCode === 13){
  //     this.handleSubmit(e);
  //   }
  // }

 // handleSort(sortBy){
 //  if(this.state.sortBy === sortBy){
 //    this.setState({ sortUp: !this.state.sortUp }, () => { this.sort() });
 //  } else {
 //    this.setState({ sortBy: sortBy }, () => { this.sort() });
 //  }
 // }

  handleSearchChange(e) {
    this.setState({ search: e.target.value })
  }

  handleReasonChange(e) {
    this.setState({ reason: e.target.value })
  }

  handleKeyUp(e) {
    if(e.keyCode === 13){
      this.handleSubmit(e);
    }
  }

  handlePriceChange(e) {
    this.setState({ price: e.target.value })
  }

  handleJobIDChange(e) {
    this.setState({ job_id: e.target.value })
  }

  handleWorkerIDChange(e) {
    this.setState({ worker_id: e.target.value })
  }

  toChatClient(e){
    this.props.history.push('/chat-client/');
  }

  handleRating(worker_id) {
    Api.viewReview(worker_id)
      .then((result) => {
        console.log(result);
        console.log("HAHAHAHAHAHAHAHAHA");
        if(result.status === 200){
          this.setState({ rate: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      })
  }

  handleReported(){
      window.Materialize.toast("You have already reported the worker.", 3000, 'red-text'); 
  }


  handleSubmit(e) {
    var error = false;
    var focus = false;
    e.preventDefault();
    this.setState({
      error_reason: ''
    });

    if(this.state.reason === '') {
      this.setState({ error_reason: 'Required' });
      error = true;
      if (!focus) { $("#reason").focus(); focus = true; }
    }
    
    if(!error){
      Api.reportWorker({
          client_id: this.props.user.client_id,
          worker_id: this.state.worker_id,
          reason: this.state.reason
        })
         .then((result) => {
            window.Materialize.toast("Report successful.", 3000, 'green-text');
            // this.props.handleUpdateSession(this.props.user, result.data.data);
            Api.clientReported({
              job_offer_id: this.state.job_offer_id
            })
            window.setTimeout(function(){window.location.reload()}, 1000);
         })
        .catch((e) => {
            window.Materialize.toast("Failed to report.", 3000, 'red-text');
        });
    } else {
      window.Materialize.toast("Invalid or incomplete information.", 3000, 'red-text');
    }
  }
    


  componentDidMount(){
    Api.onGoingClient(this.props.user.client_id)
      .then((result) => {
        if(result.status === 200){
          this.setState({ data: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      })
    Api2.viewReasons()
      .then((result) => {
        if(result.status === 200){
          this.setState({ reasons: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      })   
      
  }
     
    
  handleComplete(job_id){
    Api.completeJob({
        job_offer_id: job_id
      })
      .then((result) => {
          window.Materialize.toast("Job Completed.", 3000, 'green-text');
          // this.props.handleUpdateSession(this.props.user, result.data.data);
          window.setTimeout(function(){window.location.reload()}, 1000);
       })
      .catch((e) => {
          window.Materialize.toast("Failed to complete job.", 3000, 'red-text');
      });
  }

  

  handleEdit = (worker_id, job_offer_id) => {
    this.setState({worker_id: worker_id, job_offer_id: job_offer_id});
    $('#editModal').modal('open');
  }

  handleDesc = async function(desc){
    await this.setState({description: desc});
    $('#editDesc').modal('open');
  }

  handleChatCode = async function(username){
    const chatClient = new StreamChat("c9mjnrm3srny");
    chatClient.setUser(
        {
            id: this.props.user.username,
            name: this.props.user.first_name + ' ' + this.props.user.last_name
        },
        this.props.user.token,
    );
    console.log("CONNECTIIIIIIIIIIIIIIIIIIING...");
    const conversation = chatClient.channel('messaging', {
        members: [this.props.user.username, username],
    });
    console.log(this.props.user.username);
    console.log(this.props.user.token);
    console.log(username);
    console.log("CONNECTEEEEEEEEEEEEEEEEEEEEEED");

    await conversation.create();

    // await this.setState({code: username});
    // $('#editCode').modal('open');
  }


  handleWorker = async function(id, profilepic, first_name, last_name, skills, username){
    
    await this.setState({iskils: skills.split(', ')})
    // console.log("IIIIIIIIIIIIIIIIITTTTTTTTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    // console.log(this.state.iskils);
    // var i = this.state.iskils.length;
    await this.setState({worker_id: id, profilepic: profilepic, first_name: first_name, last_name: last_name, skills: skills, username: username});
    await this.handleRating(this.state.worker_id);
    
    await Api.getWorkerRating(id)
      .then((result) => {
        if(result.status === 200){
          this.setState({ stars: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      })
      await console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      await console.log(this.state.stars);

    $('#workerModal').modal('open');
  }




  render() {

    return (
      <DocumentTitle title="SP - On Going Client">
        <div className="mainDiv">
          <CardPanel className="container-panel hoverable">
            
            <div className="likod">
                {
                  
                    this.state.data.map(info => {
                      return(
                        
                           <CardPanel className="display">
                           

                           <Row>
                              <Col s={7}>
                                <h5>{info.title}</h5>
                              </Col>
                              <Col s={5}>
                                <h5>Agreed Price: ₱ {info.price}</h5>
                              </Col>
                           </Row>

                           <p className="yo">{info.description}</p>
                           
                           <br/>



                           <Row>
                           <Col s={4}>
                           </Col>
                           <Col s={4}>
                              
                              {
                                info.start_date !== '' ?
                                (

                                  (
                                    <Row>
                                      <Col>
                                        <p className="yo">Start: {info.start_date}</p>
                                      </Col>
                                      <Col>
                                        <p className="yo">End: {info.end_date}</p>
                                      </Col>
                                    </Row>
                                    
                                  )
                                  
                                )
                                :
                                
                                  <p>Open Date</p>
                              }
                           </Col>
                           <Col s={4}>
                           </Col>
                           </Row>

                            <Row>
                              <Col s= {7}>
                              <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }} >
                                 <img class="bilog" alt="user" src={info.profilepic} style={{ height: "50px", width: "50px", border: "1px solid #03bfcb", padding: "2px", verticalAlign: 'middle' }} />
                              <span style={{ fontSize: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                               &nbsp; {info.first_name} {info.last_name}</span>
                                
                                </div>


                              <div className="gitna">
                                        <Ratings
                                        rating={info.rating}
                                        widgetDimensions="20px"
                                      >
                                        <Ratings.Widget widgetRatedColor="yellow" />
                                        <Ratings.Widget widgetRatedColor="yellow" />
                                        <Ratings.Widget widgetRatedColor="yellow" />
                                        <Ratings.Widget widgetRatedColor="yellow" />
                                        <Ratings.Widget widgetRatedColor="yellow" />
                                       
                                    </Ratings>
                              </div>


                              <div class="skillsdown">
                                  <h6>Skills</h6>
                                  <ul>
                                      {info.skills.split(', ').map(iskils => {
                                                 return (
                                                  
                                                    <li>{iskils}</li>
                                                  
                                                  ) 
                                              })}
                                  </ul>
                                  
                              </div>
                              </Col>

                              <Col s = {5}>


                                  <Row s={4}>
                                    <br/>
                                     <Button className="cbtn-new waves-effect waves-light"  onClick={ () => { this.handleWorker(info.worker_id, info.profilepic, info.first_name, info.last_name, info.skills, info.username)} } >
                                         View Full Profile
                                       </Button>
                                  </Row>
                                  <Row s={4}>
                                     <Button className="cbtn-new waves-effect waves-light" onClick={ () => { this.handleChatCode(info.username), this.toChatClient()} } >
                                         Chat
                                       </Button>                          
                                  </Row>
                                  

                                  {
                                    info.client_reported === 'true' ?
                                    (
                                      <Row s={4}>
                                          <Button className="vbtn-new waves-effect waves-light" onClick={ () => {this.handleReported()} } >
                                             Worker Already Reported
                                           </Button>
                                      </Row>
                                    )
                                    :
                                    (
                                      <Row s={4}>
                                        <Button className="vbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(info.worker_id, info.job_offer_id)} } >
                                         Report
                                        </Button>
                                      </Row>
                                   )
                                  }

                              </Col>
                                  

                            </Row>
                           
                           
                           
                          <br/>
                            <Row>
                            <Col s={4}>
                            </Col>
                            <Col s={5}>
                              <Button className="vrcbtn-new waves-effect waves-light"  onClick={ () => { this.handleComplete(info.job_offer_id)} } >
                                   Complete Job
                                 </Button>
                               
                            </Col>
                            <Col s={4}>
                            </Col>
                            </Row>
                          
                           
                           </CardPanel>

                      )
                    })
                }
                  
             </div>   
          </CardPanel>



          <Modal id="editModal">
            
            <Input s={12} m={6} label="Reason" onKeyUp={this.handleKeyUp} onChange={this.handleReasonChange} type="select" >
              {
                this.state.reasons.map(dahilan => {
                  return(
                    <option value={dahilan.description}>{dahilan.description}</option>
                  )
                })
              }

                

             </Input>

              <br/>
              <br/>

             <Col s={12}>
              <Button className="btn-new waves-effect waves-light" onClick={this.handleSubmit}>
                 Report
               </Button>
             </Col>
          
          </Modal>

          <Modal id="editDesc">
            
             <CardPanel>

              <ul>Description: {this.state.description} </ul>

             </CardPanel>
          
          </Modal>

          <Modal id="editCode">
            <ul>Enter chat code and worker username in the chat to contact worker.</ul>
            <ul>Chat code:</ul>
            <h1>{this.props.user.username}-{this.state.code} </h1>
            <ul>Worker username:</ul>
            <h1>{this.state.code} </h1>
          </Modal>

          <Modal id="workerModal" class="all">
            
              <div class="thebody">
                <div class="card-container">
                    
                    <img
                        class="round"
                        src={this.state.profilepic}
                        alt="user"
                        width="150" height="150"
                    />
                    <h5>{this.state.first_name + ' ' + this.state.last_name}</h5>

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
                    <div class="buttons">
                        <button class="primary" clickable onClick={ () => { this.handleChatCode(this.state.username), this.toChatClient()} } >
                            Message
                        </button>
                    </div>

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
                    
                </div>
              </div>


                <CardPanel className="bidpanel">
                <div className = "reviewcontainerbid">

                  <div class="thebody2bid">
                  <div class="ratingbody1bid">

                <div className="card-containerreviewbid">
                  
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
                             <p style={{whiteSpace:"pre-line"}}>{rating.review}</p>
                             
                         
                         </CardPanel>
                       )
                     })
                   }

                  
                </div>  
                </div>
                </div>
                
                </div>
                </CardPanel>

          
          </Modal>
        </div>
      </DocumentTitle>
    );
  }
  
}

export default OnGoingClient;
