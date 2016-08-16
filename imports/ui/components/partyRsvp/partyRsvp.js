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
  // method maybe
  maybe() {
    this.answer('maybe');
  }
  // method no
  no() {
    this.answer('no');
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
