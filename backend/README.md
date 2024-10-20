# BACKEND
**Below API routes are available for clients to make requests to the backend and access the corresponding services.**

## API Routes
- **Super User Routes**
  - [Super User Login](#super-user-login)
  - [Super Logout](#super-user-logout)
  - [Download Records File](#download-records-file)
  - [Download Database File](#download-database-file)
  

- **Admin Routes**
  - [Admin Login](#admin-login)
  - [Admin Logout](#admin-logout)

- **Record Routes**
  - [Create new record](#create-new-record)
  - [Get all records](#get-all-records)
  - [Get single record](#get-single-record)
  - [Delete all records](#delete-all-records)
  - [Delete single record](#delete-single-record)
  - [Add new cow to user](#add-new-cow-to-user)
  - [Delete cow from user](#delete-cow-from-user)
  - [Add new injection info and ai dates to cow](#add-new-injection-info-and-ai-dates-to-cow)
  - [Delete injection info and ai dates from cow](#delete-injection-info-and-ai-dates-from-cow)
  - [Update user record](#update-user-record)
  - [Update cow record](#update-cow-record)
  - [Update injection info and ai date record](#update-injection-info-and-ai-date-record)

## Super User Login
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/super-user/login
METHOD: POST
CONTENT-TYPE: application/json
BODY: {
    email: <string>
    password: <string>
}


Response (Request Based)
=========================
{
  success: true 
  statusCode: 200  
  message: "Super user Logged in successfully 
}
```

## Super User Logout
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/super-user/logout
METHOD: GET

Response (Request Based)
=========================
{
  success: true 
  statusCode: 200  
  message: "Super user has been logged out successfully 
}
```


## Admin Login
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/admin/login
METHOD: POST
CONTENT-TYPE: application/json
BODY: {
    email: <string>
    password: <string>
}


Response (Request Based)
=========================
{
  success: true 
  statusCode: 200  
  message: "Admin Logged in successfully 
}
```

## Admin Logout
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/admin/logout
METHOD: GET

Response (Request Based)
=========================
{
  success: true 
  statusCode: 200  
  message: "Admin has been logged out successfully 
}
```

## Create New Record
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records
METHOD: POST
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
BODY: {
  user: {
      name: <string>
      phoneNumber: <number>,
      address: <string>
  },
  cows: [
    {
        name: <string>,
        breed: <string>,
        bullName: <string>,
        injectionInfoAndAiDates: [
            {
              name: <string>,
              price: <number>,
              givenAmount: <number>,
              pendingAmount: <number>
              date: <string>
            }, 
            {}, {}, {} ...... injectionInfoAndAiDate
        ]
    }, 
    {}, {}, {}, ....... cow
  ]
}

Response (Request Based)
=========================
{
  success: true,
  statusCode: 201,
  message: "New record created successfully"
}
```

## Get All Records 
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/all
METHOD: GET
COOKIE: Admin cookie must 


Response (Request Based)
=========================
{
  success: true,
  statusCode: 200,
  length: <number>
  data: {
    records: [
      {
        user: {
              id: <userId>,
              name: <name>,
              phoneNumber: <phoneNumber>,
              address: <address>,
              isCurrentUser: <state>,
              createdAt: <dateAndTimeInDb>
          },
        cows: [
            {
              id: <cowId>,
              name: <cowName>,
              breed: <cowBreed>,
              bullName: <bullName>,
              injectionInfoAndAiDates: [
                {
                  name: <injectionName>,
                  price: <injectionPrice>,
                  givenAmount: <givenAmount>,
                  pendingAmount: <pendingAmount>,
                  date: <aiDate>
                },
                {}, {}, {}, ...... injectionInfoAndAiDate
                            
              ],
              createdAt: <dateAndTimeInDb>
            },
            {}, {}, {}, ..... cow
        ],

        "recordCreatedAt": "2024-09-17 08:56:07"
      },
      {}, {}, {} .... records
    ]
  }
}
```

## Get Single Record
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/<userId>
METHOD: GET
COOKIE: Admin cookie must 

Response (Request Based)
=========================
{
  success: true,
  statusCode: 200,
  data: {
    record: {
        user: {
              id: <userId>,
              name: <name>,
              phoneNumber: <phoneNumber>,
              address: <address>,
              isCurrentUser: <state>,
              createdAt: <dateAndTimeInDb>
          },
        cows: [
            {
              id: <cowId>,
              name: <cowName>,
              breed: <cowBreed>,
              bullName: <bullName>,
              injectionInfoAndAiDates: [
                {
                  name: <injectionName>,
                  price: <injectionPrice>,
                  givenAmount: <givenAmount>,
                  pendingAmount: <pendingAmount>,
                  date: <aiDate>
                },
                {}, {}, {}, ...... injectionInfoAndAiDate
                            
              ],
              createdAt: <dateAndTimeInDb>
            },
            {}, {}, {}, ..... cow
        ],

        "recordCreatedAt": "2024-09-17 08:56:07"
    }
  }
}
```

## Delete All Records
**Api usage and request response details**

``` base
Request Information
===================
URL: /api/v1/records/all
METHOD: DELETE
COOKIE: Admin cookie must 

Response (Request Based)
=========================
statusCode: 204  body: empty
```


## Delete Single Record
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/<userId>
METHOD: DELETE
COOKIE: Admin cookie must 

Response (Request Based)
=========================
statusCode: 204  body: empty
```


## Add New Cow To User
**Api usage and request response details**

``` base
Request Information
===================
URL: /api/v1/records/<userId>/cows
METHOD: POST
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
BODY: {
  name: <string>,
  breed: <string>,
  bullName: <string>,
  injectionInfoAndAiDates: [
    {
      name: <string>,
      price: <number>,
      givenAmount: <number>,
      pendingAmount: <number>,
      date: <string>
    },
    {}, {}, {} ..... injectionInfoAndAiDate
  ]
}

Response (Request Based)
=========================
{
  success: true,
  statusCode: 201,
  message: A new cow record successfully created for user ID: <userId>.
}
```

## Delete Cow From User 
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/<userId>/cows/<cowId>
METHOD: DELETE
COOKIE: Admin cookie must 

Response (Request Based)
=========================
statusCode: 204  body: empty
```

## Add New Injection Info And Ai Dates To Cow
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/<userId>/cows/<cowId>/inject-info-ai-dates
METHOD: POST
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
BODY: {
  name: <string>,
  price: <number>,
  givenAmount: <number>,
  pendingAmount: <number>,
  date: <string>
}

Response (Request Based)
=========================
{
  success: true,
  statusCode: 201,
  message: New injection info and AI dates have been successfully created for Cow ID: <cowId>.
}
```

## Delete Injection Info And Ai Dates From Cow
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/<userId>/cows/<cowId>/inject-info-ai-dates/<id>
METHOD: DELETE
COOKIE: Admin cookie must 

Response (Request Based)
=========================
statusCode: 204  body: empty
```


## Update User Record
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/users/<userId>
METHOD: PATCH
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
BODY: {
  // user data to update
  // Note: You can update only these fields: name, phoneNumber, and address.

  <key>: <value>
  ....
}


Response (Request Based)
=========================
{
  success: true,
  statusCode: 200,
  data: {
    user: {
      // updated keys and values 
      <key>: <value>
      ....
    }
}
```


## Update Cow Record
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/<userId>/cows/<cowId>
METHOD: PATCH
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
BODY: {
  // cow data to update
  // Note: You can update only these fields: name, breed, and bullName.

  <key>: <value>
  ....
}


Response (Request Based)
=========================
{
  success: true,
  statusCode: 200,
  data: {
    cow: {
      // updated keys and values
      <key>: <value>
      ....
    }
}
```


## Update Injection Info And Ai Date Record
**Api usage and request response details**
``` base
Request Information
===================
URL: /api/v1/records/<userId>/cows/<cowId>/inject-info-ai-dates/<id>
METHOD: PATCH
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
BODY: {
  // injection info and ai date data to update
  // Note: You can update only these fields: name, price, givenAmount, pendingAmount and date.

  <key>: <value>
  ....
}


Response (Request Based)
=========================
{
  success: true,
  statusCode: 200,
  data: {
    injectionInfoAndAiDate: {
      // updated keys and values
      <key>: <value>
      ....
    }
}
```