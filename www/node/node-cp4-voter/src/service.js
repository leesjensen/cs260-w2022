let _user = {
  email: '',
  id: '',
  votes: [],
};

function login(email) {
  // get votes for user from server
  return _user;
}

function vote(candidateId) {
  if (_user.votes.length < 5) {
    console.log(`voted for ${candidateId}`);
    _user.votes.push(candidateId);
  }
}

function unvote(candidateId) {
  _user.votes = _user.votes.filter((c) => c !== candidateId);
}

export default { login, vote, unvote };
