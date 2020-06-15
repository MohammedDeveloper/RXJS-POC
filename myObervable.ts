import { Observable, from, asyncScheduler } from "rxjs";
import { observeOn } from "rxjs/operators";

/// Creating Observables
const myObservable = new Observable(subscriber => {
    try {
        /// Executing the Observable
        /// synchronous response
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);

        /// asynchronous response
        setTimeout(() => {
            /// async
            subscriber.next(4);
            getSampleData().then(resp => subscriber.next(resp));

            /// completes subscriber - uncomment and explore
            //subscriber.complete();

            /// disposing - does not call "Complete" - uncomment and explore
            //subscriber.unsubscribe();           

            /// test - will not send to consumer
            subscriber.next(5);
        }, 2000);
    } catch (err) {
        /// error
        subscriber.error("Message: " + err);
    }
}).pipe(observeOn(asyncScheduler));

/// Subscribing to Observables
console.log("myObservable Subscription - Starts");
const myObserver = myObservable.subscribe({
    next(value) {
        console.log("myObservable Subscription - Response: ", value);
    },
    error(err) {
        console.log("myObservable Subscription - Error: ", err);
    },
    complete() {
        console.log("myObservable Subscription - Completed");

        /// Disposing Observables
        myObserver.unsubscribe();
    }
});
console.log("myObservable Subscription - Ends");

/// Subscribing to Observables | from
/// Executing the Observable
const myFromInput = from(getSampleData());
const myFromObserver = myFromInput.subscribe(res => {
    console.log("myFromObserver Subscription - Response: ", res);

    /// Disposing Observables
    myFromObserver.unsubscribe();
});

function getSampleData() {
    return fetch("https://jsonplaceholder.typicode.com/todos/1").then(response =>
        response.json()
    );
}