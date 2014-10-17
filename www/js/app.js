/** @jsx React.DOM */

// Dipendenze
var Navbar  = ReactBootstrap.Navbar;
var Grid    = ReactBootstrap.Grid;
var Row     = ReactBootstrap.Row;
var Col	    = ReactBootstrap.Col;
var Table   = ReactBootstrap.Table;
var Button  = ReactBootstrap.Button;

// Componenti dell'app
var Header = React.createClass({displayName: 'Header',
	render: function () {
		return (
			Navbar({fixedTop: true}, 
				Row(null, 
					Col({xs: 10, xsOffset: 1, className: "text-center"}, 
						React.DOM.img({src: "images/logo.png"})
					)
				)
			)
		);
	}
});

var ExampleTable = React.createClass({displayName: 'ExampleTable',
	render: function () {

		var header = this.props.headers.map(function (title) {
			return (
				React.DOM.th(null, 
					title
				)
			);
		});

		var body = this.props.rows.map(function (row) {
			var tds = row.map(function (value) {
				return (
					React.DOM.td(null, 
						value
					)
				);
			});
			return (
				React.DOM.tr(null, 
					tds
				)
			);
		});

		return (
			Table({striped: true, responsive: true}, 
				React.DOM.thead(null, 
					React.DOM.tr(null, 
						header
					)
				), 
				React.DOM.tbody(null, 
						body
				)
			)
		);
	}
});

var Content = React.createClass({displayName: 'Content',
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
			Grid({fluid: true}, 
				Row(null, 
					Col({xs: 12}, 
						Button({onClick: this.loadTableData}, 
							"Carica!"
						)
					)
				), 
				Row(null, 
					Col({xs: 12, sm: 6, md: 6, lg: 3}, 
						ExampleTable({
							headers: this.state.headers, 
							rows: this.state.rows}
						)
					), 
					Col({xs: 12, sm: 6, md: 6, lg: 3}, 
						ExampleTable({
							headers: this.state.headers, 
							rows: this.state.rows}
						)
					), 
					Col({xs: 12, sm: 6, md: 6, lg: 3}, 
						ExampleTable({
							headers: this.state.headers, 
							rows: this.state.rows}
						)
					), 
					Col({xs: 12, sm: 6, md: 6, lg: 3}, 
						ExampleTable({
							headers: this.state.headers, 
							rows: this.state.rows}
						)
					)
				)
			)
		);
	}
});

var container = (
	React.DOM.div(null, 
		Header(null), 
		React.DOM.br(null), 
		React.DOM.br(null), 
		React.DOM.br(null), 
		React.DOM.br(null), 
		Content(null)
	)
);

React.renderComponent(
	container,
	document.body
);
