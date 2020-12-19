import React, { Component } from "react";

export default class List extends Component {
  render() {
    let list = this.props.list;
    return (
      <>
        <div className="bids_main_hdng">
          <h3>Existing bids:</h3>
        </div>
        <div className="bids_cntnt_con">
          <ul>
            {list.map((bids) => (
              <li key={bids.id}>
                {`${bids.driver.first_name}: $${bids.amount}`}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
