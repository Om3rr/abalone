var React = require('react')
var Nav = require('react-bootstrap/Nav')
var NavItem = require('react-bootstrap/NavItem')

module.exports = React.createClass({

  render: function() {
    return (
      <Nav bsStyle="tabs" activeKey={this.props.activeKey}  style={{"margin-bottom": "60px"}}>
        <NavItem key={1} href="/"><i className="fa fa-desktop"></i> Home</NavItem>
      </Nav>
    )
  }
})
