/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

// components
import SupportPage from '../Support/Support';

// redux action
import { logoutUserFromFirebase } from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class UserBlock extends Component {

	state = {
		userDropdownMenu: false,
		isSupportModal: false
	}

	/**
	 * Logout User
	 */
	logoutUser() {
		this.props.logoutUserFromFirebase();
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	/**
	 * Check does user has all information and show dropdown menu if has.
	 * @param {object} user
	*/
	checkUserHasInfo(user) {
		if (user && user.user_settings_done) {
			return (
				<DropdownToggle
				tag="div"
				className="d-flex align-items-center"
				>
				{/* TODO add user picture */}
					{/* <div className="user-profile">
						<img
							src={require('Assets/avatars/user-15.jpg')}
							alt="user profile"
							className="img-fluid rounded-circle"
							width="50"
							height="100"
						/>
					</div> */}
					<div className="user-info">
						<span className="user-name ml-4">{user.first_name} {user.last_name}</span>
						<i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
					</div>
				</DropdownToggle>
			);
		}
	}

	render() {
		return (
			<div className="top-sidebar">
				<div className="sidebar-user-block">
					<Dropdown
						isOpen={this.state.userDropdownMenu}
						toggle={() => this.toggleUserDropdownMenu()}
						className="rct-dropdown"
					>
						{ this.checkUserHasInfo(this.props.user) }
						<DropdownMenu>
							<ul className="list-unstyled mb-0">
								<li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
									<p className="text-white mb-0 fs-14">{ `${this.props.user.first_name} ${this.props.user.last_name}` }</p>
									<span className="text-white fs-14">{ this.props.user.email }</span>
								</li>
								<li>
									<Link to={{
										pathname: '/app/users/user-profile-1',
										state: { activeTab: 2 }
									}}>
										<i className="zmdi zmdi-comment-text-alt text-success mr-3"></i>
										<IntlMessages id="widgets.messages" />
										<Badge color="danger" className="pull-right">3</Badge>
									</Link>
								</li>
								<li className="border-top">
									<a href="javascript:void(0)">
										<i className="zmdi zmdi-power text-danger mr-3"></i>
										<IntlMessages id="widgets.logOut" />
									</a>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
				</div>
				<SupportPage
					isOpen={this.state.isSupportModal}
					onCloseSupportPage={() => this.onCloseSupportPage()}
					onSubmit={() => this.onSubmitSupport()}
				/>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ userReducer }) => {
	const { user } = userReducer;
	return { user };
}

export default connect(mapStateToProps, {
	logoutUserFromFirebase
})(UserBlock);
