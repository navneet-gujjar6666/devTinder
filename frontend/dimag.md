## AXIOS
//If used:
    Axios is a frontend library used to send HTTP requests.
    (GET, POST, PUT, DELETE) from frontend to backend APIs.
    Easy API calls, Automatic JSON parsing.
    Axios does NOT fix CORS problems.
    Axios only sends requests.

//If not used
    Must use fetch().
    More boilerplate code.
    Manual error handling.

## CORS
//If used:
   CORS (Cross-Origin Resource Sharing) is a browser security rule that decides whether frontend can access backend APIs
   running on a different domain/port.
   Frontend can call backend APIs.
   Browser allows cross-domain requests.
   Axios/fetch requests succeed.

//If not used:
    Browser blocks request.
    CORS error in console.
    API works in Postman but NOT in browser.

## FEED
//Case:
     When having 6users then one loggedIn then it will get 5cards for-(intereseted, ignore) in feed then after clicking according to us then in last we have in feed-([empty]) not null, null was earlier in starting, and on browserUI we are getting no user to show which is correct but when we logged in with another user we still getting no user to show as it should have 4users in feed but not getting as our store.feed is global so every user is using that store, so now we will handle this case by like:
    const getFeed = async () => {
    if (feed === null) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
      console.log("fromFeed: ", res.data.data);
    } catch (err) {
      //TODO: handle ERROR
    }
  };, so when feed= []empty so,empty===null is false condition so if(false) not run and we will go below then we can fetch    again through axios.get(); but actually this case not handled in proper manner as another bugs are:

| Situation     | Behavior |                                     Reason                                                          |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------|
| App load      | nofetch  | as intial feed is null so it will never go to axios.get()                                           |
| User login    | nofetch  | again same reason just like above                                                                   |
| User logout   |  fetch   | assume we get our firstly feed then we interested on every user then in last we have empty feed  which will run axios.get() as (feed[empty]===null) is false no return it will go below and this will happen when logout as all componenets will get rendered as even we didnt want to fetch-(axios.get()) but it will happen which is unneccessary.             |

| Feed empty    |  loop    |                                                                                                     |
| Backend empty | notStable| as even we didnt have the feeds in backends so on axios.get() it will rerturn feed[empty]           |
| User change   | nofetch  | as if one user done operations on 5users so feed is empty so new user loggedIn so still feed[empty] |
    
//SO FOR FINAL SOLUTION WE HAVE DONE ALREADY INSIDE THE FEEDS.
