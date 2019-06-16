/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import FormErrorMessage from '../components/Form/FormErrorMessage';

// components
import {
	SessionSlider
} from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
	loginUser,
	loginUserFailureRestart
} from '../actions/index';

class SignIn extends Component {

	state = {
		email: '',
		password: ''
	}

	/**
	 * On User Login
	 */
	onUserLogin() {
		// TODO add validation here to check is correct.
		this.props.loginUser(this.state, this.props.history);
	}

	/**
	 * On User Sign Up
	 */
	onUserSignUp() {
		this.props.history.push('/signUp');
	}

	componentDidUpdate(prevProps) {
		if (prevProps.errorMessages !== this.props.errorMessages) {
			this.setTimeToRemoveErrorMessage(5000);
		}
	  }

	/**
	 * Set time to remove validation messages.
	 */
	setTimeToRemoveErrorMessage(time) {
		setTimeout(() => {
			this.props.loginUserFailureRestart();
		}, time);
	}

	render() {
		const { email, password } = this.state;
		const { loading, errorMessages } = this.props;

		return (
			<QueueAnim type="bottom" duration={2000}>
				<div className="rct-session-wrapper">
					{loading &&
						<LinearProgress />
					}
					<AppBar position="static" className="session-header">
						<Toolbar>
							<div className="container">
								<div className="d-flex justify-content-between">
									<div className="session-logo">
										<Link to="/">
											<img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
										</Link>
									</div>
									<div>
										<a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
										<Button variant="raised" className="btn-light" onClick={() => this.onUserSignUp()}>Sign Up</Button>
									</div>
								</div>
							</div>
						</Toolbar>
					</AppBar>
					<div className="session-inner-wrapper">
						<div className="container">
							<div className="row row-eq-height">
								<div className="col-sm-7 col-md-7 col-lg-8">
									<div className="session-body text-center">
										<div className="session-head mb-30">
											<h2 className="font-weight-bold">Get started with {AppConfig.brandName}</h2>
											<p className="mb-0">Most Powerful App For Easy Manager Company</p>
										</div>
										<Form>
											<FormGroup className="has-wrapper">
												<Input
													type="mail"
													value={email}
													name="user-mail"
													id="user-mail"
													className="has-input input-lg"
													placeholder="Enter Email Address"
													onChange={(event) => this.setState({ email: event.target.value })}
												/>
												<span className="has-icon"><i className="ti-email"></i></span>
												<FormErrorMessage
													 message={errorMessages.email}
												/>
											</FormGroup>
											<FormGroup className="has-wrapper">
												<Input
													value={password}
													type="Password"
													name="user-pwd"
													id="pwd"
													className="has-input input-lg"
													placeholder="Password"
													onChange={(event) => this.setState({ password: event.target.value })}
												/>
												<span className="has-icon"><i className="ti-lock"></i></span>
												<FormErrorMessage
													 message={errorMessages.password}
												/>
											</FormGroup>
											<FormGroup className="mb-15">
												<Button
													color="primary"
													className="btn-block text-white w-100"
													variant="raised"
													size="large"
													onClick={() => this.onUserLogin()}
												>
													Sign In
                            					</Button>
											</FormGroup>
										</Form>
										<p className="text-muted">By signing up you agree to {AppConfig.brandName}</p>
										<p className="mb-0"><a target="_blank" href="#/terms-condition" className="text-muted">Terms of Service</a></p>
									</div>
								</div>
								<div className="col-sm-5 col-md-5 col-lg-4">
									<SessionSlider />
								</div>
							</div>
						</div>
					</div>
				</div>
			</QueueAnim>
		);
	}
}

// map state to props
const mapStateToProps = ({ authUser }) => {
	const { errorMessages } = authUser;
	return { errorMessages };
};

export default connect(mapStateToProps, {
	loginUser,
	loginUserFailureRestart
})(SignIn);
