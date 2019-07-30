import React, { Component } from 'react'

class PostCreate extends Component {
	constructor (props) {
		super(props)
		this.state = {

		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log(this.state)
		const data = this.state
		if (data['draft'] === 'on') {
			data['draft'] = true
		} else {
			data['draft'] = false
		}
	}

	handleInputChange = (event) => {
		event.preventDefault()
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render () {
		return (
			<form action='.' method='POST' onSubmit={this.handleSubmit}>
				<div className='form-group'>
					<label for='id_name'>Post Title</label>
					<input type='text' id='id_name' name='title' className='form-control'
						placeholder='Blog post title' onChange={this.handleInputChange} required='required' />
				</div>
				<div className='form-group'>
					<label for='id_content'>Post Content</label>
					<textarea type='text' id='id_content' name='content' className='form-control'
						placeholder='Blog post content' onChange={this.handleInputChange} required='required'>
					</textarea>
				</div>
				<div className='form-group'>
					<input type='checkbox' id='id_draft' name='draft' className='form-control'
						 onChange={this.handleInputChange} />
					<label for='id_draft'>Draft</label>
				</div>
				<div className='form-group'>
					<label for='id_publish_date'>Publish date</label>
					<input type='date' id='id_publish_date' name='publish' className='form-control'
						 onChange={this.handleInputChange} required='required' />
				</div>
				<button type='submit' className='btn btn-primary'>Save</button>
			</form>
		)
	}
}

export default PostCreate
