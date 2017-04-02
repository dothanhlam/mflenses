import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import Pagination from 'rc-pagination';
import Banner from '../../components/banner';

import {getLenses} from 'actions/lens';

@connect(state => ({
    asyncLoading: state.app.get('asyncLoading'),
    lenses: state.app.get('lenses'),
    window: state.app.get('window'),
}))
export default class Home extends Component {

    static propTypes = {
        asyncLoading: PropTypes.bool,
        lenses: PropTypes.array,
        window: PropTypes.object,
        dispatch: PropTypes.func,
    }

    constructor() {
        super();
        this.state = {
            current: 1
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getLenses(`_page=${this.state.current}`));
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

    paginationChangeHandler = (page) => {
        this.setState( {
            current: page
        })

        const {dispatch} = this.props
        dispatch(getLenses(`_page=${page}`));
    }

    render() {
        const {asyncLoading, lenses, window } = this.props;
        return (
            <div>
                <Banner window={window.get('device')}/>
                { asyncLoading ? <p>loading ...</p> : null }
                { lenses ? this.buildLensesList(lenses) : null }
                <Pagination onChange={this.paginationChangeHandler} current={this.state.current} total={158} />
            </div>
        );
    }
}
