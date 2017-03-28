import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../../components/header/header';

import MainNavigationWrapper from '../../components/header/main-navigation-wrapper';
import classNames from 'classname';

import { windowSizeChanged } from '../../actions/app';

@connect(state => ({
    window: state.app.get('window'),
}))
export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
        dispatch: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            device: '',
            navigateVisible: false,
        };
    }

    updateDimensions = () => {
        const {dispatch} = this.props
        const isMobile = window.innerWidth <= 1024;
        const device  = isMobile ? 'mobile' : 'desktop';
        this.setState({device});
        dispatch(windowSizeChanged({
            width: window.innerWidth,
            height: window.innerHeight,
            device }));
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }


    toggleNavigateVisible = () => {
        this.setState({  navigateVisible: !this.state.navigateVisible});
    }

    renderSubCategoriesArea = () => {
        return (
            <div>
                category goes here
            </div>
        );
    }

    render() {
        const {children} = this.props;
        const contentClass = classNames({
            'cd-main-content': true,
            'nav-is-visible': this.state.navigateVisible
        })
        return (
            <div>
                <Header device={this.state.device} toggleParent={this.toggleNavigateVisible}/>
                <main className={contentClass}>
                        { children }
                </main>
                { this.state.device === 'mobile' ? <MainNavigationWrapper toggleNavigationMenu={this.state.navigateVisible} /> : null }
            </div>
        );
    }
}
