var React = require('react');
var actions = require("../redux/action");
var connect = require("react-redux").connect;


var PromptContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	onFormSubmit: function(e) {
		e.preventDefault();
		var inputValue = this.refs.theInput.value;
		console.log("value", inputValue);
		// this.props.onValueSubmit(inputValue);
		console.log("actions", actions);
		this.props.dispatch(actions.fetchCharacter(this.refs.theInput.value));

		if (this.props.routeParams.playerOne) {
			this.context.router.push({
				pathname: '/battle',
				query: {
					playerOne: this.props.routeParams.playerOne,
					playerTwo: this.refs.theInput.value
				}
			})
		} else {
			this.context.router.push('/playerTwo/' + this.refs.theInput.value)
		}

	},
	render: function() {
		if (this.props.data) {
		var characters = this.props.data.map(function(character, index) {
			return (
				<option style={{paddingLeft:"45%"}} key={index} value={character.name}>{character.name}</option>
			)
		})
		}
		return(
			<div className="jumbotron col-sm-6 col-sm-offset-3 text-xs-center players">
				<h1>{this.props.route.header}</h1>
				<div className="col-sm-12 text-xs-center">
							 <select className="selectpicker btn-primary" style={{width: "400px", height: "40px", textAlignLast:"center"}} ref="theInput" defaultValue="Pick Your Megaman" onChange={this.onFormSubmit} >
              						{characters}
           					 </select>
	
				</div>
			</div>	
		)
	}
});

var mapStateToProps = function(state, props) {
	return {
		data: state.list,

	}
};

var Container = connect(mapStateToProps)(PromptContainer);

module.exports = Container;