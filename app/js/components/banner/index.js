import React, {Component, PropTypes} from 'react';
//import Carousel from 'nuka-carousel';

class Banner extends Component {
    static propTypes = {
        window: PropTypes.string,
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="slider">
                <figure>
                    <img src="assets/banner/slider1.jpg"/>
                    <img src="assets/banner/slider2.jpg"/>
                    <img src="assets/banner/slider3.jpg"/>
                    <img src="assets/banner/slider1.jpg"/>
                    <img src="assets/banner/slider2.jpg"/>
                </figure>
            </div>
        );
    }
}

export default Banner;

