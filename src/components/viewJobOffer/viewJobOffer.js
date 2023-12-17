import React, { Component } from 'react';
import { Button, Row, Col, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import DocumentTitle from 'react-document-title';

import * as Api from '../api/worker';
import * as Api2 from '../api/client';
import Ratings from 'react-ratings-declarative';
import ReactPaginate from 'react-paginate';

import { StreamChat } from 'stream-chat';

import './viewJobOfferIndex.css';

declare var $: any;

class ViewJobOffer extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortBy: 'price',
      sortUp: true,
      search: '',
      error_search: '',
      data: [],
      isShowing: false,
      price:'',
      error_price:'',
      job_id:'',
      worker_id:'',
      client_id:'',
      first_name:'',
      last_name:'',
      age:'',
      code: '',
      stars: [],
      tala: {
        rating: ''
      },

      activePage: 1,
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,

      joboffer: {
        job_offer_id: '',
        client_id: '',
        title: '',
        description: '',
        category: '',
        start_date: '',
        end_date: '',
        price: '',
        profilepic:'',
        first_name: '', 
        last_name: '', 
        rating: '', 
        age: '',
        username: '', 
      },

      rate: [],

      rating: {
        rating: '',
        review: ''
      }

    }

    this.handleSort = this.handleSort.bind(this);
    this.sort = this.sort.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleJobIDChange = this.handleJobIDChange.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleChatCode = this.handleChatCode.bind(this);
    this.toChatWorker = this.toChatWorker.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

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

 sort(){
    const temp = this;
    this.setState({
      tableData: (this.state.sortBy === 'price' ? (this.state.data.slice(0).sort(function(a,b) {return (a.price > b.price) ? (temp.state.sortUp ? 1 : -1) : ((b.price > a.price) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
               : (this.state.sortBy === 'client_rating' ? (this.state.data.slice(0).sort(function(a,b) {return (a.rating > b.rating) ? (temp.state.sortUp ? 1 : -1) : ((b.rating > a.rating) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
               : (this.state.sortBy === 'category' ? (this.state.data.slice(0).sort(function(a,b) {return (a.category > b.category) ? (temp.state.sortUp ? 1 : -1) : ((b.category > a.category) ? (temp.state.sortUp ? -1 : 1) : 0);} ))
               : null )))
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

  handleSearchChange(e) {
    this.setState({ search: e.target.value })
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

  toChatWorker(e){
    this.props.history.push('/chat-worker/');
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  handlePageClick(e) {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

  };


  loadMoreData() {
    const data = this.state.orgtableData;
    
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData:slice
    })
  
  }
  


  // handleSubmit(e) {
  //   var error = false;
  //   var focus = false;
  //   e.preventDefault();
  //   this.setState({ 
  //     error_price: ''
  //   });

  //   if(this.state.price === '') {
  //     this.setState({ error_price: 'Required' });
  //     error = true;
  //     if (!focus) { $("#price").focus(); focus = true; }
  //   }
    
  //   if(!error){
  //     Api.ViewJobOffer({
  //         job_id: this.state.job_id,
  //         bidder_id: this.props.user.worker_id,
  //         bid_price: parseInt(this.state.price)
  //       })
  //        .then((result) => {
  //           window.Materialize.toast("Bid successful.", 3000, 'green-text');
  //           // this.props.handleUpdateSession(this.props.user, result.data.data);
  //        })
  //       .catch((e) => {
  //           window.Materialize.toast("Failed to add bid.", 3000, 'red-text');
  //       });
  //   } else {
  //     window.Materialize.toast("Invalid or incomplete information.", 3000, 'red-text');
  //   }
  // }


  handleAccept(joboffer) {  
    Api.acceptOffer({
        job_offer_id: joboffer
      })
       .then((result) => {
          window.Materialize.toast("Offer Accepted.", 3000, 'green-text');
          // this.props.handleUpdateSession(this.props.user, result.data.data);
          window.setTimeout(function(){window.location.reload()}, 1000);
       })
      .catch((e) => {
          window.Materialize.toast("Failed to accept offer.", 3000, 'red-text');
      }); 
  }

  handleReject(joboffer) {  
    Api.rejectOffer({
        job_offer_id: joboffer
      })
       .then((result) => {
          window.Materialize.toast("Offer Rejected.", 3000, 'green-text');
          // this.props.handleUpdateSession(this.props.user, result.data.data);
          window.setTimeout(function(){window.location.reload()}, 1000);
       })
      .catch((e) => {
          window.Materialize.toast("Failed to reject offer.", 3000, 'red-text');
      }); 
  }

  handleRating(client_id) {
    Api.viewRating(client_id)
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
    


  componentDidMount(){
    Api.viewJobOffer(this.props.user.worker_id)
      .then((result) => {
      //   console.log(result);
      //   if(result.status === 200){
      //     this.setState({ data: result.data.data });
      //   }
      // })
        var tdata = result.data.data;
        var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)

        if(result.status === 200){
          this.setState({ 
            data: result.data.data,
            pageCount: Math.ceil(tdata.length / this.state.perPage),
            orgtableData : tdata,
            tableData:slice 
          });
        }
      })
      .catch((e) => { console.log(e) 
      })

  }
   

  handleEdit = async function(id, profilepic, first_name, last_name, username){
    await this.setState({client_id: id, profilepic: profilepic, first_name: first_name, last_name: last_name, username: username});
    await this.handleRating(this.state.client_id);

    await Api2.getClientRating(id)
      .then((result) => {
        if(result.status === 200){
          this.setState({ stars: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      })
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





  render() {

    return (
      <DocumentTitle title="SP - View Job Offer">
        <div className="mainDiv">
          <CardPanel className="container-panel hoverable">
              
              
                  <Row>
                      <Col s={4}>
                          <div>
                          <Button className="ogwcbtn-new waves-effect waves-light" onClick={() => this.handleSort('price')} >
                              Sort by Price
                          </Button>
                          {
                            this.state.sortBy !== 'price'?
                              null
                            :
                              this.state.sortUp?
                                <Icon className="sorter">arrow_drop_up</Icon>
                              :
                                <Icon className="sorter">arrow_drop_down</Icon>
                          } 
                          </div>
                      </Col>
                      <Col s={4}>
                          <div>
                          <Button className="ogwcbtn-new waves-effect waves-light" onClick={() => this.handleSort('client_rating')} >
                              Sort by Client Rating
                          </Button>
                          {
                            this.state.sortBy !== 'client_rating'?
                              null
                            :
                              this.state.sortUp?
                                <Icon className="sorter">arrow_drop_up</Icon>
                              :
                                <Icon className="sorter">arrow_drop_down</Icon>
                          }
                          </div>
                      </Col>
                      <Col s={4}>
                          <div>
                          <Button className="ogwcbtn-new waves-effect waves-light" onClick={() => this.handleSort('category')} >
                              Sort by Category
                          </Button>
                          {
                            this.state.sortBy !== 'category'?
                              null
                            :
                              this.state.sortUp?
                                <Icon className="sorter">arrow_drop_up</Icon>
                              :
                                <Icon className="sorter">arrow_drop_down</Icon>
                          }
                          </div>
                      </Col>
                  </Row>
              

              <div className="likod">
                  {
                    this.state.tableData.map(joboffer => {
                      return(
                         <CardPanel className="display">
                         <h6 className="category">{joboffer.category}</h6>

                         <Row>
                           <Col s={9}>
                             <h5>{joboffer.title}</h5>
                           </Col>
                           <Col s={3}>
                             <h5>₱ {joboffer.price}</h5>
                           </Col>
                        </Row>

                         <p className="yo">{joboffer.description}</p>
                         
                         <br/>



                         <Row>
                         <Col s={4}>
                         </Col>
                         <Col s={4}>
                            
                            {
                              joboffer.start_date !== '' ?
                              (

                                (
                                  <Row>
                                    <Col>
                                      <p className="yo">Start: {joboffer.start_date}</p>
                                    </Col>
                                    <Col>
                                      <p className="yo">End: {joboffer.end_date}</p>
                                    </Col>
                                  </Row>
                                  
                                )
                                
                              )
                              :
                              
                                <p>Open Date</p>
                            }
                         </Col>
                         <br/>
                         <br/>
                         <Col s={4}>
                         </Col>
                         </Row>



                         <Row>
                                  
                                  <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }} >
                                     <img class="bilog" alt="user" src={joboffer.profilepic} style={{ height: "50px", width: "50px", border: "1px solid #03bfcb", padding: "2px", verticalAlign: 'middle' }} />
                                  <span style={{ fontSize: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                                   &nbsp; {joboffer.first_name} {joboffer.last_name}</span>
                                    
                                    </div>


                                  <div className="gitna">
                                            <Ratings
                                            rating={joboffer.rating}
                                            widgetDimensions="20px"
                                          >
                                            <Ratings.Widget widgetRatedColor="yellow" />
                                            <Ratings.Widget widgetRatedColor="yellow" />
                                            <Ratings.Widget widgetRatedColor="yellow" />
                                            <Ratings.Widget widgetRatedColor="yellow" />
                                            <Ratings.Widget widgetRatedColor="yellow" />
                                           
                                        </Ratings>
                                  </div>

                                  

                             </Row>



                         
                         <Row>
                         <Col s={4}>
                             <Button className="virebtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                View Full Profile
                              </Button>
                         </Col>
                         <Col s={4}>
                            <Button className="vrcbtn-new waves-effect waves-light" onClick={ () => { this.handleAccept(joboffer.job_offer_id)} } >
                                Accept Offer
                              </Button>                          
                         </Col>
                         <Col s={4}>
                            <Button className="vrsbtn-new waves-effect waves-light" onClick={ () => { this.handleReject(joboffer.job_offer_id)} } >
                                Reject Offer
                              </Button>
                         </Col>
                         </Row>
                        
                        
                        
                         
                         </CardPanel>
                      )
                    })
                  }  
              </div> 
              <div className="paginate clickable">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
                </div>
          </CardPanel>
          <Modal id="editModal">

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
                      <button class="primary" clickable onClick={ () => { this.handleChatCode(this.state.username), this.toChatWorker()} } >
                          Message
                      </button>
                  </div>

                 
                  
              </div>
            </div>
            
             

            <CardPanel className="bidpanel">
                <div className = "reviewcontainerbid">

                  <div class="thebody2bid">
                  <div class="ratingbody1bid">

                <div className="card-containerreviewbid">
                  
                   <h4>Reviews: </h4>
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

          <Modal id="editDesc">
            
             <CardPanel>

              <ul>Description: {this.state.description} </ul>

             </CardPanel>
          
          </Modal>
          <Modal id="editCode">
            <ul>Enter chat code and client username in the chat to contact client.</ul>
            <ul>Chat code:</ul>
            <h1>{this.state.code}-{this.props.user.username} </h1>
            <ul>Client username:</ul>
            <h1>{this.state.code} </h1>
          </Modal>
        </div>
      </DocumentTitle>
    );
  }
  
}

export default ViewJobOffer;
