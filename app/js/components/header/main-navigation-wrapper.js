import React, {Component, PropTypes} from 'react';
import classNames from 'classname';

import {IndexLink, Link} from 'react-router';
import {routeCodes} from '../../routes';

export default class MainNavigationWrapper extends Component {

    static propTypes = {
        toggleNavigationMenu: PropTypes.bool,
    }

    static defaultProps = {
        toggleNavigationMenu: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            toggleSubMenu: false,
        };
    }


    subMenuItemClick = (e) => {
        e.preventDefault();
        this.setState({
            toggleSubMenu: !this.state.toggleSubMenu
        });


    }

    render() {
        const toggleSubMenuClass = classNames({
            'cd-main-nav': true,
            'moves-out': this.state.toggleSubMenu,
            'nav-is-visible': this.props.toggleNavigationMenu
        })

        return (
            <nav className="cd-main-nav-wrapper">
                <ul className={toggleSubMenuClass}>
                    <li><a href="#0">About</a></li>
                    <li><a href="#0">Projects</a></li>
                    <li><a href="#0">Blog</a></li>
                    <li><a href="#0">Contact</a></li>
                    <li>
                        <a href="#0"
                           className="cd-subnav-trigger"
                           onClick={this.subMenuItemClick}
                        >
                            <span>Categories</span>
                        </a>
                        <ul>
                            <li className="go-back" onClick={this.subMenuItemClick}><a href="#0">Menu</a></li>
                            <li><a href="#0">Category 1</a></li>
                            <li><a href="#0">Category 2</a></li>
                            <li><a href="#0">Category 3</a></li>
                            <li><a href="#0">Category 4</a></li>
                            <li><a href="#0">Category 5</a></li>
                            <li><a href="#0" className="placeholder">Placeholder</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}

