import React, { Component } from "react";

import CardsContainer from "../../components/CardsComponents/cardsContainer/CardsContainer";

const getTechData = `{
  category(input: {
    title: "tech"
  }){
    products {
      id
      name
      category
      gallery
      inStock
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  }
}`;

export default class Tech extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], finished: false };
  }

  componentDidMount() {
    const getData = async () => {
      fetch("http://localhost:4000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getTechData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ products: data.data.category.products });
          this.setState({ finished: true });
        });
    };
    getData();
  }

  render() {
    return (
      <>
        {this.state.finished ? (
          <CardsContainer
            products={this.state.products}
            categoryName={"TECH"}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}
