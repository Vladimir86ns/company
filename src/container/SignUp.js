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
import { NotificationManager } from 'react-notifications';
import APP_MESSAGES from '../constants/AppMessages';
import { setUpValidationMessageLanguage, getValidationMessage } from '../util';

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
	 * Set up validation local message.
	 */
	componentWillMount() {
		if (this.props.locale) {
			this.validator = setUpValidationMessageLanguage(this.props.locale.locale);
		}
	}

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
        if (this.validator.allValid()) {
            this.props.createAccountAndUser(this.state, this.props.history);
        } else {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
            this.validator.showMessages();
            this.forceUpdate();
        }
	};

	/**
     * Set time to remove validation messages.
     * 
     * @param {number} time 
    */
    setTimeToRemoveErrorMessage(time) {
        setTimeout(() => {
            this.props.generalFormFailureRestart();
        }, time);
    };

    /**
     * Get validation message.
     * 
     * @param {string} field 
     * @param {string} validationRule 
     */
    getValidationMessage(field, validationRule) {
        return getValidationMessage(field, validationRule, this.state[field], this.validator);
	};

	render() {
		const { name, email, password } = this.state;
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
												<FormErrorMessage message={errorMessages.name} />
                                                {this.getValidationMessage('name', 'required|min:1|max:100')}
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
												<FormErrorMessage message={errorMessages.email}	/>
												{this.getValidationMessage('email', 'required|email')}
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
												<FormErrorMessage message={errorMessages.password} />
                                                {this.getValidationMessage('password', 'required|min:6|max:30')}
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

const mapStateToProps = ({ generalReducer, settings }) => {
	let { errorMessages } = generalReducer;
	let { locale } = settings;
	
	return { errorMessages, locale };
};

export default connect(mapStateToProps, {
	createAccountAndUser,
	generalFormFailureRestart
})(SignUp);
