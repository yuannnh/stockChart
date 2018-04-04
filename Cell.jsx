import React from 'react';
import ReactDOM from 'react-dom';

class Cell extends React.Component {

	constructor(props){
		super(props);
		this.state={
			data: this.props.data,
			mode: 0
		}
		this.handleOnClick = this.handleOnClick.bind(this);
		this.contentMaker = this.contentMaker.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleValid = this.handleValid.bind(this);
	}

	handleOnClick(){
		this.setState({mode:1});
	}
	handleChange(e){
		this.setState({data:e.target.value})
	}
	handleValid(e){
		if(e.key === 'Enter'){
			this.setState({mode:0});
			this.props.updateData(this.props.stock,this.props.id,Number(this.state.data));
		}
	}

	contentMaker(){
		if(this.state.mode === 0)
			return(<div onClick={this.handleOnClick}>{this.state.data}</div>);
		else 
			return(<input type="text" 
					value={this.state.data.toString()} 
					onChange = {this.handleChange}
					onKeyPress={this.handleValid}/>);
		
	}

	render(){
		var content = this.contentMaker() 	
		return(
			<div>{content}</div>
		);
	}
}

export default Cell;   
