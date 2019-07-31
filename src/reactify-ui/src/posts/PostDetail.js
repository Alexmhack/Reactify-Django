import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PostDetail extends Component {
	constructor (props) {
		super(props)
		this.state = {
			slug: null
		}
	}

	componentDidMount () {
		if (this.props.match) {
			const {slug} = this.props.match.params
			this.setState({
				slug: slug
			})
		}
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
