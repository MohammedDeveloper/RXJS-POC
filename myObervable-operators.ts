import { of } from 'rxjs';
import { map, first, last } from 'rxjs/operators';


/// create an "of" operator
const ofValues = of(1, 2, 3);

/// call by map | Ignore the error
//map(val => val * val)(ofValues).subscribe((resp) => console.log("MAP - OF Operator Response: ", resp));

/// last and first of the values...
first()(ofValues).subscribe((resp) => console.log("MAP - OF Operator First Response: ", resp));
last()(ofValues).subscribe((resp) => console.log("MAP - OF Operator Last Response: ", resp));

/// more operators are ther pipe, filter, tap, mergeAll, forkJoin, flat etc...
