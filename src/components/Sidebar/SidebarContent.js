/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import { onToggleMenu } from 'Actions';

class SidebarContent extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        }
        this.props.onToggleMenu(data);
    }

    render() {
        const { sidebarMenus } = this.props.sidebar;
        const sidebarList = sidebarMenus.category1.map((menu, key) => {
            const { user_settings_done, company_settings_done } = this.props.user;
            if ((user_settings_done && company_settings_done) || menu.menu_title === 'sidebar.user_settings' || menu.menu_title === 'sidebar.company') {
                return (
                    <NavMenuItem
                    menu={menu}
                    key={key}
                    onToggleMenu={() => this.toggleMenu(menu, 'category1')}
                />
                );
            }
        });
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                    {/* NOTICE for now do not need to show sub header */}
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled">
                        {sidebarList}
                    </List>
                </nav>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ sidebar, accountReducer, userReducer }) => {
    const { account } = accountReducer;
    const { user } = userReducer;
    return { sidebar, account, user };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
