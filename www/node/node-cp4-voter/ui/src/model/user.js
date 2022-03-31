import candidateSevice from '@/model/candidate.js';

export default {
  _user: {
    email: '',
    id: '',
    votes: [],
  },

  async login(email) {
    if (email && email.match(/.+@.+\..+/)) {
      const response = await fetch('/api/login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      this._user = await response.json();
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
      if (this._user.votes.length < 3) {
        this._user.votes.push(candidateId);
        candidateSevice.vote(this._user, candidateId, true);
      }
    } else if (!addVote && prevVotedFor) {
      this._user.votes = this._user.votes.filter((c) => c !== candidateId);
      candidateSevice.vote(this._user, candidateId, false);
    }
  },
};
