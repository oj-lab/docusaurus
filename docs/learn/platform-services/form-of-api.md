---
sidebar_position: 1
---

# Form of API

As platform which provides remote control of the whole website system,
there are many choices of API form:

- **RESTful** The most popular form of API, can be built by very basic HTTP server.
- **GraphQL** Provide a flexible way to query data.
- **gRPC-web** Better serialization and deserialization performance. Restricted usage by Proto definition.

It's worth noting that, each of the API form has its own advantages and disadvantages.
But they are really close, they are all posible to realize stateless and single side streaming API.

In my conclusion, you can make the choice by the following factors:

- If you want to build a website system which is easy to be used by other developers, use **RESTful**.
- If you want to provide a very flexible query with field choosing, use **GraphQL**.
- If you have extra requirements on reliability for developing, use **gRPC-web**.

## RESTful Development Solution

OJ Lab choose **RESTful** as the form of API, mostly because as the most popular form of API,
**RESTful** has the most mature ecosystem, and has many useful tools to help us build the Application.
(Like swagger, mock server, etc.)

The tools we used in OJ Lab includes:

- [Gin Web Framework](https://gin-gonic.com/), WIP guide: [Gin Web Framework]
- [Swaggo/swag](https://github.com/swaggo/swag), WIP guide: [Swaggo/swag]
- [MSW API mocking](https://mswjs.io/), WIP guide: [MSW API mocking]

## Related Links

See more: [RESTful API Design Guide](https://restfulapi.net/)
