
var
  assert = require('assert'),
  seq = require('./seq.js')

describe('seq()', function() {

  it('should call each functions in sequences', function(done) {
    var data = []
    seq(
      function(next) {
        data.push(1)
        next()
      },
      function(next) {
        data.push(2)
        next()
      },
      function(next) {
        assert.deepEqual(data, [1, 2])
        done()
      }
    )
  })

  it('should pass arguments to the next function', function(done) {
    seq(
      function(next) {
        next('Bob', 'Mak')
      },
      function(firstname, lastname, next) {
        assert.equal(firstname, 'Bob')
        assert.equal(lastname, 'Mak')
        done()
      }
    )
  })

  it('should always use the global context', function(done) {
    seq(
      function() {
        assert.strictEqual(this, global)
        done()
      }
    )
  })

})

describe('seq.uence()', function() {

  it('should accept arguments as the second parameter', function(done) {
    seq.uence([
      function(name) {
        assert.equal(name, 'bob')
        done()
      }
    ], ['bob'])
  })

  it('should accept context as the last parameter', function(done) {
    var a = {}
    seq.uence([
      function() {
        assert.strictEqual(this, a)
        done()
      }
    ], [], a)
  })

  it('should be possible to seq.uence list of values', function(done) {
    seq.uence(
      [ 1, 2, 3 ]
        .map(function(value) {
          return function(sum, next) {
            next(sum + value)
          }
        })
        .concat(function(sum) {
          assert.equal(sum, 6)
          done()
        }),
      [ 0 ]
    )
  })

})
