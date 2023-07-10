# Blink-it Clone with MERN Stack

<img src="https://i.ibb.co/7YBSBH4/Screenshot-2023-07-11-013700.jpg"/>

This is a Blink-it clone project built with the MERN stack, including Axios,Redux-toolkit and Razorpay Payment Gateway integration. The project aims to provide a platform for users to buy grocery items online.

Live Website - https://main--bucolic-heliotrope-70e301.netlify.app/

### 📝 Table of Contents

- Features
- Technologies
- Installation
- Usage
- Authors

### 🧐 Features

- User registration and authentication with login
- Product listing and searching
- Product details
- Add or update address
- Add to cart and checkout
- Payment using Razorpay Payment Gateway
- Order history

### ⛏️ Technologies

This project is built with the following technologies:

- MERN stack (MongoDB, Express, React, Node.js)
- Axios (for HTTP requests)
- JWT Token with token generation and verification. also includes Refesh Token with JWT and axios interceptors
- Razorpay Payment Gateway
- Styled components (for styling)
- Font Awesome (for icons)

### 🏁 Installation

To run this project on your local machine, follow these steps:

1. Clone the repository: git clone https://github.com/AbhayKadam57/Blinkit-web-app-Clone.git
2. Change directory: `cd api`
3. Install dependencies: `npm install`
4. Create a .env file and add the following environment variables

```
 MONGO_URI=<MONGO_URI>
 SECERTE_KEY=<YOUR_SECERTE_KEY>
 JWT_SECERTE_KEY=<YOUR_JWT_SECERTE_KEY>
 RAZORPAY_KEY_ID =<RAZORPAY_KEY_ID>
 RAZORPAY_KEY_SECRET =<RAZORPAY_KEY_SECRET>

```

5. Start the backend server: `npm start`(if you are using nodemon then change in script of pacakge.json for start i.e `nodemon index.js`)

6. Then `cd ..` to comes back to root file and do `cd client` and then do `npm install`.

7. Create a .env file and add the following environment variables

```
    VITE_RAZORPAY_KEY_ID =<RAZORPAY_KEY_ID>(same as used in api folder)
    VITE_RAZORPAY_KEY_SECRET =<RAZORPAY_KEY_SECRET>(same as used in api folder)
    VITE_BACKEND_API_URL=http://localhost:5500

```

8. start the frontend server: `npm run dev`.

### 🎈Usage

1. Register as a user or login to an existing account.
2. Browse the products listed on the home page or search for a specific product.
3. Click on a product to view its details and comments.
4. Add the product to your cart and proceed to checkout.
5. Enter your payment details and complete the payment using Razorpay Payment Gateway.
6. View your order history in the user profile section.

Note- Razorpay Gateway which I used is in testmode so used following payments details for testing purposes

######Card details:

```
Card number - 4111 1111 1111 1111
CVV - Random CVV
ExpiryDate - Any future date

```

######UPI ID

```for UPI
for success test - success@razorpay

for failure test - failure@razorpay
```

### ✍️ Authors

[@AbhayKadam57](https://github.com/AbhayKadam57) - only for clone making

- Desclaimer - All rights of design and images are belong to the blink it compony.
  This project is created just for educational purposes only. we do not intend to use it for any commercial purposes.
