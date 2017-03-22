import React, {Component, PropTypes} from 'react';

import Header from '../../components/header/header';

import MainNavigationWrapper from '../../components/header/main-navigation-wrapper';
import classNames from 'classname';


export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            device: '',
            navigateVisible: false,
        };
    }

    updateDimensions = () => {
        const isMobile = window.innerWidth <= 1024;
        this.setState({device: isMobile ? 'mobile' : 'desktop'});
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


    toggleMe = () => {
        this.setState({  navigateVisible: !this.state.navigateVisible});
    }

    render() {
        const {children} = this.props;
        const contentClass = classNames({
            'cd-main-content': true,
            'nav-is-visible': this.state.navigateVisible
        })
        return (
            <div>
                <Header device={this.state.device} toggleParent={this.toggleMe}/>
                <main className={contentClass}>
                        { children }
                </main>
                { this.state.device === 'mobile' ? <MainNavigationWrapper toggleNavigationMenu={this.state.navigateVisible} /> : null }
            </div>
        );
    }
}
