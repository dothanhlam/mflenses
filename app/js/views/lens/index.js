import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getLenses} from 'actions/lens';
import Lightbox from 'react-images';

@connect(state => ({
    asyncLoading: state.app.get('asyncLoading'),
    lenses: state.app.get('lenses'),
    account: state.app.account,
}))
export default class Lens extends Component {

    static propTypes = {
        asyncLoading: PropTypes.bool,
        lenses: PropTypes.array,
        account: PropTypes.object,
        dispatch: PropTypes.func,
    }

    constructor() {
        super();
        this.state = {
            lightboxIsOpen: false,
            currentImage: 0,
        };
    }

    componentDidMount() {
        if (this.props.lenses.length === 0) {
            const {dispatch} = this.props
            dispatch(getLenses(`id=${this.props.params.id}`));
        }

    }

    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    openLightbox = (index, event) => {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    }

    buildLensInfo = (e) => {
        return (
            <div className="lensInfo">
                <p>Vendor: {e.get('vendor')}</p>
                <p>typeName: {e.get('typeName')}</p>
                <p>focalRange: {e.get('focalRange')}</p>
                <p>maxAperture: {e.get('maxAperture')}</p>
                <p>elements: {e.get('elements')}</p>
                <p>mfd: {e.get('mfd')}</p>
                <p>weight: {e.get('weight')}</p>
            </div>
        );
    }

    buildImageGallery = (images) => {
       return (
           <div className="wrap">
               {

                   images.map((image, index) => {
                       return (
                           <div key={index} className="box" onClick={(e) => this.openLightbox(index, e)}>
                               <div className="boxInner">
                                   {<img src={image.src}/>}
                               </div>
                           </div>)
                   })
               }
           </div>
       );
    }

    buildLensDetail = (lenses, id) => {
        const e = lenses.find(lens => lens.get('id') === id);
        const gallery = e.get('gallery');
        const images = Array.from(gallery.map(e => {
            return {src: `http://m42lens.com/${e}`}
        }));

        return (
            <div className="lensDetail">
                <h2>{e.get('name')}</h2>
                <hr />

                { this.buildLensInfo(e) }

                { this.buildImageGallery(images) }

                <Lightbox
                    images={images}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClose={this.closeLightbox}
                />
            </div>
        );
    }

    render() {
        const {lenses, params, account} = this.props;
        if (this.props.lenses.length === 0) {
            return (<div>Loading ...</div>);
        }

        return (
            <div className='Lens'>
                {
                    this.buildLensDetail(lenses, params.id, account)
                }
            </div>
        );
    }
}
