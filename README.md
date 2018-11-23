"# back-end-oiga"

**Install**

npm install

**Eslint config**

npm run eslint

**start server**

npm start

**USERS**

    {
        username: string,
        type: ['admin', 'company'],
        password: string
    }

types:

    company
    admin
    
**PRODUCTS**

    {
        name: string,
        price: number,
        descripcion: string,
        photo: blob,
        user: USERS,
        createdAt: Date,
    }
    
 **ORDERS**
 
    {
        subject: string,
        company: USERS,
        total: number,
        products: [PRODUCTS],
        createdAt: Date
    }

**END POINTS**

 users:
  
    get     users/:username             : (admin)   find user by username.
    get     users/                      : (admin)   list users.
    post    users/login                 : (any)     to get bearer token recive {username, password}.
    post    users/                      : (admin)   create an user.
    put     users/:id                   : (admin)   update user.
    
products:
    
    get     produts/                    : (any)     list products.
    get     products/:prop/:valueprop   : (any)     list products by any field.
    get     products/:id                : (any)     list  by id.
    post    products/                   : (admin)   create a product.
    put     products/:id                : (admin)   update product.
    delete  products/:id                : (admin)   delete product.
    
orders:

    get     orders/                     : (admin)   list all orders. (company) list its owns orders.
    get     orders/:prop/:valueprop     : (admin)   list all orders by any field. (company) list its owns orders by any field.
    get     orders/:id                  : (admin)   list any order. (company) list its owns orders.
    post    orders/                     : (company) create an order.
    put     orders/:id                  : (admin)   update an order.
    delete  orders/:id                  : (admin)   delete an order.
    
    
**lOGIN oAUTH2 with JWT**

1 GET TOKEN
    
    REQUEST:
    POST /users/login HTTP/1.1
    Host: {BANCEND SERVER LOACTION PORT 9900}
    Content-Type: application/json
    {"username": "admin", "password": "1234"}
    
    RESPONSE:
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViZjc2ZjVjZjA1YzM3ZjA2NmUwYjQ1NyIsInVzZXJuYW1lIjoiYWRtaW4iLCJ0eXBlIjoiYWRtaW4iLCJwYXNzd29yZCI6IjEyMzQifSwiaWF0IjoxNTQyOTQ2MzUyLCJleHAiOjE1NDI5NDYzODJ9.xDWbwa26HJcmaf9C30gK8kjro-04Gw7CaVLAqynJhC8"
    }
  
2 USE TOKEN WITH BEARER AUTHENTICATION

    REQUEST:
    GET /users HTTP/1.1
    Host: {BANCEND SERVER LOACTION PORT 9900}
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViZjc2ZjVjZjA1YzM3ZjA2NmUwYjQ1NyIsInVzZXJuYW1lIjoiYWRtaW4iLCJ0eXBlIjoiYWRtaW4iLCJwYXNzd29yZCI6IjEyMzQifSwiaWF0IjoxNTQyOTQ2MzUyLCJleHAiOjE1NDI5NDYzODJ9.xDWbwa26HJcmaf9C30gK8kjro-04Gw7CaVLAqynJhC8

    RESPONSE:
    [
        {
            "_id": "5bf76f5cf05c37f066e0b457",
            "username": "admin",
            "type": "admin",
            "password": "1234"
        },
        {
            "_id": "5bf76f6ff05c37f066e0b45d",
            "username": "company",
            "type": "company",
            "password": "5678"
        }
    ]
