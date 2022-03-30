import candidateSevice from '@/model/candidate.js';

export default {
  _user: {
    email: 'joe@g.com',
    id: '',
    votes: [],
  },

  login(email) {
    if (email && email.match(/.+@.+\..+/)) {
      this._user.email = email;
      // get user from server
    } else {
      throw 'Invalid email for login';
    }
  },

  get user() {
    return this._user;
  },

  get loggedIn() {
    return this._user.email !== '';
  },

  get isAdmin() {
    return this.loggedIn && this._user.email === 'lsj@byu.edu';
  },

  votedFor(candidateId) {
    return this._user.votes.includes(candidateId);
  },

  vote(candidateId, addVote) {
    const prevVotedFor = this._user.votes.includes(candidateId);
    if (addVote && !prevVotedFor) {
      if (this._user.votes.length < 5) {
        this._user.votes.push(candidateId);
        candidateSevice.vote(candidateId, true);
      }
    } else if (!addVote && prevVotedFor) {
      this._user.votes = this._user.votes.filter((c) => c !== candidateId);
      candidateSevice.vote(candidateId, false);
    }
  },
};
