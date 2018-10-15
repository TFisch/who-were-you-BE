# Build Your Own Backend

This backend database is used to access a collection of famous people that died, sorted chronologically from 1969 to 1997. It draws its content by web scraping the website [onthisday.com](https://www.onthisday.com/deaths-by-year.php). This tutorial will assist you in setting up your own postgres database.

## Initial  Setup

1. Clone down this repository
1. Run Command `npm install`

### Setting Up Your Postgres Database

**1. Download Postgresql with `brew install postgres`**

This will give us global access to our databases on our machine.


**2. Run `psql` in your terminal**

psql is a terminal-based front-end to PostgreSQL. While you are running it locally you be able to create new databases as well as accessing, editing and deleting existing ones. We access the PostgreSQL by running this command.

**3. Run `CREATE DATABASE [database name]` in your terminal**

We have now initialized our database. 

**4. Create a new directory, `cd` into it, and run `npm initial --yes`**

This creates our local directory. We still need Knex with Express to allow us to use Javascript for communicating with the backend.

**5. Run the following commands in your terminal...**

**`npm install -g knex`**
**`npm install knex --save`**
**`npm install pg --save`**

Now that we have knex installed we need to configure our database.

**6. Run ` knex init` in your terminal**

This is the file that you will use to configure your database. You will notice some boilerplate setup, but with some modifications you can better accommodate your project.

Adjust your configuration to look like the following,

```
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/[yourdatabasename]',
    useNullAsDefault: true
  }
};
```

**7. Run ` knex migrate:make initial` in your terminal**

This will generate an initial migration. You can edit this newly created file to better suit your schema layout. Use the command `knex migrate:latest` to run all of your migrations. For future adjustments to your schema, rather than continuing to edit the initial migration, you must create a new migration with the following command, `knex migrate:make [adjustment detail]`. **Editing past migration can cause errors!** Further documentation on building out tables can be found [here](https://knexjs.org/). 


## End Points

#### Parameter Descriptions

| Name                | Value         | Description  
|---------------------|:------------:|:-----------:| 
| "person_name"       | string       | Name of a dead person to add to database          
|  "year"             | integer      | Year of recorded death             
| "date_id"           | integer      | Matches the specified date corresponding to dates table         
| "deletable"         | boolean      | Allows added deaths to be deleted in the future
| "name"              | string       | Name of user to be added           
| "death_id"          | integer      | Index of death in death table              
| "notes"             | string       | Notes on personal connection of user to death           
| "date_id"           | integer      | Matches the specified date corresponding to dates table    


### Deaths

| Endpoint            | Request Type | Parameters  | Example Response
|---------------------|:------------:|:-----------:| :----------------:
| /api/v1/deaths      | GET          | -           | [I](#I.)
| /api/v1/deaths/:id  | GET          | -           | II       
| /api/v1/deaths      | POST         | "person_name", "year", "date_id", "deletable" | III                                  
| /api/v1/deaths/:id  | DELETE       | -           | IV    
| /api/v1/deaths/:id  | PUT          | -           | V        


### Users


| Endpoint            | Request Type | Parameters  | Example Response
|-----------------    |:------------:|:-----------:| :----------------:
| /api/v1/users       | GET          | -           | VI         
| /api/v1/users/:id   | GET          | -           | VII
| /api/v1/users       | POST         | "name","death_id", "notes","date_id"           | VIII        
| /api/v1/users/:id   | DELETE       | -           | IX       
| /api/v1/users/:id   | PUT          | -           | X       


### Dates


| Endpoint            | Request Type | Parameters  | Example Response
|-----------------    |:------------:| :-----------:| :----------------:
| /api/v1/dates       | GET          | -           | XI        


---



### I. **`/api/v1/deaths`**
GET - Returns an array of all stored deaths.

**Example Response**
```[
    {
        "id": 1,
        "person_name": "Jane Morgan",
        "date_id": 367,
        "year": 1972,
        "created_at": "2018-10-13T00:30:36.786Z",
        "updated_at": "2018-10-13T00:30:36.786Z",
        "deletable": false
    },
    {
        "id": 10,
        "person_name": "Gustav Knuth",
        "date_id": 367,
        "year": 1987,
        "created_at": "2018-10-13T00:30:36.794Z",
        "updated_at": "2018-10-13T00:30:36.794Z",
        "deletable": false
    }...]
```

### II. **`/api/v1/deaths/:id`**

GET - Returns an array containing a specific death as specified by id.

**Example Response**


```
[
    {
        "id": 24,
        "person_name": "Phyllis Hill",
        "date_id": 367,
        "year": 1993,
        "created_at": "2018-10-13T00:30:36.798Z",
        "updated_at": "2018-10-13T00:30:36.798Z",
        "deletable": false
    }
]
```


### III. **`/api/v1/deaths`**

POST - Adds an addition death to the database. Responds with the id of the newly created person.

**Example Response**

```
{
    "deadPersonId": [
        9487
    ]
}
```


### IV. **`/api/v1/deaths/:id`**

Delete - Removes a **`deletable`** death from the database.

**Example Response**

```
"Deleted!"
```



### V. **`/api/v1/deaths/:id`**

PUT - Updates a **`deletable`** death from the database.

**Example Response**

```
"Updated!"
```

### VI. **`/api/v1/users/`**

GET - Returns an array of all stored deaths.

**Example Response**

```
[
  {
    name: 'Cody Taft',
    death_id: 1,
    notes: 'He was the greatest guitar player that ever lived',
    date_id: 1
  },
  {
    name: 'Tim Fischer',
    death_id: 2,
    notes: 'He was the greatest poet that ever lived',
    date_id: 1
  },
  {
    name: 'Kurt Kurtains',
    death_id: 3,
    notes: 'She made the greatest curtains that ever lived',
    date_id: 2
  }
]
```

### VII. **`/api/v1/users/:id`**

GET - Returns an array containing a specific user as specified by id.

**Example Response**

```
[
  {
    name: 'Kurt Kurtains',
    death_id: 3,
    notes: 'She made the greatest curtains that ever lived',
    date_id: 2
  }
]
```

### VIII. **`/api/v1/user`**

POST - Adds an addition user to the database.

**Example Response**

```
[
    {
        "id": 24,
        "person_name": "Phyllis Hill",
        "date_id": 367,
        "year": 1993,
        "created_at": "2018-10-13T00:30:36.798Z",
        "updated_at": "2018-10-13T00:30:36.798Z",
        "deletable": false
    }
]
```

### IX. **`/api/v1/users/:id`**

Delete - Removes a user from the database.

**Example Response**

```
"Deleted!"
```


### X. **`/api/v1/users/:id`**

PUT - Updates a user from the database.

**Example Response**

```
"Updated!"
```

### XI. **`/api/v1/dates`**

GET - Returns an array of all calendar dates with astrological sign.

**Example Response**

```
[
    {
        "id": 367,
        "day": "JANUARY 1",
        "astrology_sign": "Capricorn",
        "created_at": "2018-10-13T00:30:36.358Z",
        "updated_at": "2018-10-13T00:30:36.358Z"
    },
    {
        "id": 368,
        "day": "JANUARY 2",
        "astrology_sign": "Capricorn",
        "created_at": "2018-10-13T00:30:36.367Z",
        "updated_at": "2018-10-13T00:30:36.367Z"
    },
    {
        "id": 378,
        "day": "JANUARY 12",
        "astrology_sign": "Capricorn",
        "created_at": "2018-10-13T00:30:36.375Z",
        "updated_at": "2018-10-13T00:30:36.375Z"
    },
    ...]
```





