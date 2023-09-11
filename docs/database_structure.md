## Database Structure

This is the structure of tables of the database for this application, using the **SQLite** database type.

#### Table: order
| Field | Type | Nullable | Description |
|-|-|-|-|  
| id | integer | no | Primary key | 
| total | float | no | Total order value |
| freightValue | float | no | Freight value for the order |
| discount | float | no | Discount value for the order |
| origin | string | no | Origin of the order. Should use one of the items defined on the enum class *src\common\enums\order-origin.enum.ts* |
| created_at | datetime | no | Datetime of creation of the order |
| updatedAt | datetime | no | Datetime of the last update of the order |
| paidAt | datetime | yes | Datetime of payment of the order |
| canceledAt | datetime | yes | Datetime of cancel of the order |
| refundedAt | datetime | yes | Datetime of refund of the order |
| deletedAt | datetime | yes | Datetime of removal of the order |
| paymentTypeId | integer | no | Foreign key to payment_type table |
| orderStatusId | integer | no | Foreign key to order_status table |
| storeId | integer | no | Foreign key to store table |

#### Table: payment_type
| Field | Type | Nullable | Description |
|-|-|-|-|  
| id | integer | no | Primary key |
| name | string | no | Name of the payment type |

#### Table: order_status
| Field | Type | Nullable | Description |
|-|-|-|-|  
| id | integer | no | Primary key |
| name | string | no | Name of the order status |

#### Table: store
| Field | Type | Nullable | Description |
|-|-|-|-|  
| id | integer | no | Primary key |
| name | string | no | Name of the store |
| ecommerceUrl | string | yes | Url of the e-commerce of the store |
| created_at | datetime | no | Datetime of creation of the store |
| updatedAt | datetime | no | Datetime of the last update of the store |
| deletedAt | datetime | yes | Datetime of removal of the store |
