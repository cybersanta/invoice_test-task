import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderBy } from 'lodash';

import Pagination from '../pagination/pagiation'

const invertDirection = {
    asc: "desc",
    desc: "asc"
  };

class Buyers extends React.Component {

    state = {
        columnToSort: '',
        sortDirection: 'desc',
        currentPage: 1,
        maxItemPerPage: 5, 
        search: ''
    }

    handleSort = columnName => {
        this.setState(state => ({
          columnToSort: columnName,
          sortDirection:
            state.columnToSort === columnName
              ? invertDirection[state.sortDirection]
              : "asc"
        }));
    };

    handleChangeMaxItem = maxItem => {
        this.setState({
            maxItemPerPage: maxItem,
            currentPage: 1
        })
    } 

    searchItems(items, search) {
        if (search.length === 0) {
          return items;
        }
    
        return items.filter((item) => {
          return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    render() {

        let { buyers } = this.props
        buyers = orderBy(buyers, this.state.columnToSort, this.state.sortDirection)

        buyers = this.searchItems(buyers, this.state.search)

        const indexOfLastPost = this.state.currentPage * this.state.maxItemPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.maxItemPerPage;
        const currentBuyers = buyers.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNumber => this.setState({currentPage: pageNumber});

        const styleMaxItemOnPage = {
            'marginLeft': '8px',
            'color': 'blue',
            'cursor': 'pointer',
        }

        return(
            <React.Fragment>
                <input type="text"
                       className="form-control"
                       placeholder="Type name to search"
                       value={this.state.term}
                       onChange={ this.onChange } 
                       name="search"/>
                <div className="d-flex justify-content-end m-2">
                    Show:  
                    <span style={styleMaxItemOnPage} onClick={() => this.handleChangeMaxItem(5)}> 5 </span>
                    <span style={styleMaxItemOnPage} onClick={() => this.handleChangeMaxItem(10)}>10 </span>
                    <span style={styleMaxItemOnPage} onClick={() => this.handleChangeMaxItem(15)}>15</span>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Buyer ID</th>
                        <th scope="col">Buyer's name</th>
                        <th onClick={() => this.handleSort('averageCheck')} 
                            scope="col"
                            style={{'cursor': 'pointer'}}>
                                Average check { this.state.columnToSort === 'averageCheck' ? (this.state.sortDirection === 'asc' ? '↑' : '↓') : null}
                        </th>
                        <th onClick={() => this.handleSort('numberOfPurchases')} 
                            scope="col"
                            style={{'cursor': 'pointer'}}>
                                Number of purchases { this.state.columnToSort === 'numberOfPurchases' ? (this.state.sortDirection === 'asc' ? '↑' : '↓') : null}
                        </th>
                        <th onClick={() => this.handleSort('totalRevenues')} 
                            scope="col"
                            style={{'cursor': 'pointer'}}>
                                Total revenues { this.state.columnToSort === 'totalRevenues' ? (this.state.sortDirection === 'asc' ? '↑' : '↓') : null}
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentBuyers.map(buyer => {
                                return(
                                    <tr key={buyer.id}>
                                        <th scope="row"><Link to={`/buyers/${buyer.id}`}>{buyer.id}</Link></th>
                                        <td>{buyer.name}</td>
                                        <td>{buyer.averageCheck}р.</td>
                                        <td>{buyer.numberOfPurchases} шт.</td>
                                        <td>{buyer.totalRevenues}р.</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                { buyers.length > this.state.maxItemPerPage ? 
                    <Pagination postsPerPage={this.state.maxItemPerPage} totalPosts={buyers.length} paginate={paginate} currentPage={this.state.currentPage}/> 
                    : null 
                }
            </React.Fragment>
        )  
    }
    
}

const mapStateToProps = (state) => ({buyers: state.buyers})

export default connect(mapStateToProps)(Buyers)