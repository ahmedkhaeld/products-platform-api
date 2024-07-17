## Database Design

### Entities

- **User:** Represents a user in the system.
- **UserSubscription:** Represents a user's subscription to products or bundles. Establishes many-to-many relationships between users and products/bundles.
- **Product:** Represents a product in the system. Products can be part of multiple bundles.
- **Bundle:** Represents a collection of products offered together.

### Entity Descriptions

#### User

The **User** entity represents an individual user within the system, including their unique identifiers and credentials.

- **id:** Primary key, auto-generated integer.
- **username:** Unique username for the user.
- **email:** Unique email address for the user.
- **password:** User's password, stored securely.

#### UserSubscription

The **UserSubscription** entity manages a user's subscriptions to various products and bundles, facilitating many-to-many relationships.

- **id:** Primary key, auto-generated integer.
- **user:** Foreign key referencing the User entity, with a many-to-one relationship.
- **products:** Many-to-many relationship with the Product entity.
- **bundles:** Many-to-many relationship with the Bundle entity.

#### Product

The **Product** entity represents a single product within the system, including its details and relationships.

- **id:** Primary key, auto-generated integer.
- **name:** Name of the product.
- **description:** Description of the product (optional).
- **isBundle:** Boolean indicating if the product is a bundle.
- **creationDate:** Timestamp of when the product was created.
- **creator:** Foreign key referencing the User entity, with a many-to-one relationship.

#### Bundle

The **Bundle** entity represents a collection of products offered together.

- **id:** Primary key, auto-generated integer.
- **name:** Name of the bundle.
- **description:** Description of the bundle (optional).
- **creationDate:** Timestamp of when the bundle was created.
- **creator:** Foreign key referencing the User entity, with a many-to-one relationship.
- **products:** Many-to-many relationship with the Product entity.

