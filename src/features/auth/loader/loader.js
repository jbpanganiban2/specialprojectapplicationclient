import React, { Component } from 'react';
import { Preloader } from 'react-materialize';
import DocumentTitle from 'react-document-title';

import './style.css';

class Loader extends Component {
	render() {
		return (
			<DocumentTitle title="Loading...">
				<div className="loader-center"> 
					<Preloader size='big'/>  
				</div>
			</DocumentTitle>
		);
	}
}

export default Loader;