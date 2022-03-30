export default {
  _user: {
    email: '',
    id: '',
    votes: [],
  },

  login(email) {
    if (email && email.match(/.+@.+/)) {
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

  vote(candidateId) {
    if (this._user.votes.length < 5) {
      console.log(`voted for ${candidateId}`);
      this._user.votes.push(candidateId);
    }
  },

  unvote(candidateId) {
    this._user.votes = this._user.votes.filter((c) => c !== candidateId);
  },
};
