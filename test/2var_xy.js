var test = require('tape');
var solve = require('../');
var crout = require('ndarray-crout-decomposition');
var ndarray = require('ndarray');
var zeros = require('zeros');
var show = require('ndarray-show');

var size = 2;
var A = ndarray(
    [ 8, 1, 1, 12, 5, 5 ],
    [ size + 1, size ], [ 1, size + 1 ]
);
var L = zeros([ size, size ]);
var U = zeros([ size, size ]);
var expected = [ 0, 1 ];

test('2-variable system, no Y', function (t) {
    crout(A.hi(size,size), L, U);
    
    var X = new Float64Array(size);
    var solution = solve(L, U, A.lo(size,0).pick(0), X);
    
    t.equal(X, solution);
    t.deepEqual([].slice.call(X), expected);
    
    for (var y = 0; y < size; y++) {
        var c = 0;
        for (var i = 0; i < size; i++) {
            c += X[i] * A.get(i, y);
        }
        t.equal(c, A.get(size, y));
    }
    t.end();
});

test('2-variable system, no XY', function (t) {
    crout(A.hi(size,size), L, U);
    
    var solution = solve(L, U, A.lo(size,0).pick(0));
    
    t.deepEqual(show(solution), show(expected));
    
    for (var y = 0; y < size; y++) {
        var c = 0;
        for (var i = 0; i < size; i++) {
            c += solution.get(i) * A.get(i, y);
        }
        t.equal(c, A.get(size, y));
    }
    t.end();
});
