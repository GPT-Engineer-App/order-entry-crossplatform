# order-entry-crossplatform

I want an order entry application for my field salespeople. Crossplatform. It should be available on Android, iOS and Web. Let it be fed from my ERP, which can be connected via Rest API and MSSQL on my server. Current accounts should come, current account selection should be made from here, then the product and quantity should be selected for the order in an interface like online shopping carts, and when the order cart is complete, my field salesperson should POST this order as JSON to my ERP with the submit button. Let there be two kinds of users: Admin and Field Salesperson. Field Salespersons can view their own order history. There should also be status information here: “Sent, Approved, Completed, Pending Revision, Rejected”.  Let the Sent and Completed parts be determined according to the status information in ERP. Admin should be able to view the order history of all users and change the status information. Any of the admin users can decide to approve, request revision or reject orders.  

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/order-entry-crossplatform.git
cd order-entry-crossplatform
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
