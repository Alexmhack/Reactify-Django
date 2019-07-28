import React, { Component } from 'react'

class PostInline extends Component {
  render() {
  	const {post} = this.props

    return (
      <div className="App">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
  }
}

export default PostInline
