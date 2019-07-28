import React, { Component } from 'react'

class PostInline extends Component {
  render() {
  	const {title} = this.props

    return (
      <div className="App">
        <p>Posts are now rendered inline.</p>
        <h1>{title}</h1>
      </div>
    );
  }
}

export default PostInline
