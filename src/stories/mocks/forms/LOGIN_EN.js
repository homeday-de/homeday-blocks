export default [
  {
    type: 'input',
    name: 'email',
    lang: 'en',
    props: {
      required: true,
      value: 'contact@homeday.de',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Email...',
    },
  },
  {
    type: 'inputPassword',
    name: 'password',
    props: {
      required: true,
      label: 'Password',
      placeholder: '',
    },
  },
];
