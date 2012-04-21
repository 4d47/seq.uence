
/**
 * Variadic frontend to seq.uence().
 * seq(first, second, last);
 */
function seq() {
  seq.uence(Array.prototype.slice.call(arguments))
}

/**
 * Sequentially apply a list of functions by augmenting the arguments with
 * the 'next' function; helping decoupling asynchronous style functions.
 *
 * @param funs Array of function to call.
 * @param args Array of arguments to apply to the first function.
 * @param self Value of `this` provided for the calls in `funs`.
 */
seq.uence = function(funs, args, self) {
  if (funs.length === 0)
    return
  funs.shift().apply(self, (args || []).concat(function() {
    seq.uence(funs, Array.prototype.slice.call(arguments), self)
  }))
}

if (typeof module !== 'undefined') // CommonJS Module
  module.exports = seq
