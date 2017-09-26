import React, { Component } from "react";

class Decks extends Component {
  render() {
    return <div />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Decks);
