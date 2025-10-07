# Ponti Marriot System

![Java](https://img.shields.io/badge/Java-17-blue.svg)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.6-brightgreen.svg)
![Angular](https://img.shields.io/badge/Angular-19-red.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38BDF8.svg)
![CockroachDB](https://img.shields.io/badge/CockroachDB-24.0-purple.svg)

> **Ponti Marriot** is a distributed hotel management platform built with **Spring Boot 3.5.6** and **Angular 19**, integrating CockroachDB, Kafka, OAuth2, and Prometheus for scalable, secure, and observable service orchestration.

### Run the Backend

**Build and run using Maven**

```bash
cd backend
mvn clean package -DskipTests
mvn spring-boot:run
```

Backend available at  [http://localhost:8080](http://localhost:8080)

---

## Frontend — Angular 19 + TailwindCSS 4.1

### Install Dependencies

```bash
cd frontend
npm install
```

### Run the Frontend

**Development mode**

```bash
npm start
```

or:

```bash
ng serve 
```

Frontend available at [http://localhost:4200](http://localhost:4200)
