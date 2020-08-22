import React from 'react';
import { connect } from 'react-redux';

import { addTerminal, removeTerminal } from '../../actions/terminals'


class TerminalsAddForm extends React.Component {

    state = {
        terminalName: '',
        description: ''
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})


    render() {
        return(
            <div className="col-md-7 m-3">
              <div className="card">
                <article className="card-body">
                  <h4 className="card-title text-center mb-4 mt-1">Аdding a terminal</h4>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Terminal name"
                        type="terminalName"
                        name="terminalName"
                        value={this.state.terminalName}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        style={{maxHeight: "100px"}}
                        className="form-control"
                        placeholder="Description"
                        type="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                      />
                    </div> 
                    
                    <div className="form-group">
                      <button type="button" 
                              className="btn btn-dark btn-block" 
                              onClick={() => { 
                                  this.props.addTerminal({id: Date.now(), description: this.state.description, terminalName: this.state.terminalName}) 
                                  this.setState({
                                    terminalName: '',
                                    description: ''
                                  })
                                }}
                    >
                    Add
                    </button>
                    </div> 
                </article>
              </div>
            </div>
        )
    }
}

const TerminalTable = ({terminals, removeTerminal}) => {

    return(
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Termianl Name</th>
                    <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        terminals.map(terminal => {
                            return(
                                <tr key={terminal.id}>
                                    <th scope="row">{terminal.id}</th>
                                    <td>{terminal.terminalName}</td>
                                    <td>{terminal.description}</td>
                                    <td><button className='btn btn-danger btn-block' onClick={() => removeTerminal(terminal.id)}>Remove</button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
    )
}

const mapStateToProps = (state) => ({ terminals: state.terminals })

const TerminalContainer = ({terminals, addTerminal, removeTerminal}) => {

    return(
        <React.Fragment>
            <TerminalsAddForm addTerminal={addTerminal}/>
            <TerminalTable terminals={terminals} removeTerminal={removeTerminal}/>
        </React.Fragment>
    )
}
    

export default connect(mapStateToProps, { addTerminal, removeTerminal })(TerminalContainer)