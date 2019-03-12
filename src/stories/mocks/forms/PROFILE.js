export default [
  {
    type: 'radio',
    name: 'gender',
    initialValue: 'male',
    props: {
      required: true,
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
    initialValue: 'First name',
    props: {
      required: true,
      label: 'Vorname',
      placeholder: 'First name...',
    },
  },
  {
    type: 'input',
    name: 'last_name',
    initialValue: 'Last name',
    props: {
      required: true,
      label: 'Nachname',
      placeholder: 'Last name...',
    },
  },
  {
    type: 'input',
    name: 'email',
    initialValue: 'kontakt@homeday.de',
    props: {
      required: true,
      type: 'email',
      label: 'E-Mail-Adresse',
      placeholder: 'Email...',
    },
  },
  {
    type: 'input',
    name: 'landline_number',
    initialValue: '',
    props: {
      required: false,
      type: 'tel',
      label: 'Telefonnummer',
      placeholder: 'Lanline number...',
    },
  },
  {
    type: 'input',
    name: 'mobile_number',
    initialValue: '030 120 849 110',
    props: {
      required: true,
      type: 'tel',
      label: 'Handynummer',
      placeholder: 'Phone number...',
    },
  },
  {
    type: 'input',
    name: 'address.street',
    initialValue: 'Prinzessinnenstraße',
    props: {
      required: false,
      type: 'text',
      label: 'Straße',
      placeholder: 'Street...',
    },
  },
  [
    {
      type: 'input',
      name: 'address.house_number',
      initialValue: '26',
      props: {
        required: false,
        type: 'text',
        label: 'Hausnummer',
        placeholder: 'House number...',
      },
    },
    {
      type: 'input',
      name: 'address.zip_code',
      initialValue: '10969',
      props: {
        required: false,
        type: 'text',
        label: 'PLZ',
        placeholder: 'Zip code...',
      },
    },
  ],
  {
    type: 'input',
    name: 'address.city',
    initialValue: 'Berlin',
    props: {
      required: false,
      type: 'text',
      label: 'Ort',
      placeholder: 'City...',
    },
  },
];
