import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import {getLenses} from 'actions/lens';

@connect(state => ({
    asyncLoading: state.app.get('asyncLoading'),
    lenses: state.app.get('lenses'),
}))
export default class Home extends Component {

    static propTypes = {
        asyncLoading: PropTypes.bool,
        lenses: PropTypes.array,
        dispatch: PropTypes.func,
    }

    constructor() {
        super();
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getLenses());
    }

    buildLensItem = (lens) => {
        const file = lens.get('gallery') ? Array.from(lens.get('gallery')) : 'no-photo.png';
        return (
            <div className="box" key={lens.get('id')} onClick={(e) => {
                browserHistory.push(`/lens/${lens.get('id')}`);
            }}>
                <div className="boxInner">
                    {<img src={`http://m42lens.com/${file[0]}`}/>}
                    <div className="titleBox">{lens.get('name')}</div>
                </div>
            </div>
        );
    }

    buildLensesList = (lenses) => {
        return (
            <div className="wrap">
                {
                    lenses.map(e => this.buildLensItem(e))
                }
            </div>);
    }

    render() {
        const {asyncLoading, lenses} = this.props;
        return (
            <div>
                { asyncLoading ? <p>loading ...</p> : null }
                { lenses ? this.buildLensesList(lenses) : null }
            </div>
        );
    }
}
