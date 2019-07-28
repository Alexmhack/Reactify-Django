import React, { Component } from 'react'
import 'whatwg-fetch'
import cookies from 'react-cookies'

import PostInline from './PostInline'

class Posts extends Component {
	constructor (props) {
		super(props)

		this.state = {
			posts: [],
			postClass: 'card'
		}
	}

	loadPosts = () => {
		let thisComp = this
		const endpoint = '/api/posts/'
		let lookupOptions = {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		}

		// fetch the posts list api
		fetch(endpoint, lookupOptions)
		.then(function(response) {
			return response.json()
		}).then(function(responseData) {
			console.log(responseData)
			thisComp.setState({
				posts: responseData
			})
		}).catch(function(errors) {
			console.error(errors)
		})
	}

	createPost = () => {
		const endpoint = '/api/posts'
		const csrfToken = cookies.load('csrftoken')

		// define a let of the => this to use anywhere within this scope
		let thisComp = this

		let data = {
	    "slug": "",
	    "title": "",
	    "content": "",
	    "draft": false,
	    "publish": null
		}

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
				console.log(responseData)

				// using this will refer to the fetch method and not the component itself
				thisComp.setState({
					posts: responseData
				})
			}).catch(function(errors) {
				console.error(errors)
			})
		}
	}

	componentDidMount () {
		this.setState({
			posts: [],
			postClass: 'card'
		})
		this.loadPosts()
	}

	render () {
		const {posts} = this.state
		const {postClass} = this.state

		return (
			<div>
				{posts.length > 0 ? 
					posts.map((item, index) => {
						return (
							<PostInline post={item} elClass={postClass} />
						)
					})
					: <p>No posts found.</p>
				}
			</div>
		)
	}
}

export default Posts
