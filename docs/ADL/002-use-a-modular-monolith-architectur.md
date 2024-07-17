# 2. Use a modular monolith architecture

Date: 06/06/2024

## Status

Accepted

## Context

I want to avoid the deployment headaches by starting with a monolith architecture.

## Decision

I will use a modular monolith architecture to begin development with. The first modules will be the bounded contexts identified during the
Big Picture workshop.

- User Management
- Products Management


As we are using NestJS for our development; the code that belongs to a module will be placed under
the `/src` directory 

## Consequences

- Application runs as a single process