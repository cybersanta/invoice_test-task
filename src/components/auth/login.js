import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCurrentUser } from '../../actions/auth';



class Login extends React.Component {

    state = {
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
    }

    componentDidMount() {
        if(this.props.auth.user !== null) {
            this.props.history.push('/')
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.auth !== prevProps.auth){
            this.props.history.push('/')
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    async validate() {
        const validPass = new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/i)

        const res = await fetch(`https://api.github.com/users/${this.state.username}`)
        const data = await res.json()

        console.log(data)
        
        if(data.name === null) {
            this.setState({usernameError: 'User does not exist'})
        } else { this.setState({ usernameError: ''}) }

        if(!validPass.test(this.state.password)) {
            this.setState({passwordError: 'Password is not valid'});            
        } else { this.setState({passwordError: ''}) }

        if(!this.state.passwordError && !this.state.usernameError) {
            this.props.setCurrentUser({
                username: data.name,
                avatarUrl: data.avatar_url
            })
            return true
        }
    }

    onSubmit = (e) => {
        e.preventDefault()

        this.validate()
            .then(res => {
                if(res) {
                    this.props.history.push('/')
                } else console.log('=(')
            })
      }

    render() {

        return (
            <div className="row mt-4">
            <div className="col-4 mx-auto">
              <div className="card">
                <article className="card-body">
                  <h4 className="card-title text-center mb-4 mt-1">Log In</h4>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Username"
                        type="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        required
                      />
                    { this.state.usernameError ? <div className="form-text" style={{color: 'red'}}>{this.state.usernameError}</div> : null}
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        required
                      />
                    { this.state.passwordError ? <div className="form-text" style={{color: 'red'}}>{this.state.passwordError}</div> : null}
                    </div> 
                    
                    <div className="form-group">
                      <button type="submit" className="btn btn-dark btn-block">Login</button>
                    </div> 
                  </form>
                </article>
              </div>
            </div>
          </div>
        )
    }
}

Login.propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })


export default connect(mapStateToProps, { setCurrentUser })(Login)