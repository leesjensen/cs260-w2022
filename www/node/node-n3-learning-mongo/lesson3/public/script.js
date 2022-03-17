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
        // LSJ - Changed this so it would work as a relative path
        let response = await axios.get('api/tickets');

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
        // LSJ - Changed this so it would work as a relative path
        let response = await axios.post('api/tickets', {
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
        // LSJ - Changed this so it would work as a relative path
        let response = axios.delete('api/tickets/' + ticket.id);
        this.getTickets();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
