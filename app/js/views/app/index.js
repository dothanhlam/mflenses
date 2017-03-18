import React, {Component, PropTypes} from 'react';

import Menu from '../../components/menu/menu';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    }


    render() {
        const {children} = this.props;

        return (
            <div>
                <header>
                    <a id="logo"></a>
                    <Menu />
                </header>
                <section>
                    { children }
                </section>
            </div>
        );
    }
}
