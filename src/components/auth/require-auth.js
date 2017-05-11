import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import Spinner from '../Spinner';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends Component {
        componentWillMount() {
            if (this.props.isAuthenticated === false) {
                browserHistory.push('/Login')
            }
        }
        componentWillUpdate(nextProps) {
            if (nextProps.isAuthenticated === false) {
                browserHistory.push('/Login')
            }
        }
        render() {
            return (
                <div>
                    <Spinner />
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        const { loginReducer } = state;
        const { isAuthenticated } = loginReducer;

        return {
            isAuthenticated
        }
    }

    return connect(mapStateToProps)(AuthenticatedComponent)
}
