const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
  type Query {
    products : [Product]
    orders: [Order]
  }
  type Product {
    id: ID!
    description: String
    price: Int!
    reviews: [Review]
  }
  type Review {
    rating: Int!
    comment: String
  }
  type Order {
    subtotal: Int!
    items :[OrderItem]
  }
  type OrderItem {
    product : Product!
    quantity: Int!
  }
`);

const root = {
  products: [
    {
      id: "red_shoes",
      price: 260,
      description: "this is red shoe",
      reviews: [
        {
          rating: 2,
          comment: "this is good product"
        }
      ]
    },
    {
      id: "blue_shoes",
      price: 350,
      description: "this is blue shoe",
      reviews: [
        {
          rating: 5,
          comment: "this is bad product"
        }
      ]
    }
  ],
  orders: [
    {
      subtotal: 100,
      items: [
        {
          product: {
            id: "red_shoes"
          },
          quantity: 10
        }
      ]
    },
    {
      subtotal: 200,
      items: [
        {
          product: {
            id: "blue_shoes"
          },
          quantity: 20
        }
      ]
    }
  ]
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("runinng qraphql server ...");
});
