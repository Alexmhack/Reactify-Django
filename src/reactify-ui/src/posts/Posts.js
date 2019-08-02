import React, { Component, Fragment } from 'react'
import 'whatwg-fetch'
import cookies from 'react-cookies'
import { Link } from 'react-router-dom'

import PostInline from './PostInline'
// import PostCreate from './PostCreate'

class Posts extends Component {
	constructor (props) {
		super(props)

		this.state = {
			posts: [],
			postClass: 'card',
			author: null,
			next: null,
			previous: null,
			count: null
		}
	}

	loadPosts = (nextEndpoint) => {
		let endpoint = '/api/posts/'
		if (nextEndpoint !== undefined) {
			endpoint = nextEndpoint
		}

		let thisComp = this
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
			// let currentPosts = thisComp.state.posts
			// let newPosts = currentPosts.concat(responseData.results)

			thisComp.setState({
				posts: thisComp.state.posts.concat(responseData.results),
				author: responseData.author,
				next: responseData.next,
				previous: responseData.previous,
				count: responseData.count
			})
		}).catch(function(errors) {
			console.error(errors)
		})
	}

	togglePostClass = (event) => {
		event.preventDefault()
		this.setState({
			postClass: this.state.postClass === 'card' ? '' : 'card'
		})
	}

	componentDidMount () {
		this.setState({
			posts: [],
			postClass: 'card'
		})
		this.loadPosts()
	}

	handleNewPostItem = (postItemData) => {
		let currentPosts = this.state.posts
		currentPosts.unshift(postItemData)
		this.setState({
			posts: currentPosts
		})
	}

	loadMorePosts = (event) => {
		event.preventDefault()

		const {next} = this.state
		if (next !== undefined || next !== null) {
			this.loadPosts(next)
		}
	}

	render () {
		const {posts} = this.state
		const {postClass} = this.state
		const {author} = this.state
		const {next} = this.state
		// const csrfToken = cookies.load('csrftoken')

		return (
			<div>
				<button onClick={this.togglePostClass}>Toggle Post Class</button>
				{posts.length > 0 ? 
					posts.map((item, index) => {
						return (
							<PostInline post={item} elClass={postClass} />
						)
					})
					: <p>No posts found.</p>
				}

				{next !== null ? <button onClick={this.loadMorePosts}>Load more posts</button> : ''}

				{author === true ?
					<Fragment>
						<Link maintainScrollPosition={false} to={{
							pathname: '/posts/create',
							state: {fromDashboard: false}
						}}>
							Create Post
						</Link>
					</Fragment>
				: ''}
			</div>
		)
	}
}

export default Posts

// hide post create form
// {(csrfToken !== undefined && csrfToken !== null)  ? 
// 	<div className='p-5 m-5'>
// 		<PostCreate newPostItem={this.handleNewPostItem} />
// 	</div>
// : ''}
