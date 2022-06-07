import React, { Component } from 'react';
import { Button, Row, Col, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import DocumentTitle from 'react-document-title';
import Ratings from 'react-ratings-declarative';

import * as Api from '../api/client';
import * as Api2 from '../api/worker';
import './doneClientIndex.css';

import { StreamChat } from 'stream-chat';

declare var $: any;

class DoneClient extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortBy: 'title',
      sortUp: true,
      search: '',
      error_search: '',
      data: [],
      isShowing: false,
      reason: '',
      error_reason: '',
      job_offer_id: '',
      worker_id: '',
      rating: 0,
      error_rating: '',
      review: '',
      error_review: '',

      info: {
        job_offer_id: '',
        worker_id: '',
        category: '',
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        price: '',
        client_rated: '',
        client_reported: '',
        worker_rated: '',
        worker_reported: '',
        profilepic: '',
        first_name: '',
        last_name: '',
        skills: '',
        rating: '',
        username: '',
      },
      reasons: [],
      dahilan: {
        description: ''
      },

      stars: [],
      tala: {
        rating: ''
      },

      rate: [],

      donerating: {
        rating: '',
        review: ''
      },

      iskils: []

    }

    // this.handleSort = this.handleSort.bind(this);
    // this.sort = this.sort.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleRated = this.handleRated.bind(this);
    this.handleReported = this.handleReported.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleJobIDChange = this.handleJobIDChange.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.toChatClient = this.toChatClient.bind(this);
    this.handleChatCode = this.handleChatCode.bind(this);
    this.handleWorker = this.handleWorker.bind(this);
    this.handleRating = this.handleRating.bind(this);
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

  handleRatingChange(newRating) {
    this.setState({ rating: newRating })
  }

  handleReviewChange(e) {
    this.setState({ review: e.target.value })
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

  handleChatCode = async function(username){
    const chatClient = new StreamChat("2q5sjjwwhm5j");
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


  handleSend(e) {
    var error = false;
    var focus = false;
    e.preventDefault();
    this.setState({
      error_rating: '',
      error_review: ''
    });

    if(this.state.rating === '') {
      this.setState({ error_rating: 'Required' });
      error = true;
      if (!focus) { $("#rating").focus(); focus = true; }
    }

    if(this.state.review === '') {
      this.setState({ error_review: 'Required' });
      error = true;
      if (!focus) { $("#review").focus(); focus = true; }
    }
    
    if(!error){
      Api.addWorkerRating({
          client_id: this.props.user.client_id,
          worker_id: this.state.worker_id,
          rating: this.state.rating,
          review: this.state.review
        })
         .then((result) => {
            window.Materialize.toast("Rating successful.", 3000, 'green-text');
            // this.props.handleUpdateSession(this.props.user, result.data.data);
            Api.clientRated({
              job_offer_id: this.state.job_offer_id
            })
            window.setTimeout(function(){window.location.reload()}, 1000);
         })
        .catch((e) => {
            window.Materialize.toast("Failed to rate worker.", 3000, 'red-text');
        });
    } else {
      window.Materialize.toast("Invalid or incomplete information.", 3000, 'red-text');
    }
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

    


  componentDidMount(){
    Api.doneClient(this.props.user.client_id)
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
     
    
  
  

  handleEdit = (worker_id, job_offer_id) => {
    this.setState({worker_id: worker_id, job_offer_id: job_offer_id});
    $('#editModal').modal('open');
  }

  handleRate = (worker_id, job_offer_id, client_rated) => {
    console.log(client_rated);
    if(client_rated === "true"){
      window.Materialize.toast("You have already rated the worker.", 3000, 'red-text');
    }
    else{
      this.setState({
        worker_id: worker_id,
        job_offer_id: job_offer_id

      });
      $('#changeModal').modal('open');
    }
  }

  handleRated(){
      window.Materialize.toast("You have already rated the worker.", 3000, 'red-text'); 
  }

  handleReported(){
      window.Materialize.toast("You have already reported the worker.", 3000, 'red-text'); 
  }

  handleDesc = async function(desc){
    await this.setState({description: desc});
    $('#editDesc').modal('open');
  }


  render() {

    return (
      <DocumentTitle title="SP - Done Client">
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

                            <br/>
                          <Row>

                            <Col s={4}>
                              <Row> 
                                    <Button className="cbtn-new waves-effect waves-light"  onClick={ () => { this.handleWorker(info.worker_id, info.profilepic, info.first_name, info.last_name, info.skills, info.username)} } >
                                    View Profile
                                  </Button> 
                              </Row> 
                              <Row> 

                                  <Button className="cbtn-new waves-effect waves-light" onClick={ () => { this.handleChatCode(info.username), this.toChatClient()} } >
                                    Chat
                                  </Button> 
                              </Row>
                            </Col>
                            <Col s={4}>

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
                             <Col s={4}>  
                              <Row> 
                                  {
                                    info.client_rated === 'true' ?
                                    (
                                      
                                          <Button className="vbtn-new waves-effect waves-light" onClick={ () => {this.handleRated()} } >
                                             Worker Already Rated
                                           </Button>
                                      
                                    )
                                    :
                                    (
                                      
                                          <Button className="vbtn-new waves-effect waves-light" onClick={ () => {this.handleRate(info.worker_id, info.job_offer_id, info.client_rated)} } >
                                             Rate
                                           </Button>
                                      
                                   )
                                  }
                              </Row> 
                              <Row> 
                                  {
                                    info.client_reported === 'true' ?
                                    (
                                      
                                          <Button className="vbtn-new waves-effect waves-light" onClick={ () => {this.handleReported()} } >
                                             Worker Already Reported
                                           </Button>
                                      
                                    )
                                    :
                                    (
                                      
                                        <Button className="vbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(info.worker_id, info.job_offer_id)} } >
                                         Report
                                        </Button>
                                      
                                   )
                                  }
                              </Row> 
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
          <Modal id="changeModal">
            
            
              <h5>Rate worker: </h5>
              <Ratings
                rating={this.state.rating}
                widgetDimensions="20px"
                widgetRatedColors="yellow"
                changeRating={this.handleRatingChange}
              >
                <Ratings.Widget widgetRatedColor="yellow" />
                <Ratings.Widget widgetRatedColor="yellow" />
                <Ratings.Widget widgetRatedColor="yellow" />
                <Ratings.Widget widgetRatedColor="yellow" />
                <Ratings.Widget widgetRatedColor="yellow" />

                 
              </Ratings>
              <br/>
              <br/>
              <h5>Write your review: </h5>
             <Input s={12} m={12} id="review" label="Review" type="textarea" onKeyUp={this.handleKeyUp} onChange={this.handleReviewChange} placeholder={this.state.review} value={this.state.review} error={this.state.error_review?this.state.error_review: null} />
                        
             <br/>
             <br/>
             <Col s={6}>
              <Button className="btn-new waves-effect waves-light" onClick={this.handleSend}>
                 Send
               </Button>
             </Col>
          
          </Modal>
          <Modal id="editDesc">
            
             <CardPanel>

              <ul>Description: {this.state.description} </ul>

             </CardPanel>
          
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
                     this.state.rate.map(donerating => {
                       return(
                         <CardPanel className="review">
                            
                            
                            
                            

                             
                             <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }} >
                                <img class="round" alt="user" src={donerating.profpic} style={{ height: "50px", width: "50px", border: "1px solid #03bfcb", padding: "2px", verticalAlign: 'middle' }} />
                             <span style={{ fontSize: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                              &nbsp; {donerating.fname} {donerating.lname}</span>
                               
                               </div>
                           
                            <br/>
                             {
                             this.state.stars.map(tala => {
                                   return(
                                     
                                       <Ratings
                                      rating={donerating.rating}
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
                             <p style={{whiteSpace:"pre-line"}}>{donerating.review}</p>
                             
                         
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

export default DoneClient;
