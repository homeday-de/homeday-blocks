module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "What's your service name?",
    validate(value) {
      if (!value.length) {
        return 'A service must have a name.';
      }
      return true;
    },
  },
];
