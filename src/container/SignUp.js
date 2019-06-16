import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { SessionSlider } from 'Components/Widgets';
import FormErrorMessage from '../components/Form/FormErrorMessage';
import AppConfig from 'Constants/AppConfig';

// redux action
import {
	createAccountAndUser,
	generalFormFailureRestart
} from '../actions/index';

const RESET_TIME_VALIDATION_MESSAGE = 5000;

class SignUp extends Component {

	state = {
		name: '',
		email: '',
		password: ''
	};

	/**
     * Check if has error message, and reset.
     * 
     * @param {object} prevProps 
     */
    componentDidUpdate(prevProps) {
        if (prevProps.errorMessages !== this.props.errorMessages) {
            this.setTimeToRemoveErrorMessage(RESET_TIME_VALIDATION_MESSAGE);
        }
    };

	/**
	 * On User SignUp
	 */
	onUserSignUp() {
		this.props.createAccountAndUser(this.state, this.props.history);
	};

	/**
     * Set time to remove validation messages.
    */
    setTimeToRemoveErrorMessage(time) {
		setTimeout(() => {
			this.props.generalFormFailureRestart();
		}, time);
	};

	render() {
		const { name, email, password } = this.state;
		const { loading, errorMessages } = this.props;

		console.log(this.props);

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
											<img src={AppConfig.appLogo} alt="session-logo" width="110" height="35" />
										</Link>
									</div>
									<div>
										<Link to="/signin" className="mr-15 text-white">Already have an account?</Link>
										<Button
											component={Link}
											to="/signin"
											variant="raised"
											className="btn-light"
										>
											Sign In
										</Button>
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
										<div className="session-head mb-15">
											<h2>Get started with {AppConfig.brandName}</h2>
										</div>
										<Form>
											<FormGroup className="has-wrapper">
												<Input
													type="text"
													value={name}
													name="name"
													className="has-input input-lg"
													placeholder="Enter Name Of Account"
													onChange={(e) => this.setState({ name: e.target.value })}
												/>
												<span className="has-icon"><i className="ti-user"></i></span>
												<FormErrorMessage
													 message={errorMessages.name}
												/>
											</FormGroup>
											<FormGroup className="has-wrapper">
												<Input
													type="email"
													value={email}
													name="email"
													className="has-input input-lg"
													placeholder="Enter Email Address"
													onChange={(e) => this.setState({ email: e.target.value })}
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
													name="password"
													className="has-input input-lg"
													placeholder="Password"
													onChange={(e) => this.setState({ password: e.target.value })}
												/>
												<span className="has-icon"><i className="ti-lock"></i></span>
												<FormErrorMessage
													 message={errorMessages.password}
												/>
											</FormGroup>
											<FormGroup className="mb-15">
												<Button
													className="btn-info text-white btn-block w-100"
													variant="raised"
													size="large"
													onClick={() => this.onUserSignUp()}>Sign Up
                       							</Button>
											</FormGroup>
										</Form>
										<p className="text-muted">By signing up you agree to {AppConfig.brandName}</p>
										<p><Link to="/terms-condition" className="text-muted">Terms of Service</Link></p>
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

const mapStateToProps = ({ generalReducer }) => {
	let { errorMessages } = generalReducer;
	return { errorMessages };
};

export default connect(mapStateToProps, {
	createAccountAndUser,
	generalFormFailureRestart
})(SignUp);
