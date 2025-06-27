# User Management System

A backend system built with NestJS that supports user management using both REST and gRPC APIs.

---

## 🚀 Tech Stack

- **Server:** Node.js, NestJS, TypeScript, REST, gRPC  
- **Database:** MySQL  
- **ORM:** TypeORM  

---

## 📄 API Documentation

The full API contract and usage examples are available here:

**URL:** [Google Docs Link](https://docs.google.com/document/d/1td9nOUXb5x-qukvqeHUBc4gPoMV2n_NgC6L9pVZgT-s/edit?tab=t.0)

---

## ⚙️ Local Setup Instructions

Follow the steps below to run the project locally:

 1. Clone the Repository
```bash
git clone https://github.com/Sravan-P-Thankappan/jk-tech.git
```
 2. Go to projejct directory
```bash
cd /poject-directory
```
 3. Install dependencies
```bash
npm install
```
 4. create .env and add the below eviorment variable and provide you database configuation here.
```.env
HOST=localhost
USER_NAME=root
PASSWORD=password
DATABASE=test
```

 6. Set Up the MySQL Database
    Create a database with the same name as specified in the `.env` file under `DATABASE`.
```sql
CREATE DATABASE test;
```
 7. Run this application.
 ```bash
 npm run start:dev
  ```
8. Test the api using api testing tool (eg:Postman)
   
   Base Url:
   http://localhost:3000
