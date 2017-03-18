import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {routeCodes} from '../../routes';

export default class Menu extends Component {

    render() {
        return (
            <nav>
                <a id="menu-icon"></a>
                <ul>
                    <li><IndexLink to={ routeCodes.HOME }>Home</IndexLink></li>
                    <li><Link to={ routeCodes.ABOUT }>About</Link></li>
                    <li><Link to='404'>404</Link></li>
                </ul>
            </nav>
        );
    }
}
