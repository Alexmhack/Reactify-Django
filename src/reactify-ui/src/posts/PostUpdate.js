import React, { Component } from 'react'
import cookies from 'react-cookies'
import 'whatwg-fetch'
import moment from 'moment'

class PostUpdate extends Component {
	constructor (props) {
		super(props)
		this.state = {
			title: null,
			content: null,
			draft: false,
			publish: null
		}
	}

	updatePost = (data) => {
		const {post} = this.props
		const endpoint = `/api/posts/${post.slug}`
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
		let data = this.state
		this.updatePost(data)
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

	handleDraftChange = () => {
		this.setState({
			draft: !this.state.draft
		})
	}

	clearForm = (event) => {
		if (event) event.preventDefault()
		this.createFormRef.reset()
	}

	componentDidMount = () => {
		const {post} = this.props

		if (post !== undefined) {
			this.setState({
				title: post.title,
				content: post.content,
				draft: post.draft,
				publish: moment(post.publish).format('YYYY-MM-DD')
			})
		} else {
			this.setState({
				title: null,
				content: null,
				draft: false,
				publish: moment().format('YYYY-MM-DD')
			})
		}

		this.postTitleRef.focus()
	}

	render () {
		const {publish} = this.state
		console.log(publish)

		return (
			<div>
				<form action='.' method='POST' onSubmit={this.handleSubmit}
					ref={(el) => this.createFormRef = el}>
					<div className='form-group'>
						<label for='id_name'>Post Title</label>
						<input ref={(el) => this.postTitleRef = el} type='text' id='id_name' name='title' className='form-control'
							placeholder='Blog post title' onChange={this.handleInputChange} required='required' />
					</div>
					<div className='form-group'>
						<label for='id_content'>Post Content</label>
						<textarea type='text' id='id_content' name='content' className='form-control'
							placeholder='Blog post content' onChange={this.handleInputChange}
							required='required'>
						</textarea>
					</div>
					<div className='form-group'>
						<input type='checkbox' id='id_draft' name='draft' className='form-control'
							 onChange={this.handleDraftChange} checked={this.state.draft} />
						<label for='id_draft'>Draft</label>
						<button onClick={(event) => {event.preventDefault(); this.handleDraftChange()}}>Toggle Draft</button>
					</div>
					<div className='form-group'>
						<label for='id_publish_date'>Publish date</label>
						<input type='date' id='id_publish_date' name='publish' className='form-control'
							 onChange={this.handleInputChange} required='required' value={publish} />
					</div>
					<button type='submit' className='btn btn-primary'>Save</button>
				</form>
				<button className='btn btn-secondary' onClick={this.clearForm}>Cancel</button>
			</div>
		)
	}
}

export default PostUpdate
