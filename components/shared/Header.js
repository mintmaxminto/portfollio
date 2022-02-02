import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'reactstrap';

import auth0Client from '../../services/auth0';
import Navlink from '../NavLink/Navlink';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.toggle=this.toggle.bind(this);
        this.toggleDropdown=this.toggleDropdown.bind(this);
        this.state = {
            isOpen: false,
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    renderBlogMenu() {
        const { isSiteOwner } = this.props; 

        if(isSiteOwner) {
            return (
                <Dropdown className='port-navbar-link port-dropdown-menu' nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle className='port-dropdown-toggle' nav caret>
                        Blog
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <Navlink className='port-dropdown-item' link='/blogs' name='Blogs'/>
                        </DropdownItem>
                        <DropdownItem>
                            <Navlink className='port-dropdown-item' link='/blogs/dashboard' name='My Blogs'/>
                        </DropdownItem>
                        <DropdownItem>
                            <Navlink className='port-dropdown-item' link='/blogs/new' name='Create Blog'/>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )
        }

        return (
            <NavItem className="port-navbar-item">
                <Navlink link='/blogs' name='Blogs'/>
            </NavItem>
        )
    }

    render() {
        const { isAuthenticated, user, className } = this.props;
        const { isOpen }  = this.state;

        const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';

        return (
            <div>
            <Navbar className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`} color="transparent" dark expand="md">
                <NavbarBrand className="port-navbar-brand" href="/">Waqas Hassan</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="port-navbar-item">
                          <Navlink link='/' name='Home'/>
                        </NavItem>
                        {this.renderBlogMenu()}
                        <NavItem className="port-navbar-item">
                            <Navlink link='/portfolios' name='Portfolios'/>
                        </NavItem>
                        <NavItem className="port-navbar-item">
                            <Navlink link='/cv' name='CV'/>
                        </NavItem>
                        <NavItem className="port-navbar-item">
                            <Navlink link='/about' name='About'/>
                        </NavItem>
                        {
                            !isAuthenticated &&
                            <NavItem className="port-navbar-item">
                            <span onClick={auth0Client.login} className="nav-link port-navbar-link clickable">Login</span>
                            </NavItem>
                        }
                        {
                            isAuthenticated &&
                            <NavItem className="port-navbar-item">
                            <span onClick={auth0Client.logout} className="nav-link port-navbar-link clickable">Logout</span>
                            </NavItem>
                        }
                         {
                            isAuthenticated &&
                            <NavItem className="port-navbar-item">
                            <span className="nav-link port-navbar-link clickable">{user.nickname}</span>
                            </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        )
    }
}

