import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

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
        const file = lens.get('file');

        return (
            <div>
                <span>{lens.get('name')}</span>
                { file ? <img src={`assets/img/${file}`}/> : null }
                <br/>
                <span>{lens.get('description')}</span>
                <hr/>
            </div>
        );
    }

    buildLensesList = (lenses) => {
        return (
            <ul>
                {
                    lenses.map(e =>
                        <li key={e.get('id')}> { this.buildLensItem(e) } </li>
                    )
                }
            </ul>);
    }

    render() {
        const {asyncLoading, lenses} = this.props;
        return (
            <div className='Home'>
                <p>Home page</p>
                { asyncLoading ? <p>loading ...</p> : null }
                { lenses ? this.buildLensesList(lenses) : null }
            </div>
        );
    }
}
