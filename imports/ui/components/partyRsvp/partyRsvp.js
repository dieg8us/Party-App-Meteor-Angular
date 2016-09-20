// Import libreries for module
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
// Import templates for Party Rsvp
import template from './partyRsvp.html';

// class PartyRsvp
class PartyRsvp {
  // method yes
  yes() {
    this.answer('yes');
  }
  isYes() {
    return this.isAnswer('yes');
  }
  // method maybe
  maybe() {
    this.answer('maybe');
  }
  isMaybe() {
    return this.isMaybe('maybe');
  }
  // method no
  no() {
    this.answer('no');
  }
  isNo() {
    return this.isNo('no');
  }

  answer(answer) {
    Meteor.call('rsvp', this.party._id, answer, (error) => {
      if (error) {
        console.error('Oops', 'unable to rsvp!');
      } else {
        console.log('RSVP done!');
      }
    });
  }
  isAnswer(answer) {
    if(this.party) {
      return !!_.findWhere(this.party.rsvps, {
        user: Meteor.userId(),
        rsvp: answer
      });
    }
  }
}

const name = 'partyRsvp';

// module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    party: '<'
  },
  controller: PartyRsvp
});
