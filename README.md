# CS-465
CS-465 - Full Stack Development
# Architecture

In this project, I got to work with two different frontend approaches. The customer-facing site uses Express with Handlebars templates, which is more traditional page-by-page rendering. It uses HTML, CSS, and a little JavaScript to pull data and show it on different pages. Then the admin side uses Angular as a single-page application. That’s a totally different feel because instead of loading new pages, everything happens inside the browser and updates instantly with the API.

Using MongoDB on the backend made sense because the trip data fits well into a JSON structure. NoSQL keeps things flexible, especially when the trips change over time or when we add new fields. It also connects easily with Node and Express, so everything in the stack works smoothly together.

# Functionality

JSON and JavaScript look similar, but JSON is only for data. It doesn’t run code. JSON is what lets the backend send data to the frontend so the pages can update dynamically. It’s how the database data ends up showing on our pages and inside the Angular admin system.

I refactored a lot during the process, especially moving code into controllers and services to keep everything clean. Modular routing and reusable UI components made it easier to maintain the app instead of copying the same chunks of code over and over. Angular makes reusable pieces a lot easier with components that can be dropped anywhere.

# Testing

I tested all the API routes using Postman. With GET, POST, PUT, and DELETE routes connected to MongoDB, it was important to test both success cases and failure cases. Once I added JWT login security, I had to test again because some routes needed a token to work. The “401 Unauthorized” responses helped prove the security was set up right. A full stack app needs all the parts to communicate — the frontend hitting the right endpoints, the backend securing everything, and the methods needing the right input.

# Reflection

This course definitely helped me move toward my career goals. I now understand how a real full stack application works from start to finish. I learned how to set up a database, build secure routes, connect the API to the frontend, and even how Angular works with components and services. The project feels like something I could actually show to an employer as proof that I can build more than just small assignments. Overall, I feel like I leveled up as a developer by putting every layer of the stack together into one working app.
