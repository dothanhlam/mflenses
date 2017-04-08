import React, {Component, PropTypes} from 'react';

export class FacebookLogin extends Component {
    static propTypes = {
        socialId: PropTypes.string.isRequired,
        language: PropTypes.string,
        scope: PropTypes.string,
        responseHandler: PropTypes.func.isRequired,
        xfbml: PropTypes.bool,
        fields: PropTypes.string,
        version: PropTypes.string,
        class: PropTypes.string,
    }

    static defaultProps = {
        language: "en_US",
        scope: "public_profile,email",
        xfbml: true,
        fields: "id,email,name",
        version: "v2.8",
        class: "facebook-login",
    };

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
        }
    }

    updateAuthenticationStatus = (response) => {
        console.log('updateAuthenticationStatus: ', response.status)
        this.setState({isConnected:response.status === 'connected'})
    }

    componentDidMount() {
        (function (d, s, id) {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = () => {
            FB.Event.subscribe('auth.statusChange', this.updateAuthenticationStatus);

            FB.init({
                appId: this.props.socialId,
                xfbml: this.props.xfbml,
                cookie: this.props.cookie,
                version: this.props.version,
                status: true, // check login status
            });

        //    FB.getLoginStatus(this.updateAuthenticationStatus);
        }
    }

    responseApi = (authResponse)  => {
        FB.api('/me', { fields: this.props.fields }, (me) => {
            me.accessToken = authResponse.accessToken;
            this.props.responseHandler(me);
        });
    };

    checkLoginState = (response) => {
        if (response.authResponse) {
            this.responseApi(response.authResponse);
        } else {
            if (this.props.responseHandler) {
                this.props.responseHandler({ status: response.status });
            }
        }
    };

    buildComponents = (state) => {
        if (state.isConnected) {
            return (
                <button onClick={(e) => {
                    e.preventDefault();
                    FB.logout(this.updateAuthenticationStatus)}
                }>
                    Logout
                </button>
            )
        }

        return (
            <button onClick={(e) => {
                e.preventDefault();
                FB.login(this.checkLoginState, { scope: this.props.scope });
            }}>
                Login
            </button>
        )
    }

    render() {
        return (
            <div>
                { this.buildComponents(this.state) }
            </div>
        )
    }
}
