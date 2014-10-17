/** @jsx React.DOM */

// Dipendenze
var Navbar  = ReactBootstrap.Navbar;
var Grid    = ReactBootstrap.Grid;
var Row     = ReactBootstrap.Row;
var Col	    = ReactBootstrap.Col;
var Table   = ReactBootstrap.Table;
var Button  = ReactBootstrap.Button;

// Componenti dell'app
var Header = React.createClass({
	render: function () {
		return (
			<Navbar fixedTop>
				<Row>
					<Col xs={10} xsOffset={1} className="text-center">
						<img src="images/logo.png" />
					</Col>
				</Row>
			</Navbar>
		);
	}
});

var ExampleTable = React.createClass({
	render: function () {

		var header = this.props.headers.map(function (title) {
			return (
				<th>
					{title}
				</th>
			);
		});

		var body = this.props.rows.map(function (row) {
			var tds = row.map(function (value) {
				return (
					<td>
						{value}
					</td>
				);
			});
			return (
				<tr>
					{tds}
				</tr>
			);
		});

		return (
			<Table striped responsive>
				<thead>
					<tr>
						{header}
					</tr>
				</thead>
				<tbody>
						{body}
				</tbody>
			</Table>
		);
	}
});

var Content = React.createClass({
	getInitialState: function () {
		return {
			headers: [],
			rows: []
		};
	},
	loadTableData: function () {
		var self = this;
		$.ajax({
			method: "GET",
			url: "http://slim-skel.local/antenna",
			success: function (res) {
				res = JSON.parse(res);
				var headers = Object.keys(res[0]);
				var rows = res.map(function (obj) {
					return headers.map(function (header) {
						return obj[header];
					});
				});
				self.setState({
					headers: headers,
					rows: rows
				});
			}
		});
	},
	render: function () {
		return (
			<Grid fluid>
				<Row>
					<Col xs={12}>
						<Button onClick={this.loadTableData}>
							Carica!
						</Button>
					</Col>
				</Row>
				<Row>
					<Col xs={12} sm={6} md={6} lg={3}>
						<ExampleTable
							headers={this.state.headers}
							rows={this.state.rows}
						/>
					</Col>
					<Col xs={12} sm={6} md={6} lg={3}>
						<ExampleTable
							headers={this.state.headers}
							rows={this.state.rows}
						/>
					</Col>
					<Col xs={12} sm={6} md={6} lg={3}>
						<ExampleTable
							headers={this.state.headers}
							rows={this.state.rows}
						/>
					</Col>
					<Col xs={12} sm={6} md={6} lg={3}>
						<ExampleTable
							headers={this.state.headers}
							rows={this.state.rows}
						/>
					</Col>
				</Row>
			</Grid>
		);
	}
});

var container = (
	<div>
		<Header />
		<br />
		<br />
		<br />
		<br />
		<Content />
	</div>
);

React.renderComponent(
	container,
	document.body
);
