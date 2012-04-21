seq.uence
=========

Utility to sequentially apply a list of functions
and augmenting the arguments with the 'next' function;
helping decoupling asynchronous style functions.

```javascript
   seq(
     function(next) {
	   next(12)
     },
     function(luckyNumber) {
	   console.log( luckyNumber + 2 )
     }
   )
```
