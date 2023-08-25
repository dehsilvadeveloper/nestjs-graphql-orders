## GraphQL

### The code-first approach

**Code-first** or **Code-only** is an approach where you only need to write the resolvers for the GraphQL server and a build tool can compile the schema and SDL based on the types or annotations included in the code. This is more common in type-safe languages, such as graphql-kotlin, where you can run reflections against source code, however, it can be used by any GraphQL server language.

### Playground

The application serves the **GraphQL Playground** on the following url:

`http://localhost:3333/graphql`

The availability of this feature is controlled by environment variable *GRAPHQL_PLAYGROUND_ENABLED*, that expects a boolean value.

You can use the examples provided on the topic **Examples of GraphQL queries** on the Playground to test the API.

### Examples of GraphQL queries

Here are provided examples of GraphQL queries so that you can test the application with the **GraphQL Playground** or with any program that can perform http requests, like **Postman** or **Insomnia**, for example.

[Postman](https://www.postman.com/downloads/)

[Insomnia](https://insomnia.rest/download)

#### Order

##### Create

###### Option 1

Query

```graphql
mutation {
  createOrder(
    data: {
      total: 101.55
      freightValue: 5.30
      origin: "mobile"
      discount: 0
      paymentTypeId: 1
      orderStatusId: 1
      storeId: 1
    }
  ) {
    id
    total
    freightValue
    origin
    discount
    createdAt
    updatedAt
    paidAt
    deletedAt
    paymentType {
      name
    }
    orderStatus {
      name
    }
    store {
      name
      ecommerceUrl
      createdAt
    }
  }
}
```

###### Option 2

Query

```graphql
mutation CreateOrder($input: CreateOrderDto!) {
  createOrder(data: $input) {
    id
    total
    freightValue
    origin
    discount
    createdAt
    updatedAt
    paidAt
    deletedAt
    paymentType {
      name
    }
    orderStatus {
      name
    }
    store {
      name
      ecommerceUrl
      createdAt
    }
  }
}
```

Query variables

```json
{
  "input": {
    "total": 100,
    "freightValue": 10,
    "origin": "web",
    "discount": 0,
    "paymentTypeId": 1,
    "orderStatusId": 1,
    "storeId": 1
  }
}
```

##### Update

Query

Soon.
