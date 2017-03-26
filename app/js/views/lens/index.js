import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getLenses} from 'actions/lens';

@connect(state => ({
    asyncLoading: state.app.get('asyncLoading'),
    lenses: state.app.get('lenses'),
}))
export default class Lens extends Component {

    static propTypes = {
        asyncLoading: PropTypes.bool,
        lenses: PropTypes.array,
        dispatch: PropTypes.func,
    }

    constructor() {
        super();

    }

    componentDidMount() {
        if (this.props.lenses.length === 0) {
            const {dispatch} = this.props
            dispatch(getLenses(`id=${this.props.params.id}`));
        }

    }

    buildLensDetail = (lenses, id) => {
        return (
            <div className="lensDetail">
                {
                    lenses.map(e => {
                        if (e.get('id') === id) {
                            const gallery = e.get('gallery');
                            return (
                                <div key={id}>
                                    <h2>{e.get('name')}</h2>
                                    <hr />
                                    <div className="lensInfo">
                                        <p>Vendor: {e.get('vendor')}</p>
                                        <p>typeName: {e.get('typeName')}</p>
                                        <p>focalRange: {e.get('focalRange')}</p>
                                        <p>maxAperture: {e.get('maxAperture')}</p>
                                        <p>elements: {e.get('elements')}</p>
                                        <p>mfd: {e.get('mfd')}</p>
                                        <p>weight: {e.get('weight')}</p>
                                    </div>
                                    <div className="wrap">
                                        {
                                            gallery.map((g, index) => {
                                                return (
                                                    <div key={index} className="box">
                                                        <div className="boxInner">
                                                            {<img src={`http://m42lens.com/${g}`}/>}
                                                        </div>
                                                    </div>)
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }

    render() {
        if (this.props.lenses.length === 0) {
            return (<div>Loading ...</div>);
        }

        return (
            <div className='Lens'>
                {
                    this.buildLensDetail(this.props.lenses, this.props.params.id)
                }
            </div>
        );
    }
}
