export default [
  {
    type: 'input',
    name: 'email',
    props: {
      required: true,
      value: 'kontakt@homeday.de',
      type: 'email',
      label: 'E-Mail-Adresse',
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
