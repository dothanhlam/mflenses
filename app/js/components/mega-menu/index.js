import React, {Component, PropTypes} from 'react';
import classNames from 'classname';
import { FacebookLogin } from '../authentication/facebook-auth';


export default class MegaMenu extends Component {

    static propTypes = {
        translate: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            toggleMobileMenu: false,
        };
    }


    responseFacebook = (response)  => {
        console.log('responseFacebook: ', response);
        //anything else you want to do(save to localStorage)...
    }

    toggleMobileMenu = (e) => {
        this.setState({toggleMobileMenu: !this.state.toggleMobileMenu});
        e.preventDefault();
    }

    render() {
        const {translate} = this.props;
        const toggleMobileMenu = classNames({
            'show-on-mobile': this.state.toggleMobileMenu
        })

        return (
            <div className="menu-container">
                <div className="menu">
                    <a className="menu-mobile" onClick={this.toggleMobileMenu}>Navigation</a>
                    <ul className={toggleMobileMenu}>
                        <li><a href="/">{translate('home')}</a></li>
                        <li className="menu-dropdown-icon">
                            <a href="#">{translate('categories')}</a>
                            <ul>
                                <li><a href="#">Vendor</a>
                                    <ul>
                                        <li><a href="#">Vivitar</a></li>
                                        <li><a href="#">Bell & Howel</a></li>
                                        <li><a href="#">Carl Meyer</a></li>
                                        <li><a href="#">Albinar</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Focal range</a>
                                    <ul>
                                        <li><a href="#">100-300mm</a></li>
                                        <li><a href="#">100-200mm</a></li>
                                        <li><a href="#">135mm</a></li>
                                        <li><a href="#">100mm</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Max aperture</a>
                                    <ul>
                                        <li><a href="#">f/1.2 - f/1.4</a></li>
                                        <li><a href="#">f/1.8 - f/2.8</a></li>
                                        <li><a href="#">f/3.5 - f/4.0</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Mount</a>
                                    <ul>
                                        <li><a href="#">M42</a></li>
                                        <li><a href="#">EOS</a></li>
                                        <li><a href="#">Pentax</a></li>
                                        <li><a href="#">Others ...</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">{translate('news')}</a>
                            <ul className="normal-sub">
                                <li><a href="#">Today</a></li>
                                <li><a href="#">Calendar</a></li>
                                <li><a href="#">Sport</a></li>
                            </ul>
                        </li>
                        <li className="menu-dropdown-icon"><a href="#">{translate('contact')}</a>
                            <ul>
                                <li><a href="#">Seller</a>
                                    <ul>
                                        <li><a href="#">Seller 1</a></li>
                                        <li><a href="#">Local Seller</a></li>
                                        <li><a href="#">Online Seller</a></li>
                                        <li><a href="#">Others ...</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Study</a>
                                    <ul>
                                        <li><a href="#">Undergraduate</a></li>
                                        <li><a href="#">Masters</a></li>
                                        <li><a href="#">International</a></li>
                                        <li><a href="#">Online</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Others</a></li>
                            </ul>
                        </li>
                        <li id="search">
                            <form action="#0">
                                <input type="text" name="search_text" id="search_text" placeholder={translate('search')}/>
                            </form>
                        </li>
                        <li>
                            <FacebookLogin socialId="271112816669920"
                                           responseHandler={this.responseFacebook}/>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}