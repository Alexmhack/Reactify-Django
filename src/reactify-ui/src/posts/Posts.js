import React, { Component } from 'react'
import 'whatwg-fetch'
import cookies from 'react-cookies'

class Posts extends Component {
	loadPosts = () => {
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
		}).catch(function(errors) {
			console.error(errors)
		})
	}

	createPost = () => {
		const endpoint = '/api/posts'
		const csrfToken = cookie.load('csrftoken')

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
			}).catch(function(errors) {
				console.error(errors)
			})
		}
	}

	componentDidMount () {
		this.loadPosts()
	}

	render () {
		return (
			<div>
				<h1>Hello to posts</h1>
			</div>
		)
	}
}

export default Posts
