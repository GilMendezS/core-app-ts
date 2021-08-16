## About this project:
A new bank requires a new 'core' to manage data related to theirs customers.
This project was developed to be a proposal to solve the necesoties of the bank.

Availables Services:
- Create a new customer
- Create a user
- Create an accout number an associate to some customer
- Create an external account number(used to relate transactions with external banks)
- Login
- Logout
- Update phone and address of users
- Lock an user account(deactivate)
- Process a payment
- Process a transfer

Implemented Stack:
- NodeJS
- Express
- Typescript
- Mysql
- Unit testing using Jest


#### Run the app:

1. First at all you need to clone this repository on your local machine, run the command bellow

```cmd
$ git clone https://github.com/GilMendezS/core-app-ts.git && cd core-app-ts
```

2. You need to configure the enviroments variables described in these files:
```bash
src/config/database.json.example
.env.example
```

You can rename them to run the app:

```
mv src/config/database.json.example src/config/database.json
mv .env.example .env
```
Note: If you decide to change the environments variables, the credentials for the database must be the same in database.json and .env
just keep unchanged the var DATABASE_HOST, to connect the "docker containers" to be created in the next steps.

3. Let'ts create the containers:
You need to run the next command to create the containers and deploy the app on your machine
```bash
doker-compose up
```
This can take a while,
after that, you will see the message "Server on port 3000" in your terminal

4. Now, you can open the next url in your browser
http://localhost:3000/api/v1
and you will see the next message: 
```json
{
    "messsage": "core app v1"
}

```
That`s it ;D

Endpoints:


POST: http://localhost:3000/api/v1/customers <br>
POST: http://localhost:3000/api/v1/customers/add-account <br>
POST: http://localhost:3000/api/v1/customers/add-user <br>
PATCH http://localhost:3000/api/v1/customers/{id} <br>
PATCH http://localhost:3000/api/v1/customers/{id}/lock <br>

POST: http://localhost:3000/api/v1/accounts/external <br>

POST: http://localhost:3000/api/v1/auth/login <br>
POST: http://localhost:3000/api/v1/auth/logout <br>

POST: http://localhost:3000/api/v1/transactions/transfer <br>
POST: http://localhost:3000/api/v1/transactions/payment 