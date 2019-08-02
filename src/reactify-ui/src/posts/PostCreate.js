import React, { Component } from 'react'

import PostForm from './PostForm'

class PostCreate extends Component {
	render () {
		return (
			<div className='text-center mt-5'>
				<h1>Create Post</h1>
				<PostForm />
			</div>
		)
	}
}

export default PostCreate
