# Blackjack
A super simple implementation of blackjack written in React/Redux.  To get the ball rolling with this project, open up terminal and navigate to the project root, install with

```
npm install
```

This may take a couple of minutes to download all of the required dependencies, once they've downloaded please run

```
npm start
```

This will build and run a development server with Webpack on `localhost:8080`, you should then be able to play blackjack against the dealer.  This setup is fairly robust and could easily be extended to support multiple players on each table! 

#Notes
This was built for a technical challenge for an interview - I created this project in around 3 and a half hours so please expect there to be a few small bugs.  The unit tests compile and run 25/25 but they sometimes error on one or two (I believe I've done something goofy in mocha and the same instance of an object is being modified so please ignore those errors)

#Known bugs
Another known bug is that if you spam stick after busting the application will sometimes freeze, this would be something I could fix if I had more time but I didn't want to exceed the
constraints outlined by the task brief.
