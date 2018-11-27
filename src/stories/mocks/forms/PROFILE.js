export default [
  {
    type: 'radio',
    name: 'gender',
    props: {
      required: true,
      selected: 'male',
      items: [
        {
          label: 'Female',
          value: 'female',
        },
        {
          label: 'Male',
          value: 'male',
        },
      ],
    },
  },
  {
    type: 'input',
    name: 'first_name',
    props: {
      required: true,
      value: 'First name',
      label: 'Vorname',
      placeholder: 'First name...',
    },
  },
  {
    type: 'input',
    name: 'last_name',
    props: {
      required: true,
      value: 'Last name',
      label: 'Nachname',
      placeholder: 'Last name...',
    },
  },
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
    name: 'landline_number',
    props: {
      required: false,
      value: '',
      type: 'tel',
      label: 'Telefonnummer',
      placeholder: 'Lanline number...',
    },
  },
  {
    type: 'input',
    name: 'mobile_number',
    props: {
      required: true,
      value: '030 120 849 110',
      type: 'tel',
      label: 'Handynummer',
      placeholder: 'Phone number...',
    },
  },
  {
    type: 'input',
    name: 'address.street',
    props: {
      required: false,
      value: 'Prinzessinnenstraße',
      type: 'text',
      label: 'Straße',
      placeholder: 'Street...',
    },
  },
  [
    {
      type: 'input',
      name: 'address.house_number',
      props: {
        required: false,
        value: '26',
        type: 'text',
        label: 'Hausnummer',
        placeholder: 'House number...',
      },
    },
    {
      type: 'input',
      name: 'address.zip_code',
      props: {
        required: false,
        value: '10969',
        type: 'text',
        label: 'PLZ',
        placeholder: 'Zip code...',
      },
    },
  ],
  {
    type: 'input',
    name: 'address.city',
    props: {
      required: false,
      value: 'Berlin',
      type: 'text',
      label: 'Ort',
      placeholder: 'City...',
    },
  },
];
