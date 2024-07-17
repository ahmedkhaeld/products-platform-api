# 5. Use DTOs and Validation Pipes for Data Validation and Transformation

Date: 17/07/2024

## Status
Accepted

## Context
To ensure the integrity and correctness of data entering the system, it is necessary to validate and transform incoming requests appropriately. This helps prevent invalid data from causing issues within the application.

## Decision
Use Data Transfer Objects (DTOs) to validate incoming requests and transform data between API endpoints and database models. Employ validation pipes to enforce data validation rules before processing requests.

## Consequences
- **Data Integrity**: Validation pipes ensure that only valid data is processed, reducing the risk of errors and security vulnerabilities.
- **Separation of Concerns**: Using DTOs to manage data transformation separates validation logic from business logic, improving code maintainability and readability.
- **Enhanced Security**: Validating data at the boundaries of the application helps prevent common security issues such as injection attacks.

All decisions will be kept in the /docs/ADL directory.