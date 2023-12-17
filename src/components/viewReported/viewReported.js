import React, { Component } from 'react';
import { Button, Row, Col, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, CardPanel } from 'react-materialize';
import DocumentTitle from 'react-document-title';
import './viewReportedIndex.css';
import ReactPaginate from 'react-paginate';

import { StreamChat } from 'stream-chat';

import * as Api from '../api/admin';

declare var $: any;

class ViewReported extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortBy: 'title',
      sortUp: true,
      search: '',
      error_search: '',
      data: [],
      atad: [],
      isShowing: false,
      reason: '',
      error_reason: '',
      job_offer_id: '',
      worker_id: '',
      activePage: 1,
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,

      info: {
        profilepic: '',
        first_name: '',
        last_name: '',
        client_id: '',
        worker_id: '',
        user_type: '',
        reason: '',
        suspended: '',
        username: '',
        uname: '',
        email: ''
      },

      reporter: {
        first_name: '',
        last_name: '',
        client_id: '',
        worker_id: '',
        user_type: '',
        reason: '',
        suspended: '',
        username: '',
        fname: '',
        lname: '',
        uname: ''
      }

    }

    // this.handleSort = this.handleSort.bind(this);
    // this.sort = this.sort.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleBan = this.handleBan.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleJobIDChange = this.handleJobIDChange.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleSuspend = this.handleSuspend.bind(this);
    this.handleUnsuspend = this.handleUnsuspend.bind(this);
    this.handleChatCode = this.handleChatCode.bind(this);
    this.handleChatBoth = this.handleChatBoth.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.toChatAdmin = this.toChatAdmin.bind(this);
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

  toChatAdmin(e){
    this.props.history.push('/chat-admin/');
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
  //     error_reason: ''
  //   });

  //   if(this.state.reason === '') {
  //     this.setState({ error_reason: 'Required' });
  //     error = true;
  //     if (!focus) { $("#reason").focus(); focus = true; }
  //   }
    
  //   if(!error){
  //     Api.reportWorker({
  //         client_id: this.props.user.client_id,
  //         worker_id: this.state.worker_id,
  //         reason: this.state.reason
  //       })
  //        .then((result) => {
  //           window.Materialize.toast("Report successful.", 3000, 'green-text');
  //           // this.props.handleUpdateSession(this.props.user, result.data.data);
  //        })
  //       .catch((e) => {
  //           window.Materialize.toast("Failed to report.", 3000, 'red-text');
  //       });
  //   } else {
  //     window.Materialize.toast("Invalid or incomplete information.", 3000, 'red-text');
  //   }
  // }
    


  componentDidMount(){
    Api.viewDistinctReported()
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
       
      //   if(result.status === 200){
      //     this.setState({ data: result.data.data });
      //   }
      // })
      .catch((e) => { console.log(e) 
      })
  }
     
    
  handleRemove(user_type, client_id, worker_id){
    if(user_type == 'client'){
      Api.removeClient({
          client_id: client_id
        })
        .then((result) => {
            window.Materialize.toast("User Deleted.", 3000, 'green-text');
            // this.props.handleUpdateSession(this.props.user, result.data.data);
            window.setTimeout(function(){window.location.reload()}, 1000);
         })
        .catch((e) => {
            window.Materialize.toast("Failed to delete user.", 3000, 'red-text');
        });
    }else{
      Api.removeWorker({
          worker_id: worker_id
        })
        .then((result) => {
            window.Materialize.toast("User Deleted.", 3000, 'green-text');
            // this.props.handleUpdateSession(this.props.user, result.data.data);
            window.setTimeout(function(){window.location.reload()}, 1000);
         })
        .catch((e) => {
            window.Materialize.toast("Failed to delete user.", 3000, 'red-text');
        });
    }    
  }



  handleBan(email, user_type, client_id, worker_id){
    if(user_type == 'client'){
      console.log(email);
      Api.addBan({
          email: email,
          client_id: client_id

        })
        .then((result) => {
            window.Materialize.toast("Email Banned.", 3000, 'green-text');
            // this.props.handleUpdateSession(this.props.user, result.data.data);
            window.setTimeout(function(){window.location.reload()}, 1000);
         })
        .catch((e) => {
            var error = e.toString().split(' ');
            // console.log("ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR!");
            console.log(error);
            error = parseInt(error[error.length - 1], 10);

            // window.Materialize.toast("Failed to ban email.", 3000, 'red-text');
            if(error === 408){
              this.setState({ error_email: 'Email already banned' });
              window.Materialize.toast('Email already banned.', 3000, 'red-text');
            } 
            else {
              window.Materialize.toast('An error occurred.', 3000, 'red-text');
            }
        });
    }else{
      Api.addBan({
          email: email,
          worker_id: worker_id
        })
        .then((result) => {
            window.Materialize.toast("Email Banned.", 3000, 'green-text');
            // this.props.handleUpdateSession(this.props.user, result.data.data);
            window.setTimeout(function(){window.location.reload()}, 1000);
         })
        .catch((e) => {
            var error = e.toString().split(' ');
            // console.log("ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR!");
            console.log(error);
            error = parseInt(error[error.length - 1], 10);

            // window.Materialize.toast("Failed to ban email.", 3000, 'red-text');
            if(error === 408){
              this.setState({ error_email: 'Email already banned' });
              window.Materialize.toast('Email already banned.', 3000, 'red-text');
            } 
            else {
              window.Materialize.toast('An error occurred.', 3000, 'red-text');
            }
        });

    }

  }



  handleSuspend(user_type, client_id, worker_id, suspended){
    if(user_type == 'client'){
      if(suspended == 'suspended'){  
          
          window.Materialize.toast("User Already Suspended.", 3000, 'red-text');

          }else{
            Api.suspendClient({
            client_id: client_id
          })
          .then((result) => {
              window.Materialize.toast("User Suspended.", 3000, 'green-text');
              // this.props.handleUpdateSession(this.props.user, result.data.data);
              window.setTimeout(function(){window.location.reload()}, 1000);
           })
          .catch((e) => {
              window.Materialize.toast("Failed to suspend user.", 3000, 'red-text');
          });
          
          }
          
    }else{
      if(suspended == 'suspended'){ 
          window.Materialize.toast("User Already Suspended.", 3000, 'red-text');
       }else{ 
        Api.suspendWorker({
            worker_id: worker_id
          })
          .then((result) => {
              window.Materialize.toast("User Suspended.", 3000, 'green-text');
              // this.props.handleUpdateSession(this.props.user, result.data.data);
              window.setTimeout(function(){window.location.reload()}, 1000);
           })
          .catch((e) => {
              window.Materialize.toast("Failed to suspend user.", 3000, 'red-text');
          });
        }  
    }    
  }



  handleUnsuspend(user_type, client_id, worker_id, suspended){
    if(user_type == 'client'){
      if(suspended == 'active'){
        window.Materialize.toast("User is Active.", 3000, 'red-text');
      }else{
        Api.unsuspendClient({
            client_id: client_id
          })
          .then((result) => {
              window.Materialize.toast("User Unsuspended.", 3000, 'green-text');
              // this.props.handleUpdateSession(this.props.user, result.data.data);
              window.setTimeout(function(){window.location.reload()}, 1000);
           })
          .catch((e) => {
              window.Materialize.toast("Failed to unsuspend user.", 3000, 'red-text');
          });
        }  
      
    }else{
      if(suspended == 'active'){
        window.Materialize.toast("User is Active.", 3000, 'red-text');
      }else{
        Api.unsuspendWorker({
            worker_id: worker_id
          })
          .then((result) => {
              window.Materialize.toast("User Unsuspended.", 3000, 'green-text');
              // this.props.handleUpdateSession(this.props.user, result.data.data);
              window.setTimeout(function(){window.location.reload()}, 1000);
           })
          .catch((e) => {
              window.Materialize.toast("Failed to unsuspend user.", 3000, 'red-text');
          });
      }    
    }    
  }

  

  handleEdit = (worker_id) => {
    this.setState({worker_id: worker_id});
    $('#editModal').modal('open');
  }

  handleChatCode = async function(username){
    console.log("CREATIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIING CHANNEL");
    console.log(username);
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



  handleChatBoth = async function(reporter, reported){
    console.log("CREATIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIING CHANNEL");
    // console.log(username);
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
        members: [this.props.user.username, reporter, reported],
    });
    // console.log(this.props.user.username);
    // console.log(this.props.user.token);
    // console.log(username);
    console.log("CONNECTEEEEEEEEEEEEEEEEEEEEEED");

    await conversation.create();

    // await this.setState({code: username});
    // $('#editCode').modal('open');
  }




  handleDetails = (user_type, client_id, worker_id) => {
    if(user_type == 'worker'){
      
      Api.viewWorkerReporter(worker_id)
        .then((result) => {
          if(result.status === 200){
            this.setState({ atad: result.data.data });
          }
        })
        .catch((e) => { console.log(e) 
        })
          
      
    }else{
      console.log("HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHAAHAHAHAHAHAHAAHAH");
      console.log(worker_id);
      Api.viewClientReporter(client_id)
        .then((result) => {
          if(result.status === 200){
            this.setState({ atad: result.data.data });
          }
        })
        .catch((e) => { console.log(e) 
        })
          
    }    

    $('#detailsModal').modal('open');
  }


  render() {

    return (
      <DocumentTitle title="SP - View Reported">
        <div className="mainDiv">
          <CardPanel className="vaccontainer-panel hoverable">
            
             
                {
                  
                    this.state.tableData.map((info, i) => {
                      return(
                          
                          <div className="vachey">

                            
                              <div class="vaccardcontainer">
                                  
                                  <img
                                      class="round"
                                      src={info.profilepic}
                                      alt="user"
                                      width="100" height="100"
                                  />
                                  <h5>{info.first_name + ' ' + info.last_name}</h5>
                                 
                                  <h6>{info.user_type}</h6>

                                  <br/>
                                  <Row>
                                  <Col s={6}>
                                  
                                    <Button className="vbtn-new waves-effect waves-light" onClick={ () => { this.handleDetails(info.user_type, info.client_id, info.worker_id) } } >
                                        Info
                                      </Button>
                                  </Col>
                                  <Col s={6}>
                                  
                                    <Button className="cbtn-new waves-effect waves-light" onClick={ () => { this.handleChatCode(info.username), this.toChatAdmin()} } >
                                        Chat
                                      </Button>
                                  </Col>
                                  </Row>
                                  <br/>

                                  <Button className="cibtn-new waves-effect waves-light" onClick={ () => { this.handleChatBoth(info.username, info.uname), this.toChatAdmin()} } >
                                      Chat Involved
                                  </Button>
                                  <br/>
                                  <br/>
                                  
                                  {
                                    info.suspended === 'active' ?
                                    (
                                      <Button className="vrsbtn-new waves-effect waves-light" onClick={ () => { this.handleSuspend(info.user_type, info.client_id, info.worker_id, info.suspended) } }>
                                        Suspend
                                      </Button>
                                    )
                                    :
                                    (
                                      <Button className="liftbtn-new waves-effect waves-light" onClick={ () => { this.handleUnsuspend(info.user_type, info.client_id, info.worker_id, info.suspended) } }>
                                        Lift Suspension
                                      </Button>
                                    )
                                  }
                                  <br/>
                                  <br/>

                                  <Button className="vrsbtn-new waves-effect waves-light" onClick={ () => { this.handleBan(info.user_type, info.email, info.client_id, info.worker_id)} }>
                                    Ban User
                                  </Button>

                                  <br/>
                                  <br/>
                                  <Button className="vrsbtn-new waves-effect waves-light" onClick={ () => { this.handleRemove(info.user_type, info.client_id, info.worker_id)} }>
                                    Delete User
                                  </Button>

                                        
                              </div>
                            
                          </div>

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
            
          </CardPanel>
          <Modal id="editModal">
            
            <Input s={12} m={6} label="Reason" onKeyUp={this.handleKeyUp} onChange={this.handleReasonChange} type="select" >
              <option value="discrimination">Discrimination</option>
              <option value="harassment">Harassment</option>
              <option value="scam">Scam</option>
             </Input>

             <Col s={12}>
              <Button className="btn-new waves-effect waves-light" onClick={this.handleSubmit}>
                 Report
               </Button>
             </Col>
          
          </Modal>
          <Modal id="editCode">
            <ul>Enter chat code and username in the chat to contact user.</ul>
            <ul>Chat code:</ul>
            <h1>{this.props.user.username}-{this.state.code} </h1>
            <ul>Username:</ul>
            <h1>{this.state.code} </h1>
          </Modal>

          <Modal id="detailsModal">
            
              
              <Row>
                <Table responsive striped hoverable>
                  <thead>
                    <tr>
                      
                      <th className="table-head">
                        Reporter
                        
                      </th>

                      <th className="table-head">
                        Chat
                        
                      </th>
                      
                      
                      <th className="table-head">
                        Reason
                        
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                  {
                    
                      this.state.atad.map(reporter => {
                        return(
                          <tr>
                              <td>{reporter.fname}  {reporter.lname}</td>
                              
                              <td>
                                <div className="course-action1 clickable" onClick={ () => { this.handleChatCode(reporter.uname), this.toChatAdmin()} } >
                                  <Icon small className="blue-text">chat</Icon>
                                </div>
                              </td>
                              
                              <td>{reporter.reason}</td>
                          </tr> 
                        )
                      })
                    
                  }
                    
                  </tbody>
                </Table>
              </Row>
          
          </Modal>
        </div>
      </DocumentTitle>
    );
  }
  
}

export default ViewReported;
