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

![Gif of the game being played](https://user-images.githubusercontent.com/3603112/26956362-f01b3f7a-4cb4-11e7-95a2-29e1e3e57fe4.gif)

## Todos
I never had a chance to implement the component tests for the React components, I focfused mainly on writing a test harness for the blackjack game script itself.  I would like to come back and write some React tests in the future!

I'd also like to add SASS, I didn't have the time to add it to my build phase but using non-preprocessed CSS is just yuk!  Expect to see this changed.

## Notes
This was built for a technical challenge for an interview - I created this project in around 3 and a half hours so please expect there to be a few small bugs.  The unit tests compile and run 25/25 but they sometimes error on one or two (I believe I've done something goofy in mocha and the same instance of an object is being modified so please ignore those errors)

## Known bugs
Another known bug is that if you spam stick after busting the application will sometimes freeze, this would be something I could fix if I had more time but I didn't want to exceed the
constraints outlined by the task brief.

## Tests as of 9th June 2017

![Image of test report](https://user-images.githubusercontent.com/3603112/26956351-d9c0d8d4-4cb4-11e7-98b3-fba2359e0ba8.png)
