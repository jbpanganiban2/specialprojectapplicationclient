import React, { Component } from 'react';
import { Button, Row, Col, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import DocumentTitle from 'react-document-title';

import { StreamChat } from 'stream-chat';

import * as Api from '../api/client';
import './searchBidIndex.css';
import Ratings from 'react-ratings-declarative';
import ReactPaginate from 'react-paginate';

declare var $: any;

class SearchBid extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortBy: 'title',
      sortUp: true,
      search: '',
      error_search: '',
      data: [],
      atad: [],
      offer: [],
      isShowing: false,
      price:'',
      error_price:'',
      job_id:'',
      worker_id:'',
      code: '',
      stars: [],
      tala: {
        rating: ''
      },

      posted: {
        job_offer_id: '',
        client_id: '',
        worker_id: '',
        title: '',
        description: '',
        start_date: '',
        end_date: ''
      },

      offered: {
        job_offer_id:'',
        client_id:'',
        worker_id:'',
        category:'',
        title:'',
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
      },

      bid: {
        job_id:'',
        title:'',
        bidder_id: '',
        profilepic: '',
        first_name: '',
        last_name: '',
        skills: '',
        rating: '',
        bid_price: '',
        username: '',
      },

      rate: [],

      rating: {
        rating: '',
        review: ''
      },
      iskils: [],

      activePage: 1,
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,


    }

    this.handleSort = this.handleSort.bind(this);
    this.sort = this.sort.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleHire = this.handleHire.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleJobIDChange = this.handleJobIDChange.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleChatCode = this.handleChatCode.bind(this);
    this.toChatClient = this.toChatClient.bind(this);
    this.handleSearchBid = this.handleSearchBid.bind(this);
    this.handleSearchApp = this.handleSearchApp.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleWorker = this.handleWorker.bind(this);

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

  toChatClient(e){
    this.props.history.push('/chat-client/');
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
  //     Api.addBid({
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
    


  componentDidMount(){
    // console.log("CLIENT ID");
    // console.log(this.props.user.client_id);
    // Api.viewPostedJobs(this.props.user.client_id)
    //   .then((result) => {
    //     if(result.status === 200){
    //       this.setState({ data: result.data.data });
    //     }
    //   })
    //   .catch((e) => { console.log(e) 
    //   })

    Api.viewOfferedJobs(this.props.user.client_id)
      .then((result) => {
      //   if(result.status === 200){
      //     this.setState({ offer: result.data.data });
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

    // Api.searchBids()
    //   .then((result) => {
    //     if(result.status === 200){
    //       this.setState({ data: result.data.data });
    //     }
    //   })
    //   .catch((e) => { console.log(e) 
    //   })  
  }
     
    
  handleHire(job_id, bidder_id, bid_price){
    Api.hireWorker({
        job_offer_id: job_id, 
        worker_id: bidder_id, 
        price: bid_price
      })
      .then((result) => {
          window.Materialize.toast("Worker Hired.", 3000, 'green-text');
          // this.props.handleUpdateSession(this.props.user, result.data.data);
          window.setTimeout(function(){window.location.reload()}, 1000);
       })
      .catch((e) => {
          window.Materialize.toast("Failed to hire worker.", 3000, 'red-text');
      });
  }


  handleEdit = async function(id, profilepic, first_name, last_name, skills, username){
    
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

    $('#editModal').modal('open');
  }


  handleSearchBid = async function(job_offer_id){
    // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
    // console.log(job_offer_id);
    Api.searchBids(job_offer_id)
      .then((result) => {
        if(result.status === 200){
          this.setState({ atad: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      })  

    $('#editBid').modal('open');
  }

  handleSearchApp = async function(job_offer_id){
    // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
    // console.log(job_offer_id);
    Api.searchBids(job_offer_id)
      .then((result) => {
        if(result.status === 200){
          this.setState({ atad: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      })  

    $('#editApp').modal('open');
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
    $('#editBid').modal('close');
    $('#editModal').modal('close');
  }


  render() {

    return (
      <DocumentTitle title="SP - Search Bid">
        <div className="mainDiv">
          <CardPanel className="container-panel hoverable">
            <Row>
              <div className="hide-on-small-only"><Input type="search" m={8} placeholder="Search by Title" value={this.state.search} onChange={this.handleSearchChange} icon="search" /></div>
              
            </Row>
            <Row>



                {
                  this.state.search === '' ?
                  (
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
                  )
                  :
                  (
                      null
                  )
                }


              
                <div className="likod">
                {
                  this.state.search === ''?
                    this.state.tableData.map(offered => {
                      return(
                            (
                              offered.worker_id !== 0 ?
                              (
                                 
                                  <CardPanel className="display">
                                  <h6 className="category">{offered.category}</h6>
                                  <Row>
                                     <Col s={9}>
                                       <h5>{offered.title}</h5>
                                     </Col>
                                     <Col s={3}>
                                       <h5>₱ {offered.price}</h5>
                                     </Col>
                                  </Row>

                                  <p className="yo">{offered.description}</p>
                                  
                                  <br/>



                                  <Row>
                                  <Col s={4}>
                                  </Col>
                                  <Col s={4}>
                                     
                                     {
                                       offered.start_date !== '' ?
                                       (

                                         (
                                           <Row>
                                             <Col>
                                               <p className="yo">Start: {offered.start_date}</p>
                                             </Col>
                                             <Col>
                                               <p className="yo">End: {offered.end_date}</p>
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
                                 <Col s={8}>
                                    <Row>

                                      <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }} >
                                         <img class="bilog" alt="user" src={offered.profilepic} style={{ height: "50px", width: "50px", border: "1px solid #03bfcb", padding: "2px", verticalAlign: 'middle' }} />
                                      <span style={{ fontSize: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                                       &nbsp; {offered.first_name} {offered.last_name}</span>
                                        
                                        </div>


                                      <div className="gitna">
                                                <Ratings
                                                rating={offered.rating}
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
                                              {offered.skills.split(', ').map(iskils => {
                                                         return (
                                                          
                                                            <li>{iskils}</li>
                                                          
                                                          ) 
                                                      })}
                                          </ul>
                                          
                                      </div>
                                          

                                    </Row>
                                 </Col>

                                 <Col s={4}>
                                      <Row s={4}>
                                        <br/>
                                        <br/>
                                      </Row>
                                      <Row s={4}>
                                       <Button className="cbtn-new waves-effect waves-light"  onClick={ () => { this.handleEdit(offered.worker_id, offered.profilepic, offered.first_name, offered.last_name, offered.skills, offered.username)} }>
                                        View Full Worker Profile
                                      </Button>
                                      </Row>
                                      <Row s={4}>
                                      </Row>
                                      
                                 </Col>

                                 

                                 </Row>

                                  
                                  </CardPanel>

                              )    
                              : 
                              (
                                
                                  offered.price !== 0?
                                  (
                                     <CardPanel className="display">
                                     
                                     <h6 className="category">{offered.category}</h6>
                                     <Row>
                                        <Col s={9}>
                                          <h5>{offered.title}</h5>
                                        </Col>
                                        <Col s={3}>
                                          <h5>₱ {offered.price}</h5>
                                        </Col>
                                     </Row>


                                     <p className="yo">{offered.description}</p>
                                     
                                     <br/>



                                     <Row>
                                     <Col s={4}>
                                     </Col>
                                     <Col s={4}>
                                        
                                        {
                                          offered.start_date !== '' ?
                                          (

                                            (
                                              <Row>
                                                <Col>
                                                  <p className="yo">Start: {offered.start_date}</p>
                                                </Col>
                                                <Col>
                                                  <p className="yo">End: {offered.end_date}</p>
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
                                    <Col s={4}>
                                    </Col>
                                    <Col s={4}>
                                       <div  className="ya clickable" onClick={ () => { this.handleSearchApp(offered.job_offer_id) } } >
                                          <Button className="vbtn-new waves-effect waves-light"  onClick={ () => { this.handleSearchApp(offered.job_offer_id) } } >
                                           View Applications
                                         </Button>
                                       </div>
                                    </Col>
                                    <Col s={4}>
                                    </Col>
                                    </Row>

                                     
                                     </CardPanel>
                                  )
                                  :
                                  (
                                     <CardPanel className="display">
                                    <h6 className="category">{offered.category}</h6>
                                     <h5>{offered.title}</h5>
                                     <p className="yo">{offered.description}</p>
                                     
                                     <br/>



                                     <Row>
                                     <Col s={4}>
                                     </Col>
                                     <Col s={4}>
                                        
                                        {
                                          offered.start_date !== '' ?
                                          (

                                            (
                                              <Row>
                                                <Col>
                                                  <p className="yo">Start: {offered.start_date}</p>
                                                </Col>
                                                <Col>
                                                  <p className="yo">End: {offered.end_date}</p>
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
                                    <Col s={4}>
                                    </Col>
                                    <Col s={4}>
                                       <div  className="ya clickable" onClick={ () => { this.handleSearchBid(offered.job_offer_id) } } >
                                          <Button className="vbtn-new waves-effect waves-light"  onClick={ () => { this.handleSearchBid(offered.job_offer_id) } } >
                                           View Bids
                                         </Button>
                                       </div>
                                    </Col>
                                    <Col s={4}>
                                    </Col>
                                    </Row>

                                     
                                     </CardPanel>
                                  )

                              )
                           
                        
                            )
                      )
                    })
                  :

                    this.state.data.map(offered => {
                      return(
                      (offered.title.toUpperCase().includes(this.state.search.toUpperCase())) ?
                        (
                            offered.worker_id !== 0 ? 
                            (
                               
                                <CardPanel className="display">
                                <h6 className="category">{offered.category}</h6>
                                <Row>
                                   <Col s={9}>
                                     <h5>{offered.title}</h5>
                                   </Col>
                                   <Col s={3}>
                                     <h5>₱ {offered.price}</h5>
                                   </Col>
                                </Row>

                                <p className="yo">{offered.description}</p>
                                
                                <br/>



                                <Row>
                                <Col s={4}>
                                </Col>
                                <Col s={4}>
                                   
                                   {
                                     offered.start_date !== '' ?
                                     (

                                       (
                                         <Row>
                                           <Col>
                                             <p className="yo">Start: {offered.start_date}</p>
                                           </Col>
                                           <Col>
                                             <p className="yo">End: {offered.end_date}</p>
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
                                <Col s={8}>
                                   <Row>

                                     <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }} >
                                        <img class="bilog" alt="user" src={offered.profilepic} style={{ height: "50px", width: "50px", border: "1px solid #03bfcb", padding: "2px", verticalAlign: 'middle' }} />
                                     <span style={{ fontSize: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                                      &nbsp; {offered.first_name} {offered.last_name}</span>
                                       
                                       </div>


                                     <div className="gitna">
                                               <Ratings
                                               rating={offered.rating}
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
                                             {offered.skills.split(', ').map(iskils => {
                                                        return (
                                                         
                                                           <li>{iskils}</li>
                                                         
                                                         ) 
                                                     })}
                                         </ul>
                                         
                                     </div>
                                         

                                   </Row>
                                </Col>

                                <Col s={4}>
                                     <Row s={4}>
                                       <br/>
                                       <br/>
                                     </Row>
                                     <Row s={4}>
                                      <Button className="cbtn-new waves-effect waves-light"  onClick={ () => { this.handleEdit(offered.worker_id, offered.profilepic, offered.first_name, offered.last_name, offered.skills, offered.username)} }>
                                       View Full Worker Profile
                                     </Button>
                                     </Row>
                                     <Row s={4}>
                                     </Row>
                                     
                                </Col>

                                

                                </Row>
                                

                                
                                </CardPanel>

                            )    
                            : 
                            (
                              
                                 offered.price !== 0?
                                 (
                                    <CardPanel className="display">
                                    
                                    <h6 className="category">{offered.category}</h6>
                                    <Row>
                                       <Col s={9}>
                                         <h5>{offered.title}</h5>
                                       </Col>
                                       <Col s={3}>
                                         <h5>₱ {offered.price}</h5>
                                       </Col>
                                    </Row>
                                    

                                    <p className="yo">{offered.description}</p>
                                    
                                    <br/>



                                    <Row>
                                    <Col s={4}>
                                    </Col>
                                    <Col s={4}>
                                       
                                       {
                                         offered.start_date !== '' ?
                                         (

                                           (
                                             <Row>
                                               <Col>
                                                 <p className="yo">Start: {offered.start_date}</p>
                                               </Col>
                                               <Col>
                                                 <p className="yo">End: {offered.end_date}</p>
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
                                   <Col s={4}>
                                   </Col>
                                   <Col s={4}>
                                      <div  className="ya clickable" onClick={ () => { this.handleSearchApp(offered.job_offer_id) } } >
                                         <Button className="vbtn-new waves-effect waves-light"  onClick={ () => { this.handleSearchApp(offered.job_offer_id) } } >
                                          View Applications
                                        </Button>
                                      </div>
                                   </Col>
                                   <Col s={4}>
                                   </Col>
                                   </Row>

                                    
                                    </CardPanel>
                                 )
                                 :
                                 (
                                    <CardPanel className="display">
                                    <h6 className="category">{offered.category}</h6>
                                    <h5>{offered.title}</h5>
                                    <p className="yo">{offered.description}</p>
                                    
                                    <br/>



                                    <Row>
                                    <Col s={4}>
                                    </Col>
                                    <Col s={4}>
                                       
                                       {
                                         offered.start_date !== '' ?
                                         (

                                           (
                                             <Row>
                                               <Col>
                                                 <p className="yo">Start: {offered.start_date}</p>
                                               </Col>
                                               <Col>
                                                 <p className="yo">End: {offered.end_date}</p>
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
                                   <Col s={4}>
                                   </Col>
                                   <Col s={4}>
                                      <div  className="ya clickable" onClick={ () => { this.handleSearchBid(offered.job_offer_id) } } >
                                         <Button className="vbtn-new waves-effect waves-light"  onClick={ () => { this.handleSearchBid(offered.job_offer_id) } } >
                                          View Bids
                                        </Button>
                                      </div>
                                   </Col>
                                   <Col s={4}>
                                   </Col>
                                   </Row>

                                    
                                    </CardPanel>
                                 )

                            )
                        )
                      :
                        null
                      )

                    })


                }


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
                  
                 </div>
            </Row>


          </CardPanel>
          

          <Modal id="editBid" >

                <div className="likod">
              
                  {
                    
                      this.state.atad.map(bid => {
                        return(
                            <CardPanel className="displaybid">
                           <Row>
                              <Col s={4}>
                                
                              </Col>
                              <Col s={4}>
                                <h5>₱ {bid.bid_price}</h5>
                              </Col>
                              <Col s={4}>
                              </Col>
                           </Row>
                            
                            <br/>


                            <Row>
                            <Col s={7}>
                               <Row>

                                 <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }} >
                                    <img class="bilog" alt="user" src={bid.profilepic} style={{ height: "50px", width: "50px", border: "1px solid #03bfcb", padding: "2px", verticalAlign: 'middle' }} />
                                 <span style={{ fontSize: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                                  &nbsp; {bid.first_name} {bid.last_name}</span>
                                   
                                   </div>


                                 <div className="gitna">
                                           <Ratings
                                           rating={bid.rating}
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
                                         {bid.skills.split(', ').map(iskils => {
                                                    return (
                                                     
                                                       <li>{iskils}</li>
                                                     
                                                     ) 
                                                 })}
                                     </ul>
                                     
                                 </div>
                                     

                               </Row>
                            </Col>

                            <Col s={5}>
                                 <Row>
                                 <br/>
                                 </Row>
                                 
                                 <Row s={4}>
                                  <Button className="cbtn-new waves-effect waves-light"  onClick={ () => { this.handleEdit(bid.bidder_id, bid.profilepic, bid.first_name, bid.last_name, bid.skills, bid.username)} }>
                                   Full Profile
                                 </Button>
                                 </Row>
                                 <Row s={4}>
                                  <Button className="cbtn-new waves-effect waves-light"  onClick={ () => { this.handleHire(bid.job_id, bid.bidder_id, bid.bid_price)} } >
                                      Hire Worker
                                    </Button>
                                  
                                 </Row>
                                 
                            </Col>

                            

                            </Row>



                           


                           <Row>
                           <Col s={3}>
                           </Col>
                           <Col s={6}>
                             
                           </Col>
                           <Col s={3}>
                           </Col>
                           </Row>
                           
                            
                            </CardPanel>
                        )
                      })
                    
                  }
                </div>
                    

          </Modal>


          <Modal id="editApp" >

                <div className="likod">
              
                  {
                    
                      this.state.atad.map(bid => {
                        return(
                            <CardPanel className="display">
                              
                              <Row>
                              <Col s={7}>
                                 <Row>

                                   <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }} >
                                      <img class="bilog" alt="user" src={bid.profilepic} style={{ height: "50px", width: "50px", border: "1px solid #03bfcb", padding: "2px", verticalAlign: 'middle' }} />
                                   <span style={{ fontSize: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                                    &nbsp; {bid.first_name} {bid.last_name}</span>
                                     
                                     </div>


                                   <div className="gitna">
                                             <Ratings
                                             rating={bid.rating}
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
                                           {bid.skills.split(', ').map(iskils => {
                                                      return (
                                                       
                                                         <li>{iskils}</li>
                                                       
                                                       ) 
                                                   })}
                                       </ul>
                                       
                                   </div>
                                       

                                 </Row>
                              </Col>

                              <Col s={5}>
                                   <Row>
                                   <br/>
                                   </Row>
                                   
                                   <Row s={4}>
                                    <Button className="cbtn-new waves-effect waves-light"  onClick={ () => { this.handleEdit(bid.bidder_id, bid.profilepic, bid.first_name, bid.last_name, bid.skills, bid.username)} }>
                                     Full Profile
                                   </Button>
                                   </Row>
                                   <Row s={4}>
                                    <Button className="cbtn-new waves-effect waves-light"  onClick={ () => { this.handleHire(bid.job_id, bid.bidder_id, bid.bid_price)} } >
                                        Hire Worker
                                      </Button>
                                    
                                   </Row>
                                   
                              </Col>

                              

                              </Row>
                           
                            
                            </CardPanel>
                        )
                      })
                    
                  }
                </div>
                    

          </Modal>


          <Modal id="editCode">
            <ul>Enter chat code and worker username in the chat to contact worker.</ul>
            <ul>Chat code:</ul>
            <h1>{this.props.user.username}-{this.state.code} </h1>
            <ul>Worker username:</ul>
            <h1>{this.state.code} </h1>
          </Modal>

          <Modal id="editModal" class="all">
            
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

export default SearchBid;
