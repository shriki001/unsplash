# To run the application

```bash
docker-compose up -d --build
```

Note: need to add unsplush key to .env file
API calls can be made to the following endpoints:

# Orders API

-- GET http://localhost:5000/orders/<user_id>

-- POST http://localhost:5000/orders \
body:{ \
"username":"bla bla", \
"email":"1@a.com", \
"fullName":"someone", \
"fullAddress": "somewhere", \
"imageUrls": ["http://loclahost"], \
"frameColor":"blue" \
}

# photos API

-- GET http://localhost:5000/photos?count=<count>
