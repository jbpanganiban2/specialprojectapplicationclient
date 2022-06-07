import React, { Component, PureComponent } from 'react';
import { Button, Row, Col, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import DocumentTitle from 'react-document-title';
import ReactPaginate from 'react-paginate';
import './viewAllWorkersIndex.css';
import Ratings from 'react-ratings-declarative';

import * as Api from '../api/admin';

// var ReactDOM = require('react-dom');
// var DataTable = require('react-data-components').DataTable;

import ReactDOM from "react-dom";
// import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
// import "bootstrap/less/bootstrap.less"

declare var $: any;

// var columns = [
//   { title: 'First Name', prop: 'first_name'  },
//   { title: 'Last Name', prop: 'last_name'  },
//   { title: 'Age', prop: 'age' },
//   { title: 'Sex', prop: 'sex' },
//   { title: 'Email', prop: 'email' },
//   { title: 'Skills', prop: 'skills' },
//   { title: 'Rating', prop: 'rating' }
// ];

class ViewAllWorkers extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortBy: 'title',
      sortUp: true,
      search: '',
      criteria: '',
      error_search: '',
      data: [],
      isShowing: false,
      price:'',
      error_price:'',
      job_id:'',
      worker_id:'',
      
      activePage: 1,
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,


      workers: {
        worker_id: '',
        profilepic: '',
        first_name: '',
        last_name: '',
        age: '',
        sex: '',
        email: '',
        skills: '',
        rating: ''
         
      },

      iskils: []

    }

    // this.handleSort = this.handleSort.bind(this);
    // this.sort = this.sort.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleJobIDChange = this.handleJobIDChange.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

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

  handleCriteriaChange(e) {
    this.setState({ criteria: e.target.value })
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
    Api.viewAllWorkerProfile()
      .then((result) => {
        console.log(result);

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
     
    

  

  handleEdit = (joboffer) => {
    // console.log(joboffer)
    this.setState({job_id: joboffer});
    $('#editModal').modal('open');
  }

  render() {

    return (
      <DocumentTitle title="SP - View All Workers">
        <div className="mainDiv">
          <CardPanel className="vaccontainer-panel hoverable">
            <Row>
              <div className="hide-on-small-only"><Input type="search" m={8} placeholder="Search" value={this.state.search} onChange={this.handleSearchChange} icon="search" /></div>
              <Input s={6} m={3} id="criteria" label="Criteria" onKeyUp={this.handleKeyUp} onChange={this.handleCriteriaChange} type="select" defaultValue="last_name">
                <option value="last_name">Last Name</option>
                <option value="first_name">First Name</option>
                <option value="skills">Skills</option>
              </Input>        
            </Row>
            <Row>
              
                {
                  this.state.search === ''?
                    this.state.tableData.map((workers, i) => {
                      return(
                        <div className="vachey">

                          
                            <div class="vaccardcontainer">
                                
                                <img
                                    class="round"
                                    src={workers.profilepic}
                                    alt="user"
                                    width="100" height="100"
                                />
                                <h5>{workers.first_name + ' ' + workers.last_name}</h5>
                               
                                      
                                    <br/>
                                      <p>{workers.sex}</p>
                                    <br/>
                                      <p>{workers.email}</p>
                                    <br/>
                                      <p>{workers.address}</p>
                                    <br/>
                                                
                                                  <Ratings
                                                  rating={workers.rating}
                                                  widgetDimensions="20px"
                                                >
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                 
                                              </Ratings>

                                  <div class="skills">
                                      <h6>Skills</h6>
                                      <ul>
                                          {workers.skills.split(', ').map(iskils => {
                                                     return (
                                                      
                                                        <li>{iskils}</li>
                                                      
                                                      ) 
                                                  })}
                                      </ul>
                                      
                                  </div>
                                      
                            </div>
                          
                        </div>
                      )
                    })
                  : 

                  this.state.data.map((workers) => {
                    this.state.worker_id = this.props.user.worker_id
                    return(

                      this.state.criteria === 'first_name' ?
                      (
                        (workers.first_name.toUpperCase().includes(this.state.search.toUpperCase())) ?
                          
                          (
                            <div className="vachey">

                          
                            <div class="vaccardcontainer">
                                
                                <img
                                    class="round"
                                    src={workers.profilepic}
                                    alt="user"
                                    width="100" height="100"
                                />
                                <h5>{workers.first_name + ' ' + workers.last_name}</h5>
                               
                                   
                                    <br/>
                                      <p>{workers.sex}</p>
                                    <br/>
                                      <p>{workers.email}</p>
                                    <br/>
                                      <p>{workers.address}</p>
                                    <br/>
                                                
                                                  <Ratings
                                                  rating={workers.rating}
                                                  widgetDimensions="20px"
                                                >
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                 
                                              </Ratings>
                                  <div class="skills">
                                      <h6>Skills</h6>
                                      <ul>
                                          {workers.skills.split(', ').map(iskils => {
                                                     return (
                                                      
                                                        <li>{iskils}</li>
                                                      
                                                      ) 
                                                  })}
                                      </ul>
                                      
                                  </div>            
                                      
                            </div>
                          
                        </div>
                          )
                        :
                         null

                      ) : (

                        this.state.criteria === 'skills' ?

                        (

                          (workers.skills.toUpperCase().includes(this.state.search.toUpperCase())) ?
                            
                            (
                              <div className="vachey">

                          
                            <div class="vaccardcontainer">
                                
                                <img
                                    class="round"
                                    src={workers.profilepic}
                                    alt="user"
                                    width="100" height="100"
                                />
                                <h5>{workers.first_name + ' ' + workers.last_name}</h5>
                               
                                     
                                    <br/>
                                      <p>{workers.sex}</p>
                                    <br/>
                                      <p>{workers.email}</p>
                                    <br/>
                                      <p>{workers.address}</p>
                                    <br/>
                                                
                                                  <Ratings
                                                  rating={workers.rating}
                                                  widgetDimensions="20px"
                                                >
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                 
                                              </Ratings>
                                  <div class="skills">
                                      <h6>Skills</h6>
                                      <ul>
                                          {workers.skills.split(', ').map(iskils => {
                                                     return (
                                                      
                                                        <li>{iskils}</li>
                                                      
                                                      ) 
                                                  })}
                                      </ul>
                                      
                                  </div>            
                                      
                            </div>
                          
                        </div>
                            )
                          :
                           null


                        ): (

                        (workers.last_name.toUpperCase().includes(this.state.search.toUpperCase())) ?
                          
                          (
                            <div className="vachey">

                          
                            <div class="vaccardcontainer">
                                
                                <img
                                    class="round"
                                    src={workers.profilepic}
                                    alt="user"
                                    width="100" height="100"
                                />
                                <h5>{workers.first_name + ' ' + workers.last_name}</h5>
                               
                                     
                                    <br/>
                                      <p>{workers.sex}</p>
                                    <br/>
                                      <p>{workers.email}</p>
                                    <br/>
                                      <p>{workers.address}</p>
                                    <br/>
                                                
                                                  <Ratings
                                                  rating={workers.rating}
                                                  widgetDimensions="20px"
                                                >
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                 
                                              </Ratings>
                                  <div class="skills">
                                      <h6>Skills</h6>
                                      <ul>
                                          {workers.skills.split(', ').map(iskils => {
                                                     return (
                                                      
                                                        <li>{iskils}</li>
                                                      
                                                      ) 
                                                  })}
                                      </ul>
                                      
                                  </div>            
                                      
                            </div>
                          
                        </div>
                          )
                        :
                         null

                        ) 

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

            </Row>
          </CardPanel>
          <Modal id="editModal">
            
             <Input s={12} m={6} id=" price" label="Price" onKeyUp={this.handleKeyUp} onChange={this.handlePriceChange} error={this.state.error_price?this.state.error_price: null} />
              

             <Col s={12}>
              <Button className="btn-new waves-effect waves-light" onClick={this.handleSubmit}>
                 Bid
               </Button>
             </Col>
          
          </Modal>
        </div>
      </DocumentTitle>
    );
  }
  
}

export default ViewAllWorkers;
