This is a Todo-list API built using FastAPI, SQLite3 and sqlalchemy

### How to run the project

This project comprises of both the server and client code for the todo app. You can identify them in the root directory of the project.

- **Client:**
The client application is built using NextJS and vitest. Feel free to explore the application directory.
To start the next application, `cwd` into the `client` directory and take the following steps:

> If you are using `npm` remember to remove the `yarn.lock` file before running the install command. Similarly, if you are using `yarn` ensure that the `package-lock.json` file is removed as well before running the install command

1. Install all the packages. You can use `yarn` or `npm`. 
```shell
yarn install
# OR
npm install
```

2. Run the command: `yarn dev` or `npm run dev` on your terminal to start the NextJS app


- **Server:**
The server applications is built using FastAPI, SQLAlchemy and SQLite as Database.
In order to run the server app, simply `cwd` into the `server` directory and follow the steps below:

1. Create a virtual enviironment to run the python project

```shell
python3 -m venv .
```
2. Next, install all the packages using `pip`. There is a `requirements.txt` file inside the root of the `server`directory. You should use that file to get the list of required packages for this project.

3. Finally, run the `make start` command on your terminal to start the FastAPI application.

## Other topics

### Install FastAPI with all optional dependencies
To install FastAPI with all optional dependencies, you can use the following command:
```bash
pip install "fastapi[standard]"
````

### About `Uvicorn`
`Uvicorn` is an ASGI web server implementation for Python.


- To generate the `requirements.txt` file, use the following command:
```shell
pip freeze > requirements.txt
```

