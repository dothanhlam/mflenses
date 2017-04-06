import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import MegaMenu from '../../components/mega-menu';
import { withTranslate } from 'react-redux-multilingual'

import { windowSizeChanged } from '../../actions/app';

@withTranslate
@connect(state => ({
    window: state.app.get('window'),
}))
export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
        dispatch: PropTypes.func,
        translate: PropTypes.func,
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
        console.log('params: ', this.props);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        const {children, translate} = this.props;
        return (
            <div>
                <MegaMenu />
                {translate('hello', { name: 'John Doe' })}
                { children }
            </div>
        );
    }
}
