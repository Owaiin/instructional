# Instructional - [Live Site Here](https://instructional.netlify.app)

A test to see if I could combine User Auth, CRUD, and Dynamic Static Paths within NextJS to support user generated content. The goal of the website is to easily be able to create guides and tutorials without the author being able to clog up the information with junk as seen on almost any other website for SEO purposes. 
 
## Main Goal
Instructional is meant to provide a platform for people to be able to share and receive information with the smallest amount of filler possible.

## How
Using Firebase as a backend as a service, I've thrown all of the Auth into a Context son that I can access the user object globally. I've done something similar with the Posts so that when the page loads, all of the posts are gathered which reduces the amount of time it takes to view the data on the Browse and Profile page. The Posts context also handles the state management of Posts, so that if a write is actioned, a pull isn't also actioned - reducing the amount of calls to the backend. 
GetStaticPaths was utilised to dynamically render [posts], so that users can create a post and then share the link with someone. Using the Fallback: "blocking" to create a staic page once the path has been visited for the first time. 

##Design
Honestly I didn't put a lot of thought into the design, and there main area that needs work is the flow for the Create-Guide page. This may be something that I revisit in the future after spending some time in Figma (or asking midhjourney to generate some ideas :) )

##Learning Outcomes
  - Typescript
    - I need to spend a lot more time using Typescript and to properly learn the syntax when it comes down to declaring objects, state(with arrays), and props. Passing a function through to a prop seems confusing so I need to focus more time looking into this. Although the code works and would likely work fine in JS, it's about having clean code that many other people can read and write with. So this is an area I'll continue to work on and improve with over time.
  
  - Context is Awesome
    - After doing prop-drilling in my previous projects, finally getting to grips with Context feels like a massive achievement. Being able to globally access variable is actually awesome and something I'm going to continue to use where it seems fit. Obviously sometimes prop-drilling has some use-cases, but where Context fits, I shall use it.
    
  - MORE COMPONENTS
      - Creating and building components is a much better way of working and I need to do it more. I've made an improvement on the amount of components used since my last project but I've not done nearly enough as I should. For example, in the SignUp and Login boxes, they're both the same and utilise the AccountDetailsForm component, but I should have instead just created a form component and switched the inputs, so that the Login and SignIn componenets could be combined into a singular component. It would also have helped to create moren styling components for P, H3, H4, Cards, LeadText, and so on.
