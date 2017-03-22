import React, {Component, PropTypes} from 'react';
import classNames from 'classname';

import MainNavigationWrapper from './main-navigation-wrapper';

import {IndexLink, Link} from 'react-router';
import {routeCodes} from '../../routes';

export default class Header extends Component {

    static propTypes = {
        device: PropTypes.string,
        toggleParent: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            toggleNavigationMenu: false,
        };
    }

    navigationClickHandler = (e) => {
        e.preventDefault();
        this.setState({
            toggleNavigationMenu: !this.state.toggleNavigationMenu
        });

        if (this.props.toggleParent) {
            this.props.toggleParent();
        }
    }



    render() {

        return (
            <header className={ this.state.toggleNavigationMenu ? "nav-is-visible" : null }>
                <div className="cd-logo">
                    <a href="#0"><img src="../../../assets/img/cd-logo.svg" alt="Logo" /></a>
                </div>
                { this.props.device === 'desktop' ? <MainNavigationWrapper toggleNavigationMenu={this.state.toggleNavigationMenu}/> : null }
                <a className="cd-nav-trigger" onClick={this.navigationClickHandler}>Menu<span></span></a>
            </header>
        );
    }
}
