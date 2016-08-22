class Pro {
	constructor(title,value=1,description,isDeleted=false) {
		this.title = title,
		this.alignment = 'PRO',
		this.value = value,
		this.description = description,
		this.isDeleted = isDeleted;
	}
}

class Con {
	constructor(title,value=1,description,isDeleted=false) {
		this.title = title,
		this.alignment = 'CON',
		this.value = value,
		this.description = description,
		this.isDeleted = isDeleted;
	}
}

const Form = React.createClass({
	getInitialState: function() {
		return { data: [] };
	},
	handleSubmit: function(e) {
		e.preventDefault();
		let parsedData = scrapeForm('form'),
			entry;
		if ( parsedData[1].value && !parsedData[2].value ) {
			// is Pro
			entry = new Pro(parsedData[0].value,parsedData[3].value,parsedData[4].value)
		} else {
			// is Con
			entry = new Con(parsedData[0].value,parsedData[3].value,parsedData[4].value)
		}
		
		this.props.onFormSubmit(entry);
		
		document.querySelector('form').reset();
	},
	render() {
		return (
			<form className="form" method="POST" onSubmit={this.handleSubmit}>
				<div className="input-wrap">
					<label className="label" htmlFor="title">Title</label>
					<input className="input" type="text" name="title" id="title" required/>
				</div>
				<div className="radio-wrap">
					<label htmlFor="alignment">Alignment</label>
				</div>
				<div className="radio-group" required>
					<div className="radio-wrap">
						<label className="label" htmlFor="alignment-pro">
							<input className="input" type="radio" name="alignment" id="alignment-pro"/>
							&nbsp;Pro
						</label>
					</div>
					<div className="radio-wrap">
						<label className="label" htmlFor="alignment-con">
							<input className="input" type="radio" name="alignment" id="alignment-con"/>
							&nbsp;Con
						</label>	
					</div>
				</div>
				<div className="input-wrap">
					<label className="label" htmlFor="value">Value</label>
					<input className="input" type="number" name="value" id="value" required/>
				</div>
				<div className="input-wrap">
					<label className="label" htmlFor="description">Description</label>
					<input className="input" type="text" name="description" id="description" required/>
				</div>
				<div className="input-wrap">
					<input type="submit" value="Submit"/>
				</div>
			</form>
		)
	}
});

const List = React.createClass({
	getInitialState: function() {
		return { entries: this.props.data };
	},
	componentWillReceiveProps: function(nextProps) {
		// console.log(nextProps)
		this.setState({
			entries: nextProps.data
		});
	},
	render() {
		let entryRows;
		if (this.state.entries.length > 0) {
			entryRows = this.state.entries.map(function(el,i) {
				return (
					<tr key={i}>
						<td className="bb1 border-gray">{el.alignment}</td>
						<td className="bb1 border-gray">{el.title}</td>
						<td className="bb1 border-gray">{el.value}</td>
						<td className="bb1 border-gray">{el.description}</td>
					</tr>
				)
			});
		} else {
			entryRows = ['No Entries Yet!'].map(function(el,i) {
				return (
					<tr key={i}>
						<td colSpan="4" className="text-center">{el}</td>
					</tr>
				)
			})
		}
		return (
			<table>
				<tbody>
				<tr>
					<th className="bb3 border-accent">alignment</th>
					<th className="bb3 border-accent">title</th>
					<th className="bb3 border-accent">value</th>
					<th className="bb3 border-accent">description</th>
				</tr>
				{entryRows}
				</tbody>
			</table>
		)
	}
})

const App = React.createClass({
	getInitialState: function() {
		return { data: []};
	},
	componentDidMount() {
		let _app = this;
		getData('get.php',{file:'entries.json'}, function(data) {
			_app.setState({
				data: data
			});
		});
	},
	componentDidUpdate: function() {
		// console.log({APP_cDUState:this.state.data})
	},
	handleFormSubmit: function(entry) {
		let updatedStateData = this.state.data;
		updatedStateData.push({
			title: entry.title,
			alignment: entry.alignment,
			value: entry.value,
			description: entry.description,
			isDeleted: entry.isDeleted
		});
		this.setState({ data: updatedStateData });
		// POST data to JSON
		postData('get.php',{file:'entries.json',method:'POST',data:JSON.stringify(updatedStateData)}, data => console.log(data))
	},
	render() {
		return (
			<main id="app" className="row gutters">
				<div className="max-w33">
					<h4>Add new entry:</h4>
					<Form onFormSubmit={this.handleFormSubmit} />
				</div>
				<div className="column">
					<List data={this.state.data} />
				</div>
				<div className="column"></div>
			</main>
		)
	}
})

if ( 'ReactDOM' in window ) {
	ReactDOM.render(<App />,document.querySelector('#app'));
} else {
	document.querySelector('#app').innerHTML = '<p><strong>No ReactDOM.render()</strong></p>';
}