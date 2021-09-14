let data: object = {
  father: {
    id: '2p',
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Johnson',
    age: 54,
    sex: 'w',
    lifeIvent: [
      {
        date: '20.03.1996',
        event: 'Married',
      },
    ],
    family: [],
  },
  mother: {
    id: '3p',
    firstName: 'Lola',
    lastName: 'James',
    middleName: 'Kolin',
    age: 45,
    sex: 'w',
    lifeIvent: [
      {
        date: '20.03.1996',
        event: 'Married',
      },
    ],
    family: [],
  },
  children: [
    {
      id: '1p',
      firstName: 'John',
      lastName: 'James',
      middleName: 'Johnson',
      age: 23,
      sex: 'm',
      lifeIvent: [
        {
          date: '20.03.2018',
          event: 'finished University',
        },
      ],
      family: [],

    },
  ]
}

export const json = JSON.stringify(data)
