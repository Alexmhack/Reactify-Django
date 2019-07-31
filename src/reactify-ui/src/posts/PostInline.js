import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostInline extends Component {
  render() {
  	const {post} = this.props
  	const {elClass} = this.props

    return (
      <div>
      	{post !== undefined ? 
      		<div className={elClass}>
		        <h1>
              <Link maintainScrollPosition={true} to={{
                pathname: `/posts/${post.slug}`,
                state: {fromDashboard: false}
              }}>
                {post.title}
              </Link>
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
