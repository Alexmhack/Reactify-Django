import React, { Component } from 'react'

class PostCreate extends Component {
	render () {
		return (
			<form action='.' method='POST'>
				<div className='form-group'>
					<label for='id_name'>Post Title</label>
					<input type='text' id='id_name' name='title' className='form-control' placeholder='Blog post title' />
				</div>
				<div className='form-group'>
					<label for='id_content'>Post Content</label>
					<textarea type='text' id='id_content' name='content' className='form-control' placeholder='Blog post content'>
					</textarea>
				</div>
				<div className='form-group'>
					<input type='checkbox' id='id_draft' name='draft' className='form-control' />
					<label for='id_draft'>Draft</label>
				</div>
				<div className='form-group'>
					<label for='id_publish_date'>Publish date</label>
					<input type='date' id='id_publish_date' name='publish' className='form-control' />
				</div>
				<button type='submit' className='btn btn-primary'>Save</button>
			</form>
		)
	}
}

export default PostCreate
