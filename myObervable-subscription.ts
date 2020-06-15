import { interval } from "rxjs";


/// create observables
const observable1 = interval(400);
const observable2 = interval(400);

/// create subscriptions
const observable1Subscription = observable1.subscribe(x => console.log("First Subcription: ", x));
const observable2Subscription = observable2.subscribe(x => console.log("Second Subcription: ", x));

/// add 1 to 2
observable1Subscription.add(observable2Subscription);

/// set timeout to unsubscribe 1
setTimeout(() => {

    /// unsubscribe => 1 ==> 2 as well
    observable1Subscription.unsubscribe();
}, 3000);