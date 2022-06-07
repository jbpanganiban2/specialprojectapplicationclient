import React, { Component, PureComponent } from 'react';
import { Button, Row, Col, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import DocumentTitle from 'react-document-title';
import ReactPaginate from 'react-paginate';
import { StreamChat } from 'stream-chat';
import './viewAllClientsIndex.css';
import Ratings from 'react-ratings-declarative';

import * as Api from '../api/admin';

declare var $: any;

class ViewAllClients extends Component {
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

      clients: {
        client_id: '',
        first_name: '',
        last_name: '',
        age: '',
        sex: '',
        email: '',
        rating: ''
         
      }

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
    const chatClient = new StreamChat("2q5sjjwwhm5j");
    // const userToken = chatClient.createToken(this.props.user.username);

    chatClient.setUser(
        {
            id: this.props.user.username,
            name: this.props.user.first_name + ' ' + this.props.user.last_name,
            image: this.props.user.profilepic
        },
        this.props.user.token,
    );
    console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY");                    
    console.log(this.props.user.token);          
    
    Api.viewAllClientProfile()
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
      <DocumentTitle title="SP - View All Clients">
        <div className="mainDiv">
          <CardPanel className="vaccontainer-panel hoverable">
            <Row>
              <div className="hide-on-small-only"><Input type="search" m={8} placeholder="Search" value={this.state.search} onChange={this.handleSearchChange} icon="search" /></div>
              <Input s={6} m={3} id="criteria" label="Criteria" onKeyUp={this.handleKeyUp} onChange={this.handleCriteriaChange} type="select" defaultValue="last_name">
                <option value="last_name">Last Name</option>
                <option value="first_name">First Name</option>
              </Input>    
            </Row>
            <Row>
              
                {
                  this.state.search === ''?
                    this.state.tableData.map((clients, i) => {
                      return(
                        

                        <div className="vachey">

                          
                            <div class="vaccardcontainer">
                                
                                <img
                                    class="round"
                                    src={clients.profilepic}
                                    alt="user"
                                    width="100" height="100"
                                />
                                <h5>{clients.first_name + ' ' + clients.last_name}</h5>
                               
                                    <br/>
                                      <p>{clients.sex}</p>
                                    <br/>
                                      <p>{clients.email}</p>
                                    <br/>
                                      <p>{clients.address}</p>
                                    <br/>
                                                
                                                  <Ratings
                                                  rating={clients.rating}
                                                  widgetDimensions="20px"
                                                >
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                 
                                              </Ratings>
                                      
                            </div>
                          
                        </div>


                      )
                    })
                  : 

                  this.state.data.map((clients) => {
                    this.state.client_id = this.props.user.client_id
                    return(

                      this.state.criteria === 'first_name' ?
                      (
                        (clients.first_name.toUpperCase().includes(this.state.search.toUpperCase())) ?
                          
                          (
                            <div className="vachey">

                          
                            <div class="vaccardcontainer">
                                
                                <img
                                    class="round"
                                    src={clients.profilepic}
                                    alt="user"
                                    width="100" height="100"
                                />
                                <h5>{clients.first_name + ' ' + clients.last_name}</h5>
                               
                                    <br/>
                                      <p>{clients.sex}</p>
                                    <br/>
                                      <p>{clients.email}</p>
                                    <br/>
                                      <p>{clients.address}</p>
                                    <br/>
                                                
                                                  <Ratings
                                                  rating={clients.rating}
                                                  widgetDimensions="20px"
                                                >
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                 
                                              </Ratings>
                                      
                            </div>
                          
                        </div>
                          )
                        :
                         null

                      ) : (
                      (clients.last_name.toUpperCase().includes(this.state.search.toUpperCase())) ?
                        (
                          <div className="vachey">

                          
                            <div class="vaccardcontainer">
                                
                                <img
                                    class="round"
                                    src={clients.profilepic}
                                    alt="user"
                                    width="100" height="100"
                                />
                                <h5>{clients.first_name + ' ' + clients.last_name}</h5>
                               
                                      
                                    <br/>
                                      <p>{clients.sex}</p>
                                    <br/>
                                      <p>{clients.email}</p>
                                    <br/>
                                      <p>{clients.address}</p>
                                    <br/>
                                                
                                                  <Ratings
                                                  rating={clients.rating}
                                                  widgetDimensions="20px"
                                                >
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                  <Ratings.Widget widgetRatedColor="yellow" />
                                                 
                                              </Ratings>
                                      
                            </div>
                          
                        </div>
                        )
                      :
                       null
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

export default ViewAllClients;
