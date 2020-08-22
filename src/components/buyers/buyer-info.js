import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


const BuyerInfo = ({buyers, match}) => {

    const buyer = buyers.find(buyer => buyer.id === match.params.id)
    console.log(buyer)

    if(!buyer) {
        return <Redirect to="/404" />
    }

  return (
      <React.Fragment>
        <div className="col-4 m-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{buyer.name}</h5>
                    <hr/>
                    <div className="card-text">
                        <div className="d-flex justify-content-between">Average check:        <span>{buyer.averageCheck}р.</span></div>
                        <div className="d-flex justify-content-between">Number of purchases:  <span>{buyer.numberOfPurchases} шт.</span></div>
                        <div className="d-flex justify-content-between">Total revenues:       <span>{buyer.totalRevenues}р.</span></div>
                    </div>
                </div>
            </div>
        </div>
      </React.Fragment>
  )
};

const mapStateToProps = (state) => ({buyers: state.buyers})

export default connect(mapStateToProps)(BuyerInfo);
