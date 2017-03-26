import React, {Component, PropTypes} from 'react';

import MainNavigationWrapper from './main-navigation-wrapper';

import {Link} from 'react-router';

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
                    <Link to="/"><img src="../../../assets/img/cd-logo.svg" alt="Logo" /></Link>
                </div>
                { this.props.device === 'desktop' ? <MainNavigationWrapper toggleNavigationMenu={this.state.toggleNavigationMenu}/> : null }
                <a className="cd-nav-trigger" onClick={this.navigationClickHandler}>Menu<span></span></a>
            </header>
        );
    }
}
