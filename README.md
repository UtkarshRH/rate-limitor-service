# Rate Limiter Service

A distributed rate limiter service built using **Node.js, TypeScript, Express.js, Redis, and Docker**. It uses the **Token Bucket algorithm** to control incoming API requests and prevent excessive traffic.

## Tech Stack

* Node.js
* TypeScript
* Express.js
* Redis
* Docker

## How It Works

Each client has a bucket with a fixed number of tokens. Every request consumes one token. Tokens are automatically refilled over time.

If tokens are available, the request is allowed. If the bucket is empty, the service returns:

```text
429 Too Many Requests
```

Redis stores the token bucket state, making the rate limiter suitable for distributed systems with multiple server instances.

## Run the Project

Install dependencies:

```bash
npm install
```

Start Redis:

```bash
docker compose up -d
```

Start the development server:

```bash
npm run dev
```

## Author

**Utkarsh Harshe**
