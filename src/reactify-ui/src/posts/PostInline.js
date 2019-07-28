import React, { Component } from 'react'

class PostInline extends Component {
  render() {
  	const {title} = this.props

    return (
      <div className="App">
        <h1>{title}</h1>
      </div>
    );
  }
}

export default PostInline
