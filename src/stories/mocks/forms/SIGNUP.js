export default [
  {
    type: 'input',
    name: 'first_name',
    props: {
      required: true,
      label: 'First name',
      placeholder: 'Enter your first name...',
    },
  },
  {
    type: 'input',
    name: 'last_name',
    props: {
      required: true,
      label: 'Last name',
      placeholder: 'Enter your Last name...',
    },
  },
  {
    type: 'passwordConfirm',
    name: 'password',
    props: {
      required: true,
      min: 6,
    },
  },
];
