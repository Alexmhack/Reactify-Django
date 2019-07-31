import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PostDetail extends Component {
	constructor (props) {
		super(props)
		this.state = {
			slug: null,
			post: null
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

		// fetch the posts list api
		fetch(endpoint, lookupOptions)
		.then(function(response) {
			return response.json()
		}).then(function(responseData) {
			console.log(responseData)
			thisComp.setState({
				post: responseData
			})
		}).catch(function(errors) {
			console.error(errors)
		})
	}

	render () {
		const {slug} = this.state
		return (
			<div>
				<h1>{slug}</h1>
				<Link maintainScrollPosition={false} to={{
					pathname: '/posts/',
					state: {fromDashboard: false}
				}}>
					Posts
				</Link>
			</div>
		)
	}
}

export default PostDetail
