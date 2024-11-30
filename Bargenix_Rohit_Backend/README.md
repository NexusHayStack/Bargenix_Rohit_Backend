# Bargenix_Rohit_Backend

# Discount Coupon API

This project implements an API to manage unique, time-bound discount coupons. It fulfills the requirements provided for the assignment, including generating coupons, validating them, and logging requests into a mock database.

## Features

- **Generate Coupon**: Creates a unique, time-limited discount coupon for a given product ID.
- **Validate Coupon**: Checks if a coupon is valid for a specific product and ensures it hasn't expired.
- **Log Requests**: Records API interactions into a mock database for tracking purposes.
- **Error Handling**:
  - Handles invalid product IDs or coupons.
  - Detects expired or mismatched coupons.

---

## File Structure

```
project/
│
├── .data/
│   ├── products/            # Placeholder for product files (if extended)
│   ├── coupons.json         # Mock database to store coupon data
│   └── logs.json            # Mock database to log API requests
│
├── lib/
│   ├── config.js            # Configuration settings
│   ├── data.js              # Functions for reading/writing mock database
│   ├── handlers.js          # API route handlers
│   ├── helpers.js           # Utility functions (e.g., coupon generation, validation)
│   └── server.js            # Server setup and routing
│
└── index.js                 # Entry point to initialize the server
```

---

## API Endpoints

### 1. **Generate Coupon**
- **URL**: `/generate-coupon`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "productId": "12345"
  }
  ```
- **Response**:
  ```json
  {
    "coupon": "12345-abcdef123456",
    "expiry": 1693248732
  }
  ```
- **Description**: Generates a coupon tied to the given product ID with a pre-configured expiry time.

---

### 2. **Validate Coupon**
- **URL**: `/validate-coupon`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "coupon": "12345-abcdef123456",
    "productId": "12345"
  }
  ```
- **Response**:
  - Success:
    ```json
    {
      "success": "Coupon is valid"
    }
    ```
  - Failure (e.g., expired):
    ```json
    {
      "error": "Coupon expired"
    }
    ```

---

### 3. **Log Request**
- **URL**: `/log-request`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "action": "test"
  }
  ```
- **Response**:
  ```json
  {
    "success": "Request logged"
  }
  ```

---

## Mock Database

Data is stored as JSON files in the `.data/` directory:
1. `coupons.json`: Contains all generated coupons with metadata:
    ```json
    {
      "12345-abcdef123456": {
        "productId": "12345",
        "expiry": 1693248732
      }
    }
    ```
2. `logs.json`: Logs all incoming requests:
    ```json
    [
      {
        "timestamp": 1693248621,
        "action": "test"
      }
    ]
    ```

---

## How to Run

1. **Install Dependencies**:
   - None (uses Node.js built-in modules).

2. **Start the Server**:
   ```bash
   node index.js
   ```

3. **Test the Endpoints**:
   Use tools like [Postman](https://www.postman.com/) or `curl` to send requests to `http://localhost:3000`.

---

## Future Improvements

Given more time or in a production environment:
- Replace the mock JSON database with a real database (e.g., MongoDB or PostgreSQL).
- Add authentication and rate-limiting for secure API access.
- Include automated testing using tools like Jest.
- Extend functionality to support bulk coupon generation and user-specific coupons.
