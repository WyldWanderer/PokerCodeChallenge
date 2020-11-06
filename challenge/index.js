class PokerHand {
  constructor(hand) {
    this.hand = hand;
  
//variables to house results of filtering from functions
    this.validHand = false;
    this.noDuplicates = true;
    this.isFlush = false;
    this.isStraight = false;
    this.isRoyal = false;
    this.handRank = "";
    this.finalHand = "";

//Comparison lists to filter card combinations with
    this.suits = ["s", "h", "c", "d"];
    this.cardValues = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
    this.cardSets = [[2], [2, 2], [3], [2, 3],  [4]];
    this.handFilter = {
      "Royal Flush" : "true, true, true, no matches",
      "Straight Flush" : "true, true, false, no matches",
      "Four Of A Kind" : "false, false, false, 4",
      "Full House" : "false, false, false, 3",
      "Flush" : "true, false, false, no matches",
      "Straight" : "false, true, " + this.isRoyal + ", no matches",
      "Three Of A Kind" : "false, false, false, 2",
      "Two Pair" : "false, false, false, 1",
      "One Pair" : "false, false, false, 0",
      "High Card" :  "false, false, false, no matches"
    }
  }

//Check that the hand contains 5 cards
  checkHand() {
    let handArr = this.hand.split(" ");
    if (handArr.length == 5) {
      this.validHand = true;
    } 
  }
//Check that the hand has no duplicate cards (ex. two 10 of spades)
  checkDups () {
    let handArr = this.hand.split(" ");
    if (new Set(handArr).size !== handArr.length) {
      this.noDuplicates = false;
    }
  }

//Determine if the given hand has the right cards to make a flush
  findFlush() {
    for (let suit of this.suits) {
      let flushCheck = new RegExp(suit, 'g');
      let matches = this.hand.match(flushCheck);
      if (matches != null && matches.length == 5) {
        this.isFlush = true;
      }
    }
  }
  
//Determines if any matching cards exist in the hand
  findPairs() {
      let set = []
      for (let value of this.cardValues) {
          let matchCheck = new RegExp(value, 'g');
          let pairs = this.hand.match(matchCheck);
          if (pairs != null && pairs.length > 1) {
              set.push(pairs.length);
          }
      }
      let sortedSet = set.sort();
      for (set of this.cardSets) {
          if (String(sortedSet) == String(set)) {
            this.handRank = this.cardSets.indexOf(set);
            break
          } 
          else {
            this.handRank = "no matches";
          }
      }
  }
  
//Determines if the cards make a straight and if it is an Ace high straight
  findStraight() {
      let set = []
      for (var value of this.cardValues) {
          let buildHand = new RegExp(value, 'g');
          let cards = this.hand.match(buildHand);
          if (cards != null) {
              set.push(cards);
          }
      }
  
      let endHand = set.join().replace(/,/g, "");
      let compareSet = this.cardValues.join().replace(/,/g, "");
      let straightCheck = compareSet.search(endHand);
      let royalCheck = endHand.search("AKQJ10");
      if (straightCheck != -1 && royalCheck != -1) {
        this.isStraight = true;
        this.isRoyal = true;
      }
      else if (straightCheck != -1 && royalCheck == -1) {
        this.isStraight = true;
      }
  }
//Compares final hand analysis to card rankings and gives the rank of the hand   
  getRank() {
      let handObj = "" + String(this.isFlush) + ", " + String(this.isStraight) + ", " + String(this.isRoyal) 
      + ", " + String(this.handRank) + "";
      this.finalHand = Object.keys(this.handFilter).find(key => this.handFilter[key] === handObj)
      return this.finalHand
  }

  rankHand() {
    this.checkHand();
    this.checkDups();
    if (this.validHand == true && this.noDuplicates == true) {
      this.findFlush();
      this.findPairs();
      this.findStraight();
      this.getRank();
      return this.finalHand;
    }
    else {
      return "Invalid Hand"
    }
  }
}

module.exports = PokerHand;

let manualMode = new PokerHand("Ah 10h Jh 2h 4h");
console.log(manualMode.rankHand());