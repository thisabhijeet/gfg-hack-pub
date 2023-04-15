# CropXchange

# Problem:
Agriculture is one of the primary occupations for many of the Indian households. It contributes a major chunk to the society. But there are numerous problems faced by the farmers at today’s time. In fact, the situation is so disastrous some time that they commit suicide. A few primary reasons are:
1.	Inadequate storage and transportation infrastructure for agricultural produce.
2.	Dominance of middlemen in the market.
3.	Ineffective price support measures for farmers.
4.	Poor implementation of government schemes.
5.	Limited access to credit for farmers.
6.	Absence of a single market for agricultural produce.

There is also an issue of small and fragmented landholding patterns, which limit economies of scale and production costs.

# Solution Proposed:

The solution “CropXchange” is a ready to go marketplace for products like vegetables, fruits, cereals, pulses, rice and what not. The primary features are:
1.	A registered user can place an order for the items.
2.	A registered user can also sell items by listing them over the marketplace.
3.	A registered user can also see the details about his or her past orders.
4.	A registered user can change images, price, and other details of his/her listed products. 
5.	Registered users can also delete and upload images for their products on daily basis to maintain authenticity.

# How the problem is solved:

1.	The cost of commodities increases when intermediaries are present. But here there is no intermediary present.
2.	More transparency as prices, images and other details are regularly updated.
3.	Farmers will get every single penny that they worked hard for.
4.	Government tie-ups can also leverage the impact made by the project.
5.	Transportation problem will be solved by proper supply chain management.
6.	Single marketplace for all needs.

# Technology Used: 

The project has been implemented as a website https://gfg-hack.vercel.app/. The frontend has been hosted over Vercel, while the backend is running on a Google cloud AMD compute engine using Nginx. The database operations are performed using Firebase Firestore and images are stored over Firebase Storage.
Frontend:
1.	The project has been initialized using Vite.
2.	ReactJS has been used for frontend.
3.	The designing and CSS stuff is handled through Tailwind CSS.
4.	All the GET and POST requests are handled through Axios.
5.	Routing of pages is handled by React Router Dom.

# Backend:
1.	Whole of the backend is written using NodeJS and Express.
2.	Signup and Login using JWT tokens.
3.	User authentication using cookies as well.
4.	Password encryption using bcryptjs.

# Database:
1.	The whole data like user email and password, products listed, orders placed and orders received is stored over Firebase Firestore Database.
2.	Images uploaded for a particular product is stored over Firebase Storage.

# Google Cloud Service:
1.	Firebase Firebase Database
2.	Firebase Storage
3.	Network services Cloud DNS
4.	Network service Cloud domains
5.	Compute Engine VM instances

The whole NodeJS express server is running on the AMD compute engine instance using Nginx. A domain “cropXchange.net” has been allotted to this instance which redirects to the external IP of instance. 
All the calls are redirect using HTTPS, set up using SSL certificate by Let’s Encrypt using Certbot.
To test the server, go to “cropxchange.net/api/test” and you will see “ test ok” as a response.
