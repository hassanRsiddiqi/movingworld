import React, { Component } from "react";
import product from "../db/product"; // our Initial state
import List from "./List";

var activeImage = {
  backgroundImage: `url("/images/button_blue.png")`,
};
var disableImage = {
  backgroundImage: `url("/images/button.png")`,
};
var abc = {
  backgroundImage: `url("/images/input_box.png")`,
};
export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      product: product,
      price: "",
      isRequested: false,
    };
  }
  createBidContent(price) {
    return {
      id: 263579,
      amount: parseInt(price),
      status: "Placed",
      created_at: Date.now(),
      driver: {
        first_name: "You",
      },
    };
  }
  clearData = () => {
    this.setState({ price: "" });
  };
  updatePrice = (e) => {
    let price = e.target.value;
    this.setState({ price });
  };
  /*
   * Create Bid
   */
  postBid = () => {
    let { price, product } = this.state;
    product.data.bids.data.push(this.createBidContent(price));
    this.setState({ product: product, isRequested: true });
    this.clearData();
  };
  /*
   * Update Current Bid
   */
  updateBid = () => {
    let { price, product } = this.state;
    let bids = product.data.bids.data;
    bids = bids.map((bid) => {
      if (bid.id === 263579) {
        bid.amount = parseInt(price);
      }
      return bid;
    });
    product.data.bids.data = bids;
    this.setState({ product: product });
    this.clearData();
  };
  /*
   * Retract Bid
   */
  retractBid = () => {
    let { product } = this.state;
    let bids = product.data.bids.data;
    bids = bids.filter((bid) => bid.id !== 263579);
    product.data.bids.data = bids;
    this.setState({ product: product });
    this.clearData();
  };

  getImage() {
    if (this.state.price) return "button_blur.png";
    else return "button.png";
  }
  handleKeyPressed = (e) => {
    let code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      if (this.state.isRequested) this.updateBid();
      else this.postBid();
    }
  };
  render() {
    return (
      <div className="bids_con">
        <List list={this.state.product.data.bids.data} />
        <div className="bids_btn_con">
          <h5 className="bids_btn_hdng">Your bid:</h5>
          <div className="bids_btn_box">
            <div className="bids_btn bids_btn_input" style={abc}>
              <input
                type="number"
                name="user-bid"
                id="user-bid"
                placeholder="Your Bid"
                value={this.state.price}
                onChange={this.updatePrice}
                onKeyPress={this.handleKeyPressed}
              />
            </div>
            {!this.state.isRequested ? (
              <div
                className="bids_btn bids_btn_btn disable"
                style={this.state.price ? activeImage : disableImage}
              >
                <button type="button" className="btn" onClick={this.postBid}>
                  Place Bid
                </button>
              </div>
            ) : (
              <>
                <div
                  className="bids_btn bids_btn_btn active"
                  style={activeImage}
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={this.updateBid}
                  >
                    Update
                  </button>
                </div>
                <div className="bids_btn bids_btn_btn" style={activeImage}>
                  <button
                    type="button"
                    className="btn"
                    onClick={this.retractBid}
                  >
                    Retract
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
