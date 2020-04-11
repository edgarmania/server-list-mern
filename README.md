# server-list-mern

This is a basic MERN app.  It shows a list of servers that can be reserved for a user. 

# Development Environment:
    To start: docker-compose -f dev-docker-compose.yml up --build
    Go to: http://localhost:3000


# TODO:
# Test Production Env 

The passwords and other secrets will be kept in .env file.  Docker will parse this file duirng the image build.  There are other options, but this is the simple way.  In the project root directory (server-list-mern) create a .env file:
```env
# .env
MONGO_URI=db:27017/db?authSource=admin
PORT=4000
MONGO_PORT=27017
MONGO_INITDB_ROOT_USERNAME=your-user-name-here
MONGO_INITDB_ROOT_PASSWORD=your-user-names-password-here
NODE_ENV=production
```

    To start: docker-compose -f test-docker-compose.yml up --build
# Production Env
