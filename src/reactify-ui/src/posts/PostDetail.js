import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import cookies from 'react-cookies'
import 'whatwg-fetch'

import PostForm from './PostForm'

class PostDetail extends Component {
	constructor (props) {
		super(props)
		this.state = {
			slug: null,
			post: null,
			doneLoading: false
		}
	}

	componentDidMount () {
		if (this.props.match) {
			const {slug} = this.props.match.params
			this.setState({
				slug: slug
			})
			this.loadPosts(slug)
		}
	}

	loadPosts = (slug) => {
		let thisComp = this
		const endpoint = `/api/posts/${slug}/`
		let lookupOptions = {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const csrfToken = cookies.load('csrftoken')
		if (csrfToken !== undefined) {
			lookupOptions['credentials'] = 'include'
			lookupOptions['headers']['X-CSRFToken'] = csrfToken
		}

		// fetch the posts list api
		fetch(endpoint, lookupOptions)
		.then(function(response) {
			return response.json()
		}).then(function(responseData) {
			console.log(responseData)
			if (responseData.detail) {
				thisComp.setState({
					post: null,
					doneLoading: true
				})
			} else {
				thisComp.setState({
					post: responseData,
					doneLoading: true
				})
			}
		}).catch(function(errors) {
			console.error(errors)
		})
	}

	render () {
		const {doneLoading} = this.state
		const {post} = this.state
		const {author} = this.state

		return (
			<div>
				{doneLoading !== false ?
				<div>
					{post === null ? 'Not Found' :
						<div>
							<h1>{post.slug}</h1>
							<h1>{post.title}</h1>
							<h1>{post.content}</h1>

							{post.owner === true ? <PostForm post={post} /> : ''}

							<Link maintainScrollPosition={false} to={{
								pathname: '/posts/',
								state: {fromDashboard: false}
							}}>
								Posts
							</Link>
							{author === true ?
								<Link maintainScrollPosition={false} to={{
									pathname: '/posts/create',
									state: {fromDashboard: false}
								}}>
									Create Post
								</Link>
							: ''}
						</div>
					}
				</div> : <p>Loading...</p>}
			</div>
		)
	}
}

export default PostDetail
