import React, { Component } from 'react';
import { Button, Modal } from 'react-materialize';
import './index.css';

declare var $: any;

class Delete extends Component{
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose(){
    $('#' + this.props.id).modal("close")
  }

  render(){
    return(
      <Modal id={this.props.id} header={'Are you sure you want to delete ' + this.props.label +'?'} actions={<div><Button onClick={this.handleClose} className="btn-flat red-colorize waves-effect waves-red">Cancel</Button><Button onClick={this.props.submit} className="btn-flat red-colorize waves-effect waves-red">Delete</Button></div>}>
      </Modal>
    )
  }
}

export default Delete;