# A Taste of Hope

<br>

# Quick Compo

<br>

## Description

This is an app to connect people who want to help those in need by donating food and people who need help using markets as intermediaries.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Sign up:** As an anonymous user I can sign up on the platform so that I can start helping others or be helped.
- **Login:** As a user I can login to the platform so that I can access my profile and start creating baskets or choose which basket I want.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Home:** As a logged in user I want to access the home page.
- **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of baskets I have created or used depending on my profile (donor vs needful).
- **Edit Profile:** As a logged in user I can access the edit profile page so that I can edit the information about my account.
- **Delete Profile:** As a logged in user I want to be able to delete my account.
- **Create Baskets:** As a logged in user (donor) I can access the create basket page so that I can create a basket or used a predefined one.
- **Choose Baskets:** As a logged in user (needful) I can access the choose basket/ unitary product page so that I can choose a basket or a product that I need.
- **Select Intermediary:** As a logged in user (needful) I can access the choose Intermediary page so that I can choose where I can pick up the supplies that I need.

# Client / Frontend

## React Router Routes (React App)

| Path             | Pages        | Permissions                | Behavior                                              |
| ---------------- | ------------ | -------------------------- | ----------------------------------------------------- |
| `/login`         | LoginPage    | anon only `<AnonRoute>`    | Login form, navigates to home page after login.       |
| `/signup`        | SignupPage   | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.     |
| `/`              | HomePage     | public `<Route>`           | Home page.                                            |
| `/home/donor`          | DonorHomePage | user only `<PrivateRoute>` | Home page depending on the type of profile.           |
| `/home/user`          | UserHomePage | user only `<PrivateRoute>` | Home page depending on the type of profile.           |
| `/profile`       | Profile      | user only `<PrivateRoute>` | User (donor or needful) profile for the current user. |
| `/profile/edit`  | EditProfile  | user only `<PrivateRoute>` | Edit user profile form.                               |
| `/basket/create` | CreateBasket | user only `<PrivateRoute>` | Create new basket form.                               |
| `/basket/add`    | AddBasket    | user only `<PrivateRoute>` | Add new predefined basket form.                       |
| `/basket/choose` | ChooseBasket | user only `<PrivateRoute>` | Choose new basket form.                               |
| `/basket/unit`   | ChooseUnit   | user only `<PrivateRoute>` | Choose new unit form.                                 |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- UserHomePage

- Profile

- EditProfile

- CreateBasket

- AddBasket

- ChooseBasket

- ChooseUnit

Components:

- Button

- Footer

- Navbar

- BasketCard

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  userType: { type: },
  givenBaskets: [{ type: Schema.Types.ObjectId, ref: 'Basket' }],
  givenUnits: [{ type: Schema.Types.ObjectId, ref: 'Basket' }],
  receivedBaskets: [{ type: Schema.Types.ObjectId, ref: 'Basket' }],
  receivedUnits: [{ type: Schema.Types.ObjectId, ref: 'Basket' }]
}
```

**Basket model**

```javascript
 {
   basketType: { type: },
   intermediary: [{ type: Schema.Types.ObjectId, ref: 'Intermediary' }],
   products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
   received: { type: Boolean},
   price: { type: Number},
   giver: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   receiver: [{ type: Schema.Types.ObjectId, ref: 'User' }],
 }
```

**Product model**

```javascript
{
  quantity: { type: Number, required: true },
  packageSize: { type: String, required: true },
  price: { type: Number, required: true },
  expirationDate: { type: Date },
  brand: { type: String },
  category: { type: String }
}
```

**Intermediary model**

```javascript
{
  name: { type: String },
  adress: { type: String },
  brand: { type: String },
  description: {},
  basket: [{ type: Schema.Types.ObjectId, ref: 'Basket' }]
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| GET        | `/auth/verify`         |                              | 200            | 400          | verify if the user is logged in                                                                                                               |
| GET        | `/auth/updateToken`         |                              | 200            | 400          | get user token updated                                                                                                               |
| GET         | `/api/profile/:id`     |                              |                |              | show specific profile                                                                                                            |
| PUT         | `/api/profile/:id`     | { firstName, lastName, phoneNumber }                | 201            | 400          | edit profile                                                                                                                     |
| DELETE      | `/api/profile/:id`     |                              | 200            | 400          | delete profile                                                                                                                   |
| PUT         | `/api/basket/:id`           |                              | 201            | 400          | edit basket                                                                                                                      |
| POST         | `/api/basket/`           |                              | 201            | 400          | create new basket                                                                                                                      |
| DELETE         | `/api/basket/:id`           |                              | 201            | 400          | delete basket                                                                                                                      |
| GET         | `/api/market/:id/baskets`           |                              | 201            | 400          | choose basket                                                                                                                      |                                                                                 
<br>

## API's

<br>

## Packages

<br>

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/HugoEsteves21/TasteOfHope-Client)

[Server repository Link](https://github.com/HugoEsteves21/TasteOfHope-Server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

Hugo Esteves - <HugoEsteves21> - <https://www.linkedin.com/in/hugo-veiga-esteves/>

Bruno Rocha - <brunorocha20> - <https://www.linkedin.com/in/bruno-m-a-rocha/>
