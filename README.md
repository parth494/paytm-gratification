# paytm-gratification
Implementation of Paytm Gratification Wallet flow using NodeJS. This can be used by a merchant to pay their customers in various forms like cashback, bonus, loyalty points.

Before you start the project, you will have to get the MerchantGuid, SalesWalletGuid and SecretKey from the Paytm Team.

Step 1:
npm install

This step will install all the dependencies for the project

Step 2:
node index.js

This will run the server

Step 3:
On the homepage, there are two buttons:
"Pay to User" will send money to the users paytm wallet
"Get paytm transaction" will retrieve old transactions. This can be used to check the status of previous transactions.
