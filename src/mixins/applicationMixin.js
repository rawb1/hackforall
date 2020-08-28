export default {
  methods: {
    statusColorClass(status) {
      switch (status) {
        case 'INCOMPLETE':
          return 'is-warning';
        case 'PENDING':
          return 'is-info';
        case 'CANCELED':
        case 'REFUSED':
          return 'is-danger';
        case 'ACCEPTED':
          return 'is-success';
        default:
          return 'is-primary';
      }
    },
    statusTextColorClass(status) {
      switch (status) {
        case 'INCOMPLETE':
          return 'has-text-warning';
        case 'PENDING':
          return 'has-text-info';
        case 'CANCELED':
        case 'REFUSED':
          return 'has-text-danger';
        case 'ACCEPTED':
          return 'has-text-success';
        default:
          return 'has-text-primary';
      }
    }
  }
};
