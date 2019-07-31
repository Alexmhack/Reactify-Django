import React, { Component } from 'react'

class PostInline extends Component {
  render() {
  	const {post} = this.props
  	const {elClass} = this.props

    return (
      <div>
      	{post !== undefined ? 
      		<div className={elClass}>
		        <h1>
              <a href={`/posts/${post.slug}`}>{post.title}</a>
            </h1>
            <p>{post.content}</p>
		        <p>{post.draft === true ? 'Draft' : ''}</p>
		      </div>
	        : ''
	      }
      </div>
    );
  }
}

export default PostInline
