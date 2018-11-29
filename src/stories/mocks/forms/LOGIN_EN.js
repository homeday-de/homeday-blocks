export default [
  {
    type: 'input',
    name: 'email',
    props: {
      required: true,
      value: 'contact@homeday.de',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Email...',
    },
  },
  {
    type: 'input',
    name: 'password',
    props: {
      required: true,
      type: 'password',
      label: 'Password',
      placeholder: '',
    },
  },
];
