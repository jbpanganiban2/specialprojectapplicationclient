import React, { Component, PureComponent } from 'react';
import { Button, Row, Col, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import DocumentTitle from 'react-document-title';
import ReactPaginate from 'react-paginate';
import { StreamChat } from 'stream-chat';
import './searchJobOfferIndex.css';

import * as Api from '../api/worker';
import * as Api2 from '../api/client';
import Ratings from 'react-ratings-declarative';

declare var $: any;

class SearchJobOffer extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortBy: 'price',
      sortUp: true,
      search: '',
      criteria: 'title',
      category: 'education',
      error_search: '',
      data: [],
      isShowing: false,
      price:'',
      error_price:'',
      job_id:'',
      worker_id:'',
      stars: [],
      tala: {
        rating: ''
      },

      activePage: 1,
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
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
        job_id: '',
        bidder_id: '',
        bid_price: '' 
      },

      rate: [],

      rating: {
        rating: '',
        review: ''
      },

      categories: [],
      kategorya: {
        description: ''
      },

      taya: [],

      bead: [],

      beadprice: {
        job_id: '',
        bidder_id: '',
        bid_price: '',
        job_offer_id: ''
      }


    }

    this.handleSort = this.handleSort.bind(this);
    this.sort = this.sort.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBid = this.handleBid.bind(this);
    this.handleTaya = this.handleTaya.bind(this);
    // this.handleBidDone = this.handleBidDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleJobIDChange = this.handleJobIDChange.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
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
    this.setState({ activePage: 1 });
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

  handleCriteriaChange(e) {
    this.setState({ criteria: e.target.value })
  }

  handleCategoryChange(e) {
    this.setState({ category: e.target.value })
    console.log("CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT");
    console.log(this.state.category);
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

  handleApply(job_id, price) {
    // this.setState({price: price});
    Api.addBid({
        job_id: job_id,
        bidder_id: this.props.user.worker_id,
        bid_price: parseInt(price)
      })
       .then((result) => {
          window.Materialize.toast("Application successful.", 3000, 'green-text');
          // this.props.handleUpdateSession(this.props.user, result.data.data);
          window.setTimeout(function(){window.location.reload()}, 1000);
       })
      .catch((e) => {
          window.Materialize.toast("Application failed.", 3000, 'red-text');
      });
  }


  loadMoreData() {
    const data = this.state.orgtableData;
    
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData:slice
    })
  
  }

  


  handleSubmit(e) {
    var error = false;
    var focus = false;
    e.preventDefault();
    this.setState({ 
      error_price: ''
    });

    if(this.state.price === '') {
        this.setState({ error_price: 'Required' });
        error = true;
        if (!focus) { $("#price").focus(); focus = true; }
      } else {
      var pattern = /^[0-9]/;
      var didMatch = this.state.price.match( pattern );
      if(!didMatch){
        this.setState({ error_price: 'Invalid bid' });
        error = true ;
        if (!focus) { $("#price").focus(); focus = true; }
      }
     }
    
    if(!error){
      Api.addBid({
          job_id: this.state.job_id,
          bidder_id: this.props.user.worker_id,
          bid_price: parseInt(this.state.price)
        })
         .then((result) => {
            window.Materialize.toast("Bid successful.", 3000, 'green-text');
            // this.props.handleUpdateSession(this.props.user, result.data.data);
            window.setTimeout(function(){window.location.reload()}, 1000);
         })
        .catch((e) => {
            window.Materialize.toast("Failed to add bid.", 3000, 'red-text');
        });
    } else {
      window.Materialize.toast("Invalid or incomplete information.", 3000, 'red-text');
    }
  }
    


  componentDidMount(){
    const chatClient = new StreamChat("c9mjnrm3srny");
    // const userToken = chatClient.createToken(this.props.user.username);

    chatClient.setUser(
        {
            id: this.props.user.username,
            name: this.props.user.first_name + ' ' + this.props.user.last_name,
            image: this.props.user.profilepic
        },
        this.props.user.token,
    );
    
    Api.searchAllJobOffers(this.props.user.worker_id)
      .then((result) => {

        var tdata = result.data.data;
        var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)

        if(result.status === 200){
          this.setState({ 
            data: result.data.data,
            pageCount: Math.ceil(tdata.length / this.state.perPage),
            orgtableData : tdata,
            tableData:slice 
          });
          console.log(this.state.data);
        }
      })
      .catch((e) => { console.log(e) 
      })

    Api2.viewCategory()
      .then((result) => {
        if(result.status === 200){
          this.setState({ categories: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      }) 

    Api.viewBead(this.props.user.worker_id)
      .then((result) => {
        if(result.status === 200){
          this.setState({ bead: result.data.data });
          console.log(this.state.bead);
          // console.log("HEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEE");
          // console.log(this.state.taya);
        }
      })
      .catch((e) => { 
        // console.log(e)
        // this.setState({ taya: null }); 
      })    
  }
     
    
  handleBid = async function (job_offer_id){
    // console.log(joboffer)
    await this.setState({job_id: job_offer_id});

    // await Api.viewBid(job_offer_id, this.props.user.worker_id)
    //   .then((result) => {
    //     if(result.status === 200){
    //       this.setState({ taya: result.data.data[0].bid_price});
    //       console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    //       console.log(result.data.data);
    //       console.log(result.data.data[0]);
    //     }
    //   })
    //   .catch((e) => { console.log(e) 
    //     console.log("HAHAHAHAHAAHAH");
    //   })

    //   console.log("TAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAA");
    //   console.log(this.state.taya);



      // if(this.state.taya === ''){

        $('#editBid').modal('open');
      // }
      // else{
      //   $('#editDib').modal('open');
      // }
  }


  handleTaya = async function (job_id, bidder_id){
    await Api.viewBid(job_id, bidder_id)
      .then((result) => {
        if(result.status === 200){
          this.setState({ taya: result.data.data[0].bid_price });
          // console.log("HEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEE");
          // console.log(this.state.taya);
        }
      })
      .catch((e) => { 
        // console.log(e)
        this.setState({ taya: null }); 
      })
    // console.log(joboffer)
    // this.setState({taya: joboffer});
    // $('#editBid').modal('open');
  }
  


  handleDesc = async function(desc){
    await this.setState({description: desc});
    $('#editDesc').modal('open');
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



  render() {

    return (
      <DocumentTitle title="SP - Search Job Offer">
        <div className="mainDiv">
          <CardPanel className="container-panel hoverable">
            {
              this.state.criteria !== 'category' ?
              (
                  <Row>
                    <Row>
                    <div className="hide-on-small-only"><Input type="search" m={8} placeholder={"Search by " + this.state.criteria} value={this.state.search} onChange={this.handleSearchChange} icon="search" /></div>
                    <Input s={6} m={3} id="criteria" label="Criteria" onKeyUp={this.handleKeyUp} onChange={this.handleCriteriaChange} type="select" defaultValue="last_name">
                      <option value="title">Title</option>
                      <option value="category">Category</option>
                    </Input>  
                  </Row>
                  </Row>
                  )
                  :
                  (

                  <Row>
                    <Row>
                    <Input className="cat"  m={8} label="Category" onKeyUp={this.handleKeyUp} onChange={this.handleCategoryChange} error={this.state.error_category?this.state.error_category: null} type="select" >
                      {
                        this.state.categories.map(kategorya => {
                          return(
                            <option value={kategorya.description}>{kategorya.description}</option>
                          )
                        })
                      }
                    </Input>
                    <Input s={6} m={3} id="criteria" label="Criteria" onKeyUp={this.handleKeyUp} onChange={this.handleCriteriaChange} type="select" defaultValue="last_name">
                      <option value="title">Title</option>
                      <option value="category">Category</option>
                    </Input>  
                  </Row>
                  </Row>
                  )
            }

            {
              this.state.search === '' && this.state.criteria === 'title'?
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

            <br/>
            <br/>



            <div className="likod">
            
                {
                  this.state.search === '' && this.state.criteria === 'title'?
                    this.state.tableData.map(joboffer => {
                      return(
                              joboffer.price !== 0 ?
                              (
                                      
                                      joboffer.bid_price !== null ?
                                      (


                                              

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
                                                    <Col s={4}>
                                                        <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                            View Full Profile
                                                          </Button> 
                                                    </Col>
                                                    <Col s={4}>
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

                                                    </Col>
                                                    <Col s={4}>
                                                        <h6>Application Sent</h6>
                                                    </Col>

                                               </Row>


                                               
                                              
                                              
                                               
                                               </CardPanel>

                                      )
                                      :
                                      (


                                              

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
                                                    <Col s={4}>
                                                        <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                            View Full Profile
                                                          </Button> 
                                                    </Col>
                                                    <Col s={4}>
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

                                                    </Col>
                                                    <Col s={4}>
                                                        <Button className="sjobtn-new waves-effect waves-light" onClick={ () => { this.handleApply(joboffer.job_offer_id, joboffer.price)} } >
                                                            Apply
                                                          </Button>
                                                    </Col>

                                               </Row>


                                               
                                              
                                              
                                               
                                               </CardPanel>

                                      )


                              )
                              :
                              (
                                    
                                  


                                      joboffer.bid_price !== null ?
                                      (


                                            <CardPanel className="display">
                                            <h6 className="category">{joboffer.category}</h6>
                                            <h5>{joboffer.title}</h5>
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
                                            <Col s={4}>
                                            </Col>
                                            </Row>




                                            <Row>
                                                 <Col s={4}>
                                                     <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                         View Full Profile
                                                       </Button> 
                                                 </Col>
                                                 <Col s={4}>
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

                                                 </Col>
                                                 <Col s={4}>
                                                     <h6>Bid Submitted: ₱ {joboffer.bid_price}</h6>
                                                 </Col>

                                            </Row>





                                            </CardPanel>

                                            
                                      )
                                      :
                                      (
                                            

                                                  <CardPanel className="display">
                                                  <h6 className="category">{joboffer.category}</h6>
                                                  <h5>{joboffer.title}</h5>
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
                                                  <Col s={4}>
                                                  </Col>
                                                  </Row>




                                                  <Row>
                                                       <Col s={4}>
                                                           <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                               View Full Profile
                                                             </Button> 
                                                       </Col>
                                                       <Col s={4}>
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

                                                       </Col>
                                                       <Col s={4}>
                                                           <Button className="sjobtn-new waves-effect waves-light" onClick={ () => { this.handleBid(joboffer.job_offer_id)} } >
                                                        Bid
                                                      </Button>
                                                       </Col>

                                                  </Row>

                                                  
                                                  
                                                  
                                                  
                                                  </CardPanel>
                                                  


                                      )


                                                    
                                            
                                           
                                       
                                       
                              

                              )

                           

                            )
                    })
                  : 

                  

                      this.state.data.map((joboffer) => {
                        this.state.worker_id = this.props.user.worker_id
                        return(
                            
                            this.state.criteria === 'title' ?
                            (
                                (joboffer.title.toUpperCase().includes(this.state.search.toUpperCase())) ?
                                  (
                                    joboffer.price !== 0 ?
                                    (
                                    

                                            joboffer.bid_price !== null ?
                                            (

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
                                                               <Col s={4}>
                                                                   <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                                       View Full Profile
                                                                     </Button> 
                                                               </Col>
                                                               <Col s={4}>
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

                                                               </Col>
                                                               <Col s={4}>
                                                                   <h6>Application Sent</h6>
                                                               </Col>

                                                          </Row>
                                                     
                                                      
                                                      </CardPanel>

                                            )
                                            :
                                            (

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
                                                               <Col s={4}>
                                                                   <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                                       View Full Profile
                                                                     </Button> 
                                                               </Col>
                                                               <Col s={4}>
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

                                                               </Col>
                                                               <Col s={4}>
                                                                   <Button className="sjobtn-new waves-effect waves-light" onClick={ () => { this.handleApply(joboffer.job_offer_id, joboffer.price)} } >
                                                                       Apply
                                                                     </Button>
                                                               </Col>

                                                          </Row>
                                                     
                                                      
                                                      </CardPanel>

                                            )


                                    )
                                    :
                                    (
                                    
                                            joboffer.bid_price !== null ?
                                            (

                                                  <CardPanel className="display">
                                                  <h6 className="category">{joboffer.category}</h6>
                                                  <h5>{joboffer.title}</h5>
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
                                                  <Col s={4}>
                                                  </Col>
                                                  </Row>

                                                  
                                                  
                                                  <Row>
                                                           <Col s={4}>
                                                               <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                                   View Full Profile
                                                                 </Button> 
                                                           </Col>
                                                           <Col s={4}>
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

                                                           </Col>
                                                           <Col s={4}>
                                                              <h6>Bid Submitted: ₱ {joboffer.bid_price}</h6>
                                                               
                                                           </Col>

                                                      </Row>
                                                  
                                                  
                                                  </CardPanel>

                                            )
                                            :
                                            (

                                                    <CardPanel className="display">
                                                    <h6 className="category">{joboffer.category}</h6>
                                                    <h5>{joboffer.title}</h5>
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
                                                    <Col s={4}>
                                                    </Col>
                                                    </Row>

                                                    
                                                    
                                                    <Row>
                                                             <Col s={4}>
                                                                 <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                                     View Full Profile
                                                                   </Button> 
                                                             </Col>
                                                             <Col s={4}>
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

                                                             </Col>
                                                             <Col s={4}>
                                                                 <Button className="sjobtn-new waves-effect waves-light" onClick={ () => { this.handleBid(joboffer.job_offer_id)} } >
                                                                     Bid
                                                                </Button>
                                                             </Col>

                                                        </Row>
                                                    
                                                    
                                                    </CardPanel>

                                            )


                                    )
                                  )
                                :
                                 null
                            )
                            :
                            (
                                this.state.criteria === 'category' ?

                                

                                (
                                  

                                  joboffer.category === this.state.category ?
                                    (
                                      joboffer.price !== 0 ?
                                      (

                                              joboffer.bid_price !== null ?
                                              (

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
                                                                 <Col s={4}>
                                                                     <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                                         View Full Profile
                                                                       </Button> 
                                                                 </Col>
                                                                 <Col s={4}>
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

                                                                 </Col>
                                                                 <Col s={4}>
                                                                     <h6>Application Sent</h6>
                                                                 </Col>

                                                            </Row>
                                                       
                                                        
                                                        </CardPanel>

                                              )
                                              :
                                              (

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
                                                                  <Col s={4}>
                                                                      <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                                          View Full Profile
                                                                        </Button> 
                                                                  </Col>
                                                                  <Col s={4}>
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

                                                                  </Col>
                                                                  <Col s={4}>
                                                                      <Button className="sjobtn-new waves-effect waves-light" onClick={ () => { this.handleApply(joboffer.job_offer_id, joboffer.price)} } >
                                                                          Apply
                                                                        </Button>
                                                                  </Col>

                                                             </Row>
                                                        
                                                         
                                                         </CardPanel> 

                                              )

                                      )
                                      :
                                      (
                                      
                                              joboffer.bid_price !== null ?
                                              (

                                                      <CardPanel className="display">
                                                      <h6 className="category">{joboffer.category}</h6>
                                                      <h5>{joboffer.title}</h5>
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
                                                      <Col s={4}>
                                                      </Col>
                                                      </Row>

                                                      
                                                      
                                                      <Row>
                                                               <Col s={4}>
                                                                   <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                                       View Full Profile
                                                                     </Button> 
                                                               </Col>
                                                               <Col s={4}>
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

                                                               </Col>
                                                               <Col s={4}>
                                                                   <h6>Bid Submitted: ₱ {joboffer.bid_price}</h6>
                                                               </Col>

                                                          </Row>
                                                      
                                                      
                                                      </CardPanel>

                                              )
                                              :
                                              (

                                                      <CardPanel className="display">
                                                      <h6 className="category">{joboffer.category}</h6>
                                                      <h5>{joboffer.title}</h5>
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
                                                      <Col s={4}>
                                                      </Col>
                                                      </Row>

                                                      
                                                      
                                                      <Row>
                                                               <Col s={4}>
                                                                   <Button className="ogwcbtn-new waves-effect waves-light" onClick={ () => { this.handleEdit(joboffer.client_id, joboffer.profilepic, joboffer.first_name, joboffer.last_name)} } >
                                                                       View Full Profile
                                                                     </Button> 
                                                               </Col>
                                                               <Col s={4}>
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

                                                               </Col>
                                                               <Col s={4}>
                                                                   <Button className="sjobtn-new waves-effect waves-light" onClick={ () => { this.handleBid(joboffer.job_offer_id)} } >
                                                                Bid
                                                              </Button>
                                                               </Col>

                                                          </Row>
                                                      
                                                      
                                                      </CardPanel>

                                              )

                                      )
                                    )
                                  :
                                  (
                                   null
                                  ) 

                                ):(null)


                            )

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
          </CardPanel>
          <Modal id="editBid">
            
             <Input type="number" s={12} m={6} id=" price" label="Price" onKeyUp={this.handleKeyUp} onChange={this.handlePriceChange} error={this.state.error_price?this.state.error_price: null} />
              <br/>

             <Col s={12}>
              <Button className="btn-new waves-effect waves-light" onClick={this.handleSubmit}>
                 Bid
               </Button>
             </Col>
          
          </Modal>

          <Modal id="editDib">
            
             <h5>Submitted Bid: {this.state.taya}</h5>
          
          </Modal>


          <Modal id="editDesc">
            
             <CardPanel>

              <ul>Description: {this.state.description} </ul>

             </CardPanel>
          
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
        </div>
      </DocumentTitle>
    );
  }
  
}

export default SearchJobOffer;
