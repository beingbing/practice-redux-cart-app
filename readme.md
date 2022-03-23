# Creating a book shopping application
In this we practiced creating a Redux Store using Redux-toolkit and handling all the interactions
centrally.
We kept the cart synced with backend, in case a user kept something in cart and logged out. To do that,
we had two ways,

- syncing the cart content inside component via useEffect ( but it has syncing issue )
the issue is, when using useEffect the way we currently do it: It will execute when our app starts.
Why is this an issue?
It's a problem because this will send the initial (i.e. empty) cart to our backend and overwrite any
data stored there.

- using an action creator Thunk

```
Note: Historically, we have an Action which informs Redux Store of what action needs to be taken on the
current state and then we have Reducer which is responsible for performing that action on State.

But we have a concept of middleware. It is the suggested way, to extend above explained Redux flow to
handle any side-effect while dispatching an Action. Middleware lets us perform operations between 
when an Action is dispatched and the moment it reaches the Reducer.

Common use cases of middleware includes, logging, crash reporting, performing asynchronous tasks, etc.
```

## Thunk
A function that delays an action until later. An action creator function that does not return the action
itself but another function which eventually returns the action. So that we run some other code before
dispatching the action for something that we do want to do.

It is a type of middleware, defined in an Action-creator function. Normally, an Action-creator returns
an Action (Object), but here (via thunk middleware), it returns a function instead of an action object.

The function returned by Thunk middleware need not to be pure, it is injected with dispatch() function
and is allowed to contain any async API calls, or any other side operation which needs to be completed
before the Reducer comes into action to update State depending on this action.

