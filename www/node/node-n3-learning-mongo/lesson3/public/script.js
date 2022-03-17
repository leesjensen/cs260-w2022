var app = new Vue({
  el: '#app',
  data: {
    addedName: '',
    addedProblem: '',
    tickets: {},
  },
  created() {
    this.getTickets();
  },
  methods: {
    async getTickets() {
      try {
        let response = await axios.get('http://localhost:3000/api/tickets');

        // LSJ - I had to fix this since the response actually has a ticket field at the root.
        // this.tickets = response.data;
        this.tickets = response.data.tickets;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addTicket() {
      try {
        let response = await axios.post('http://localhost:3000/api/tickets', {
          name: this.addedName,
          problem: this.addedProblem,
        });
        this.addedName = '';
        this.addedProblem = '';
        this.getTickets();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTicket(ticket) {
      try {
        let response = axios.delete(
          'http://localhost:3000/api/tickets/' + ticket.id
        );
        this.getTickets();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
