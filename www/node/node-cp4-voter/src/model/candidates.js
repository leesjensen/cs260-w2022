export default {
  _candidates: [
    {
      name: 'joe',
      url: 'https://cs260.click',
      votes: 0,
      id: '1',
    },
    {
      name: 'cindy',
      url: 'https://cs260.click',
      votes: 7,
      id: '2',
    },
    {
      name: 'lara',
      url: 'https://cs260.click',
      votes: 5,
      id: '3',
    },
    {
      name: 'bud',
      url: 'https://cs260.click',
      votes: 2,
      id: '4',
    },
    {
      name: 'marc',
      url: 'https://cs260.click',
      votes: 9,
      id: '5',
    },
    {
      name: 'gary',
      url: 'https://cs260.click',
      votes: 15,
      id: '6',
    },
    {
      name: 'sue',
      url: 'https://cs260.click',
      votes: 55,
      id: '7',
    },
  ],

  get candidates() {
    return this._candidates;
  },

  vote(candidateId, addVote) {
    const candidate = this._candidates.find((c) => c.id == candidateId);
    if (candidate) {
      addVote ? candidate.votes++ : candidate.votes--;
    }
  },
};
