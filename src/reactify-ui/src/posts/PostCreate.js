import React, { Component } from 'react'
import cookies from 'react-cookies'
import 'whatwg-fetch'

class PostCreate extends Component {
	constructor (props) {
		super(props)
		this.state = {
			title: null,
			content: null,
			draft: false,
			publish: null
		}
	}

	createPost = (data) => {
		const endpoint = '/api/posts/'
		const csrfToken = cookies.load('csrftoken')

		// define a let of the => this to use anywhere within this scope
		let thisComp = this
		console.log(data)

		if (csrfToken !== undefined) {
			let lookupOptions = {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfToken
				},
				body: JSON.stringify(data),
				credentials: 'include'
			}

			fetch(endpoint, lookupOptions)
			.then(function(response) {
				return response.json()
			}).then(function(responseData) {
				const {newPostItem} = thisComp.props
				newPostItem(responseData)
				thisComp.clearForm()
			}).catch(function(errors) {
				console.error(errors)
			})
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const data = this.state
		if (data['draft'] === 'on') {
			data['draft'] = true
		} else {
			data['draft'] = false
		}
		this.createPost(data)
	}

	handleInputChange = (event) => {
		event.preventDefault()
		
		const key = event.target.name
		let value = event.target.value

		if (key === 'title') {
			if (value.length > 250) {
				alert('Title cannot be longer than 10 characters')
				value = ''
			}
		}

		this.setState({
			[key]: value
		})
	}

	clearForm = (event) => {
		if (event) event.preventDefault()
		this.createFormRef.reset()
	}

	componentDidMount = (event) => {
		this.state = {
			title: null,
			content: null,
			draft: false,
			publish: null
		}
	}

	render () {
		return (
			<form action='.' method='POST' onSubmit={this.handleSubmit}
				ref={(el) => this.createFormRef = el}>
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
			<button className='btn btn-secondary' onClick={this.clearForm}>Cancel</button>
		)
	}
}

export default PostCreate
