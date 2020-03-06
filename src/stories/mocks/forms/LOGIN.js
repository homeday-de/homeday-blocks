export default [
  {
    type: 'input',
    name: 'email',
    initialValue: 'email@test.com',
    props: {
      required: true,
      type: 'email',
      label: 'E-Mail-Adresse',
      placeholder: 'Email...',
    },
  },
  {
    type: 'inputPassword',
    name: 'password',
    props: {
      required: true,
      label: 'Passwort',
      placeholder: '',
    },
  },
];
