import React from 'react';
import ReactDOM from 'react-dom';
import { LineChart, Line,XAxis,YAxis,Tooltip,CartesianGrid,Legend } from 'recharts';
import Cell from './Cell.jsx';

class StockTable extends React.Component {

	constructor(){
		super();
		this.state = {
			data:{NASDAQ:[],CAC40:[]},
			e:{NASDAQ:'',CAC40:''}
		}
		//this.componentWillMount=this.componentWillMount.bind(this);
		this.updateData = this.updateData.bind(this);
		this.getData = this.getData.bind(this);
		this.dataForChart = this.dataForChart.bind(this);
	}

	componentWillMount(){
		this.getData();
	}

	roundNumber(n){
		var num = n.toString();
		return Number(num.substring(0,4))
	}

	getE(n){
		var num = n.toString()
		var idx = num.indexOf('e');
		return num.substring(idx,num.length);

	}

	dataForChart(){
		return this.state.data.NASDAQ.map((elem, i)=>{
			return {name:i.toString(), NASDAQ: this.roundNumber(elem), CAC40: this.roundNumber(this.state.data.CAC40[i])}
		})
	}

	readData(data){
		var res = {}
		//res.NASDAQ = data.map((elem)=> Math.round(elem.stocks.NASDAQ * 100) / 100);
		res.NASDAQ = data.map((elem)=>elem.stocks.NASDAQ);
		res.CAC40 = data.map((elem)=>elem.stocks.CAC40);
		console.log(res);
		return res;

	}

	updateData(stock, id, value){
		//console.log('parent update is called')
		var d = this.state.data;
		d[stock][id] = value;
		this.setState({data:d},function(){
			//console.log(this.state.data);
		});
	}

	getData(){
		fetch('http://localhost:8000/?count=20')
		.then(result => {
			return result.json()
		}).then(data => {
			this.setState({data:this.readData(data)});
		})
	}

	

	render() {

		var NASDAQ_content = this.state.data.NASDAQ.map((elem,i)=>{
			return(
				<td><Cell key={i} id={i} stock="NASDAQ" data={elem} updateData={this.updateData}/></td>
			);
		})
		var CAC40_content = this.state.data.CAC40.map((elem, i)=>{
			return(
				<td><Cell key={i} id={i} stock="CAC40" data={elem} updateData={this.updateData}/></td>
			);
		})

		var chartData = this.dataForChart();
		//console.log(chartData);
		return (
			<div id="table">

				<div>
					<LineChart width={800} height={600} data={chartData}>
					  <Line type="monotone" dataKey="NASDAQ" stroke="#8884d8" />
					  <Line type="monotone" dataKey="CAC40" stroke="#82ca9d" />
					  <CartesianGrid strokeDasharray="3 3" />
					  <XAxis dataKey="name" />
  					  <YAxis />
  					  <Tooltip />
  					  <Legend />
					</LineChart>
				</div>
				<table>
					<tr>
						<th>NASDAQ</th>
						{NASDAQ_content}
					</tr>
					<tr>
						<th>CAC40</th>
						{CAC40_content}
					</tr>
				</table>

				<button onClick={this.getData}>get data</button>

			</div>


			
		);
	}
}

ReactDOM.render(<StockTable/>, document.getElementById("stock_table"));