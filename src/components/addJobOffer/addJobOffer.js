import React, { Component } from 'react';
import { Row, Col, CardPanel, Button, Input, Table, Icon, Modal, Collapsible, CollapsibleItem, Text, Textarea, Form, Label } from 'react-materialize';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
// import JobOfferForm from '../jobOffers/JobOfferForm';
import DocumentTitle from 'react-document-title';
import './index.css';
import { StreamChat } from 'stream-chat';
// import Carousel from 'react-elastic-carousel';
import Ratings from 'react-ratings-declarative';

// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";


// import DatePicker from 'react-date-picker';


import * as Api from '../api/client';
import * as Api2 from '../api/worker';

declare var $: any;

class AddJobOffer extends Component {
  constructor(props){
    super(props);

    this.state = {
      // submitted: false
      search: '',
      error_search: '',
      client_id: '',
      worker_id: '',
      category: 'education',
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      price: '',
      chosen: '',
      time: 'open',
      work: 'open',
      label:'Suggested Workers',
      pricelabel:'Price',

      error_worker_id: '',
      error_category: '',
      error_title: '',
      error_description: '',
      error_start_date: '',
      error_end_date: '',
      error_price: '',

      workers: [],
      trabahador: {
        worker_id: '',
        profilepic: '',
        first_name: '',
        last_name: '',
        skills: '',
        rating: ''
      },
      categories: [],
      kategorya: {
        description: ''
      },
      iskils: [],
      stars: [],
      tala: {
        rating: ''
      },
      manggagawa: ''

    }

    // this.handleSubmitted = this.handleSubmitted.bind(this);
    // this.handleAddJobOffer = this.handleAddJobOffer.bind(this);
    // this.redirect = this.redirect.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleWorkerIDChange = this.handleWorkerIDChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChosenChange = this.handleChosenChange.bind(this);
    // this.handleToggleChange = this.handleToggleChange.bind(this);
    this.handleWorkChange = this.handleWorkChange.bind(this);
    this.handleOpenTime = this.handleOpenTime.bind(this);
    this.handleSetTime = this.handleSetTime.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSplit = this.handleSplit.bind(this);
    this.handleManggagawa = this.handleManggagawa.bind(this);
    
  }

  // redirect(e){
  //   this.props.history.push('/job-offers');
  // }

  // handleSubmitted(e){
  //   this.setState({ submitted: true });
  //   const temp = this;
  //   setTimeout(function(){
  //     temp.setState({ submitted: false })
  //   }, 100)
  // }

  handleKeyUp(e) {
    if(e.keyCode === 13){
      this.handleSubmit(e);
    }
  }

  // handleAddJobOffer(data){
  //   Api.addJobOffer(data)
  //     .then((result) => {
  //       window.Materialize.toast('Successfully added job offer.', 3000, 'green-text');
  //       this.props.history.push('/job-offers');
  //     })
  //     .catch((e) => {
  //       window.Materialize.toast("Failed to create job offer.", 3000, 'red-text');
  //     });
  // } 

  handleWorkerIDChange(worker_id) {
    this.setState({ worker_id: worker_id })
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf");
    console.log(this.state.worker_id);
  }

  handleManggagawa(id) {
    this.setState({ manggagawa: id }) 
    Api.getWorkerRating(id)
      .then((result) => {
        if(result.status === 200){
          this.setState({ stars: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      }) 
  }

  handleChosenChange(last_name) {
    this.setState({ chosen: last_name, label: last_name })
  }

  // handleToggleChange() {
  //   this.setState({ check: !this.state.check})
  // } 

  handleOpenTime(e) {
    this.setState({ time: e.target.value})
  } 

  handleSetTime(e) {
    this.setState({ time: e.target.value})
  }  

  handleTimeChange = (value) => {
    this.setState({ 
      time: value,
      start_date: '',
      end_date: ''
    })
    console.log(this.state.time);
  }  

  handleWorkChange = (value) => {
    this.setState({ 
      work: value,
      worker_id: '',
      price: '',
      label: "Suggested Workers",
      pricelabel: "Price"
    })
  }  

  handleCategoryChange(e) {
    this.setState({ category: e.target.value })
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value })
  }

  handleStartDateChange(e) {
    if(this.state.time === 'open') {
      this.setState({ start_date: e.target.value })
    } else {
      this.setState({ start_date: new Date(e.target.value + 'EDT').toISOString().slice(0, 10) })
    }
  }

  handleEndDateChange(e) {
    if(this.state.time === 'open'){
      this.setState({ end_date: e.target.value })
    }else{
      this.setState({ end_date: new Date(e.target.value + 'EDT').toISOString().slice(0, 10) })
    }
    // this.setState({ end_date: e.target.value })
    // console.log("ENNNNNNNNNNNNNNNNNNNNNND");
    // console.log(this.state.end_date);
    // console.log(new Date(+ 'EDT').toLocaleString().toISOString().slice(0, 10));
    // console.log(Date().toLocaleString());
    // var z = Date().toLocaleString();
    // console.log(new Date(z + 'EDT').toISOString().slice(0, 10));
  }

  handlePriceChange(e) {
    this.setState({ price: e.target.value })
  }

  handleSearchChange(e) {
    this.setState({ search: e.target.value })
  }

  handleSearch = () => {
    // this.setState({worker_id: worker_id});
    // await this.setState({iskils: skills.split(', ')})
    $('#editModal').modal('open');
  }

  handleSplit(skills) {
    this.setState({iskils: skills.split(', ')})
  } 


  handleSubmit(e) {
    var error = false;
    var focus = false;
    e.preventDefault();
    this.setState({ 
      error_category: '',
      error_title: '',
      error_description: ''
    });

    if(this.state.category === '') {
      this.setState({ error_category: 'Required' });
      error = true;
      if (!focus) { $("#category").focus(); focus = true; }
    }
    if(this.state.title === '') {
      this.setState({ error_title: 'Required' });
      error = true;
      if (!focus) { $("#title").focus(); focus = true; }
    }
    if(this.state.description === '') {
      this.setState({ error_description: 'Required' });
      error = true;
      if (!focus) { $("#description").focus(); focus = true; }
    }

    if(this.state.time === 'set'){
      if(this.state.start_date === '') {
      this.setState({ error_start_date: 'Required' });
      error = true;
      if (!focus) { $("#start_date").focus(); focus = true; }
      }

      var w = Date().toLocaleString();
      const x = new Date(this.state.start_date + 'EDT').toISOString().slice(0, 10);
      // const y = new Date(this.state.end_date + 'EDT').toISOString().slice(0, 10);
      // const z = new Date(+ 'EDT').toLocaleString().toISOString().slice(0, 10);
      const z = new Date(w + 'EDT').toISOString().slice(0, 10);

     

      if(z > x) {
      this.setState({ error_end_date: 'Invalid' });
      error = true;
      if (!focus) { $("#end_date").focus(); focus = true; }
      }
    }

    if(this.state.time === 'set'){
      if(this.state.end_date === '') {
      this.setState({ error_end_date: 'Required' });
      error = true;
      if (!focus) { $("#end_date").focus(); focus = true; }
      }
      var w = Date().toLocaleString();
      const x = new Date(this.state.start_date + 'EDT').toISOString().slice(0, 10);
      const y = new Date(this.state.end_date + 'EDT').toISOString().slice(0, 10);
      // const z = new Date(+ 'EDT').toLocaleString().toISOString().slice(0, 10);
      const z = new Date(w + 'EDT').toISOString().slice(0, 10);

      if(x > y) {
      this.setState({ error_end_date: 'Invalid' });
      error = true;
      if (!focus) { $("#end_date").focus(); focus = true; }
      }

      if(z > y) {
      this.setState({ error_end_date: 'Invalid' });
      error = true;
      if (!focus) { $("#end_date").focus(); focus = true; }
      }
    }

    if(this.state.work === 'set'){
      if(this.state.worker_id === '') {
      this.setState({ error_worker_id: 'Required' });
      error = true;
      if (!focus) { $("#worker_id").focus(); focus = true; }
      }
    }

    if(this.state.work === 'set'){
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
    }  
     
    

    if(!error){
      Api.addJobOffer({
          client_id: this.props.user.client_id,
          worker_id: this.state.worker_id,
          category: this.state.category,
          title: this.state.title,
          description: this.state.description,
          // start_date: new Date(this.state.start_date).toUTCString(),
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          // start_date: new Date(this.state.start_date + 'EDT').toISOString().slice(0, 10),
          // end_date: new Date(this.state.end_date + 'EDT').toISOString().slice(0, 10),
          // end_date: new Date(this.state.end_date).toISOString().split('T')[0],
          price: this.state.price
        })
         .then((result) => {
            // this.props.handleUpdateSession(this.props.user, result.data.data);
            window.Materialize.toast("Post successful.", 3000, 'green-text');
            window.setTimeout(function(){window.location.reload()}, 1000);
            // console.log("DOOOOOOOOOOOOOOOOONE");
            // var end = new Date(this.state.end_date + 1).toISOString().slice(0, 10)
            // console.log(end.replace(end[10],end[10]+1));
            // console.log(new Date(this.state.end_date.replace(/-/g, '\/').replace(/T.+/, '')).toISOString().slice(0, 10));
            // console.log(result.data);
            // var doo = new Date(this.state.end_date);
            // console.log( new Date( doo.getTime() - doo.getTimezoneOffset() * -60000 )  );
            // console.log(new Date(this.state.end_date + 'EDT').toISOString().slice(0, 10));

            
          })
        .catch((e) => {
            window.Materialize.toast("Failed to post job offer.", 3000, 'red-text');
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
    
    $("#title").focus();
    Api.searchWorker()
      .then((result) => {
        if(result.status === 200){
          this.setState({ workers: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      }) 
    Api.viewCategory()
      .then((result) => {
        if(result.status === 200){
          this.setState({ categories: result.data.data });
        }
      })
      .catch((e) => { console.log(e) 
      }) 
         

  }


  render() {
    console.log(this.state.time);
    return (
      <DocumentTitle title="SP - Post Job Offer">
        <div className="background" >
        <div className="container">
    
            
                
                  <CardPanel className="hoverable cardPanel1">
                    

                      
                      <Input className="cat" s={12} m={6} label="Category" onKeyUp={this.handleKeyUp} onChange={this.handleCategoryChange} error={this.state.error_category?this.state.error_category: null} type="select" >
                        {
                          this.state.categories.map(kategorya => {
                            return(
                              <option value={kategorya.description}>{kategorya.description}</option>
                            )
                          })
                        }
                      </Input>
                     

                      <Row>
                      </Row>

                      <Input s={12} m={6} id="title" label="Title" onChange={this.handleTitleChange} error={this.state.error_title?this.state.error_title: null} />
                     
                      <Input s={12} m={12} id="description" type="textarea" label="Description" onChange={this.handleDescriptionChange} error={this.state.error_description?this.state.error_description: null} />
                      <Row/>
                      <b>Select duration of the job offer</b>
                      <RadioGroup onChange={ this.handleTimeChange } horizontal>
                        <RadioButton value="open" iconSize={20} iconInnerSize={10} pointColor="navy">
                          Open Date
                        </RadioButton>
                        <RadioButton value="set" iconSize={20} iconInnerSize={10} pointColor="navy">
                          Set Date
                        </RadioButton>
                      </RadioGroup>
                    {
                      this.state.time === 'open'?
                      (
                        null
                        
                        )
                      :
                      (

                     <Row>
                      <Input s={12} m={6} id="start_date" label="Start Date" onChange={this.handleStartDateChange} disabled={this.state.time === 'open'} type="date" />
                      
                      <Input s={12} m={6} id="end_date" label="End Date" onChange={this.handleEndDateChange} disabled={this.state.time === 'open'} type="date" />
                      
                     </Row>
                     )

                    }
                      <Row/>
                      <b>Choose Worker Option</b>
                      <RadioGroup onChange={ this.handleWorkChange } horizontal  >
                        <RadioButton value="open" iconSize={20} iconInnerSize={10} pointColor="navy">
                          Open for Bidding
                        </RadioButton>
                        <RadioButton value="set" iconSize={20} iconInnerSize={10} pointColor="navy">
                          Set Worker and Price
                        </RadioButton>
                      </RadioGroup>
                     {
                      this.state.work === 'open' ?
                      (
                        null
                      )
                      :
                      (
                      <div  className="course-action1 clickable"  onClick={ () => {this.state.work === 'open' || this.handleSearch()} } >
                          
                          <Input s={12} m={6} label={this.state.label} disabled={this.state.work === 'open'}/>

                      </div>
                      )
                      }
                      <br/>
                      <br/>
                      <Input type="number" s={12} m={6} id="price" label={this.state.pricelabel} onChange={this.handlePriceChange} error={this.state.error_price?this.state.error_price: null} />
                      
                      

                      <Col s={6} >
                        <Button className="btn-new waves-effect waves-light" onClick={this.handleSubmit}>
                          Post
                        </Button>
                      </Col>
                      
                   
                  </CardPanel>
          
          <Modal id="editModal">
              
                <div className="item">
                      <div className="items">
                  {
                      this.state.workers.map(trabahador => {
                        return(
                          <div  className="test" onClick={ () => { this.handleWorkerIDChange(trabahador.worker_id), this.handleChosenChange(trabahador.last_name)} } >
                           
                                

                                <div className="hey">

                                  
                                    <div class="cardcontainer">
                                        
                                        <img
                                            class="round"
                                            src={trabahador.profilepic}
                                            alt="user"
                                            width="100" height="100"
                                        />
                                        <h5>{trabahador.first_name + ' ' + trabahador.last_name}</h5>
                                       
                                       
                                                        
                                                          <Ratings
                                                          rating={trabahador.rating}
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
                                                {trabahador.skills.split(', ').map(iskils => {
                                                           return (
                                                            
                                                              <li>{iskils}</li>
                                                            
                                                            ) 
                                                        })}
                                            </ul>
                                            
                                        </div>
                                        
                                    </div>
                                  

                                </div>
                                
                                
                            
                          </div>  
                        )
                      })
                      
                  }
                      </div>
                </div>  
                  <br/> 
              <h4>{this.state.chosen}</h4>
              <div  className="course-action2 clickable" onClick={ () => { this.handleWorkerIDChange(null), this.handleChosenChange(null)} } >
                  <Icon small className="red-text">cancel</Icon>
              </div>
            
          
          </Modal>
        </div>
        </div>
      </DocumentTitle>
    );
  }
  
}

export default AddJobOffer;
