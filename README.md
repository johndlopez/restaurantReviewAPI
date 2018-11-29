# Restaurant Review API

To test this API, I've included specific details about each endpoint below.

The variables.env file that is required to access the database will be included in an email. Place this file in the 'restaurantReviewAPI/' directory.

After installing the dependencies, run the following command in your terminal:

```bash
node start
```

Included in the remote database are a few sample accounts
|Name|Email (login)|Password|
|---|---|---|
|john|john@example.com|john|
|sara|sara@example.com|sara|
|Tom|wee@example.com|Tom|

I used Postman to test the routes, you can find additional information below.

## Get all reviews

- GET /reviews

## Register an account

- POST /register

#### Urlencoded fields

- name
- password
- password-confirm
- email

## Log into account

- POST /login

#### Urlencoded fields

- email
- password

## Log out from account

- GET /logout

## Create a review

- POST /review/create

#### Form-data fields

- location.coordinates[0]
- location.coordinates[1]
- text
- photo (file)

## Edit a review

- POST /reviews/:id/edit
- :id is \_id of a review.

#### Form-data fields

- location.coordinates[0]
- location.coordinates[1]
- text
- photo (file)

## Delete a review

- DELETE /reviews/:id/delete
- :id is \_id of a review.

#### Form-data fields

- location.coordinates[0]
- location.coordinates[1]
- text
- photo (file)

## See your account's reviews

- GET /account/

## Find reviews within 10 miles of a location

- GET /api/reviews/near
  ### Params
  - lat=37.775866
  - lng=-122.412446
