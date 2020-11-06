const assert = require('assert');
const PokerHand = require('../index');

describe('hand should be valid', function() {
  it('should hold 5 cards', function() {
    const hand = new PokerHand('As Ks Qs Js 9s 2c');
    assert.strictEqual(hand.rankHand(), 'Invalid Hand');
  });
});

describe('test for duplicates', function() {
  it('should return as Invalid Hand because of duplicate', function() {
    const hand = new PokerHand('9s Ks Qs 8s 8s');
    assert.strictEqual(hand.rankHand(), 'Invalid Hand');
  });
});

describe('test for Royal Flush', function() {
  it('should return as royal flush', function() {
    const hand = new PokerHand('Ad Kd Qd Jd 10d');
    assert.strictEqual(hand.rankHand(), 'Royal Flush');
  });
});

describe('test for Straight Flush', function() {
  it('should return as straight flush', function() {
    const hand = new PokerHand('8h 9h 10h 6h 7h');
    assert.strictEqual(hand.rankHand(), 'Straight Flush');
  });
});

describe('test for Four of a Kind', function() {
  it('should return as four of a kind', function() {
    const hand = new PokerHand('Kc Ks Kd Kh 8s');
    assert.strictEqual(hand.rankHand(), 'Four Of A Kind');
  });
});

describe('test for Full House', function() {
  it('should return as full house', function() {
    const hand = new PokerHand('9s 9d Qs Qc Qd');
    assert.strictEqual(hand.rankHand(), 'Full House');
  });
});

describe('test for Flush', function() {
  it('should return as flush', function() {
    const hand = new PokerHand('9s Ks Qs Js 8s');
    assert.strictEqual(hand.rankHand(), 'Flush');
  });
});

describe('test for Straight', function() {
  it('should return as straight', function() {
    const hand = new PokerHand('9h Js 10s Qc 8s');
    assert.strictEqual(hand.rankHand(), 'Straight');
  });
});

describe('test for Three of a Kind', function() {
  it('should return as three of a kind', function() {
    const hand = new PokerHand('9s 9c 9h 7s 8s');
    assert.strictEqual(hand.rankHand(), 'Three Of A Kind');
  });
});

describe('test for Two Pair', function() {
  it('should return as two pair', function() {
    const hand = new PokerHand('2s 2c 6d 8h 8s');
    assert.strictEqual(hand.rankHand(), 'Two Pair');
  });
});

describe('test for One Pair', function() {
  it('should return as one pair', function() {
    const hand = new PokerHand('As Ac Qs 2s 8s');
    assert.strictEqual(hand.rankHand(), 'One Pair');
  });
});

describe('test for High Card', function() {
  it('should return as high card', function() {
    const hand = new PokerHand('7s Kc Qs 10d 8d');
    assert.strictEqual(hand.rankHand(), 'High Card');
  });
});
