const events = [
  {
    title: "Community Service Field day",
    start: "2025-04-13T14:00:00",
    end: "2025-04-13T15:00:00",
  },
  {
    title: "DMC Game night",
    start: "2025-04-24T19:00:00",
    end: "2025-04-24T21:00:00"
  },
  {
    title: "DMC Spring Mixer",
    start: "2025-05-24T16:00:00",
    end: "2025-05-24T19:00:00"
  },
  {
    title: "DMC CPR Certification",
    start: "2025-04-26T17:30:00",
    end: "2025-04-26T19:00:00",
  },
  {
    title: "DMC Shoe Shine Event",
    start: "2025-04-10T19:00:00",
    end: "2025-04-10T20:00:00",
  },
  {
    title: "DMC Narca Cert. Event",
    start: "2025-03-23T16:00:00",
    end: "2025-03-23T17:00:00",
    location: "TBD"
  },
  {
    title: "DMC Ringers Basketball",
    start: "2025-03-25T20:30:00",
    end: "2025-03-25T21:30:00",
    location: "TBD"
  },
  {
    title: "DMC Ringers Soccer",
    start: "2025-03-27T19:30:00",
    end: "2025-03-27T20:30:00",
    location: "TBD"
  },
  {
    title: "Team DMC Basketball",
    start: "2025-03-27T20:30:00",
    end: "2025-03-27T21:30:00",
    location: "TBD"
  },
  {
    title: "DMC CGI Collab Event",
    start: "2025-04-01T18:00:00",
    end: "2025-04-01T19:00:00",
    location: "TBD"
  },
  {
    title: "DMC Non-Profit E-Board",
    start: "2025-04-01T18:15:00",
    end: "2025-04-01T19:15:00",
    location: "TBD"
  },
  {
    title: "DMC Ringers Basketball",
    start: "2025-04-01T20:30:00",
    end: "2025-04-01T21:30:00",
    location: "TBD"
  },
  {
    title: "DMC Ringers Soccer",
    start: "2025-04-03T19:30:00",
    end: "2025-04-03T20:30:00",
    location: "TBD"
  },
  {
    title: "Team DMC Basketball",
    start: "2025-04-03T20:30:00",
    end: "2025-04-03T21:30:00",
    location: "TBD"
  },
 
  {
    title: "Suit Day",
    start: "2025-04-13T18:00:00",
    end: "2025-04-13T19:00:00",
    location: "TBD"
  },
  {
    title: "DMC Non-Profit E-Board",
    start: "2025-04-15T18:15:00",
    end: "2025-04-15T19:15:00",
    location: "TBD"
  },
  {
    title: "3rd GBM",
    start: "2025-04-16T19:00:00",
    end: "2025-04-16T20:30:00",
    location: "TBD"
  },
  {
    title: "DMC Shadow Day",
    start: "2025-04-18T11:00:00",
    end: "2025-04-18T13:00:00",
    location: "TBD"
  },
  {
    title: "The Gallery (Catalyst)",
    start: "2025-04-19T18:00:00",
    end: "2025-04-19T20:00:00",
    location: "TBD"
  },
  {
    title: "DMC Eboard Retreat",
    start: "2025-04-25T15:00:00",
    end: "2025-04-25T17:00:00",
    location: "TBD"
  },
  {
    title: "DMC Non-Profit E-Board",
    start: "2025-04-29T18:15:00",
    end: "2025-04-29T19:15:00",
    location: "TBD"
  },
  {
    title: "President Rao Reception",
    start: "2025-4-18T09:30:00",
    end: "2025-04-18T140:00:00",
    location: "VCU Campus"
  },

    {
      title: "President Rao Reception",
      start: "2025-03-04T17:30:00",
      end: "2025-03-04T20:00:00",
      location: "Scott House"
  },
  {
    title:"DMC IT Workshop",
    start: "2025-03-21T18:00:00",
    end: "2025-03-21T20:00:00"

  },

  {
    title: "Team DMC Intramural Soccer Game",
    start: "2025-01-27T19:30:00",
    end: "2025-01-27T20:30:00"
},
{
    title: "Team DMC Intramural Indoor Soccer Game",
    start: "2025-02-03T19:30:00",
    end: "2025-02-03T20:30:00"
},
{
    title: "Team DMC Intramural Soccer Game",
    start: "2025-02-10T19:30:00",
    end: "2025-02-10T20:30:00"
},
{
    title: "DMC Ringer Intramural Indoor Soccer Game",
    start: "2025-01-26T21:30:00",
    end: "2025-01-26T22:30:00"
},
{
    title: "DMC Ringer's Intramural Indoor Soccer Game",
    start: "2025-02-02T21:30:00",
    end: "2025-02-02T22:30:00"
},
{
    title: "DMC Ringer's Intramural Indoor Soccer Game",
    start: "2025-02-10T21:30:00",
    end: "2025-02-10T22:30:00"
},
{
    title: "Library Study Session",
    start: "2024-10-06T16:00:00",
    end: "2024-10-06T22:00:00"
},
{
    title: "Library Study Session",
    start: "2024-10-13T16:00:00",
    end: "2024-10-13T22:00:00"
},
  {
    title: "Library Study Session",
    start: "2024-10-06T16:00:00",
    end: "2024-10-06T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-13T16:00:00",
    end: "2024-10-13T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-20T16:00:00",
    end: "2024-10-20T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-27T16:00:00",
    end: "2024-10-27T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-03T16:00:00",
    end: "2024-11-03T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-10T16:00:00",
    end: "2024-11-10T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-17T16:00:00",
    end: "2024-11-17T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-24T16:00:00",
    end: "2024-11-24T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-01T16:00:00",
    end: "2024-12-01T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-08T16:00:00",
    end: "2024-12-08T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-15T16:00:00",
    end: "2024-12-15T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-22T16:00:00",
    end: "2024-12-22T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-29T16:00:00",
    end: "2024-12-29T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-01-05T16:00:00",
    end: "2025-01-05T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-01-12T16:00:00",
    end: "2025-01-12T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-01-19T16:00:00",
    end: "2025-01-19T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-01-26T16:00:00",
    end: "2025-01-26T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-02-02T16:00:00",
    end: "2025-02-02T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-02-09T16:00:00",
    end: "2025-02-09T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-02-16T16:00:00",
    end: "2025-02-16T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-02-23T16:00:00",
    end: "2025-02-23T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-03-02T16:00:00",
    end: "2025-03-02T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-03-09T16:00:00",
    end: "2025-03-09T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-03-16T16:00:00",
    end: "2025-03-16T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-03-23T16:00:00",
    end: "2025-03-23T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2025-03-30T16:00:00",
    end: "2025-03-30T22:00:00"
  },

  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-02T08:30:00",
    "end": "2024-12-02T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-03T08:30:00",
    "end": "2024-12-03T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-04T08:30:00",
    "end": "2024-12-04T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-05T08:30:00",
    "end": "2024-12-05T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-06T08:30:00",
    "end": "2024-12-06T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-09T08:30:00",
    "end": "2024-12-09T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-10T08:30:00",
    "end": "2024-12-10T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-11T08:30:00",
    "end": "2024-12-11T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-12T08:30:00",
    "end": "2024-12-12T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-13T08:30:00",
    "end": "2024-12-13T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-16T08:30:00",
    "end": "2024-12-16T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-17T08:30:00",
    "end": "2024-12-17T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-18T08:30:00",
    "end": "2024-12-18T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-19T08:30:00",
    "end": "2024-12-19T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-20T08:30:00",
    "end": "2024-12-20T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-23T08:30:00",
    "end": "2024-12-23T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-24T08:30:00",
    "end": "2024-12-24T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-25T08:30:00",
    "end": "2024-12-25T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-26T08:30:00",
    "end": "2024-12-26T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-27T08:30:00",
    "end": "2024-12-27T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-30T08:30:00",
    "end": "2024-12-30T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2024-12-31T08:30:00",
    "end": "2024-12-31T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-01T08:30:00",
    "end": "2025-01-01T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-02T08:30:00",
    "end": "2025-01-02T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-03T08:30:00",
    "end": "2025-01-03T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-06T08:30:00",
    "end": "2025-01-06T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-07T08:30:00",
    "end": "2025-01-07T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-08T08:30:00",
    "end": "2025-01-08T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-09T08:30:00",
    "end": "2025-01-09T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-10T08:30:00",
    "end": "2025-01-10T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-13T08:30:00",
    "end": "2025-01-13T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-14T08:30:00",
    "end": "2025-01-14T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-15T08:30:00",
    "end": "2025-01-15T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-16T08:30:00",
    "end": "2025-01-16T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-17T08:30:00",
    "end": "2025-01-17T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-20T08:30:00",
    "end": "2025-01-20T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-21T08:30:00",
    "end": "2025-01-21T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-22T08:30:00",
    "end": "2025-01-22T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-23T08:30:00",
    "end": "2025-01-23T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-24T08:30:00",
    "end": "2025-01-24T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-27T08:30:00",
    "end": "2025-01-27T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-28T08:30:00",
    "end": "2025-01-28T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-29T08:30:00",
    "end": "2025-01-29T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-30T08:30:00",
    "end": "2025-01-30T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-01-31T08:30:00",
    "end": "2025-01-31T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-03T08:30:00",
    "end": "2025-02-03T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-04T08:30:00",
    "end": "2025-02-04T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-05T08:30:00",
    "end": "2025-02-05T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-06T08:30:00",
    "end": "2025-02-06T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-07T08:30:00",
    "end": "2025-02-07T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-10T08:30:00",
    "end": "2025-02-10T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-11T08:30:00",
    "end": "2025-02-11T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-12T08:30:00",
    "end": "2025-02-12T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-13T08:30:00",
    "end": "2025-02-13T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-14T08:30:00",
    "end": "2025-02-14T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-17T08:30:00",
    "end": "2025-02-17T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-18T08:30:00",
    "end": "2025-02-18T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-19T08:30:00",
    "end": "2025-02-19T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-20T08:30:00",
    "end": "2025-02-20T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-21T08:30:00",
    "end": "2025-02-21T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-24T08:30:00",
    "end": "2025-02-24T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-25T08:30:00",
    "end": "2025-02-25T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-26T08:30:00",
    "end": "2025-02-26T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-27T08:30:00",
    "end": "2025-02-27T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-02-28T08:30:00",
    "end": "2025-02-28T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-03T08:30:00",
    "end": "2025-03-03T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-04T08:30:00",
    "end": "2025-03-04T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-05T08:30:00",
    "end": "2025-03-05T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-06T08:30:00",
    "end": "2025-03-06T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-07T08:30:00",
    "end": "2025-03-07T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-10T08:30:00",
    "end": "2025-03-10T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-11T08:30:00",
    "end": "2025-03-11T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-12T08:30:00",
    "end": "2025-03-12T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-13T08:30:00",
    "end": "2025-03-13T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-14T08:30:00",
    "end": "2025-03-14T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-17T08:30:00",
    "end": "2025-03-17T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-18T08:30:00",
    "end": "2025-03-18T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-19T08:30:00",
    "end": "2025-03-19T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-20T08:30:00",
    "end": "2025-03-20T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-21T08:30:00",
    "end": "2025-03-21T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-24T08:30:00",
    "end": "2025-03-24T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-25T08:30:00",
    "end": "2025-03-25T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-26T08:30:00",
    "end": "2025-03-26T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-27T08:30:00",
    "end": "2025-03-27T13:00:00"
  },
  {
    "title": ": Fox and Carver Mentoring (Varies)",
    "start": "2025-03-28T08:30:00",
    "end": "2025-03-28T13:00:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2024-12-06T14:15:00",
    "end": "2024-12-06T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2024-12-13T14:15:00",
    "end": "2024-12-13T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2024-12-20T14:15:00",
    "end": "2024-12-20T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2024-12-27T14:15:00",
    "end": "2024-12-27T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-01-03T14:15:00",
    "end": "2025-01-03T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-01-10T14:15:00",
    "end": "2025-01-10T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-01-17T14:15:00",
    "end": "2025-01-17T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-01-24T14:15:00",
    "end": "2025-01-24T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-01-31T14:15:00",
    "end": "2025-01-31T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-02-07T14:15:00",
    "end": "2025-02-07T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-02-14T14:15:00",
    "end": "2025-02-14T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-02-21T14:15:00",
    "end": "2025-02-21T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-02-28T14:15:00",
    "end": "2025-02-28T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-03-07T14:15:00",
    "end": "2025-03-07T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-03-14T14:15:00",
    "end": "2025-03-14T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-03-21T14:15:00",
    "end": "2025-03-21T15:15:00"
  },
  {
    "title": ": Dogwood Mentoring",
    "start": "2025-03-28T14:15:00",
    "end": "2025-03-28T15:15:00"
  },
//changes made here
  {
   title: "Dodgeball (DMC Olympics Committee Event)",
   start: "2025-01-23T15:00:00",
   end: "2025-01-23T16:00:00"
},
{
   title: "CGI Collaboration Event",
   start: "2025-02-11T18:00:00",
   end: "2025-02-11T20:00:00"
},
{
   title: "1st GBM",
   start: "2025-02-19T19:00:00",
   end: "2025-02-19T21:00:00"
},
{
   title: "2nd GBM (Virginia Credit Union Collaboration)",
   start: "2025-03-19T19:00:00",
   end: "2025-03-19T21:00:00"
},
{
   title: "3rd GBM (DMC Graduation)",
   start: "2025-04-16T19:00:00",
   end: "2025-04-16T21:00:00"
},
  {
    title: ": Fox and Carver Mentoring (Varies)",
    start: "2024-12-02T08:30:00",
    end: "2024-12-02T13:00:00"
  },
  {
    title: ": Fox and Carver Mentoring (Varies)",
    start: "2024-12-03T08:30:00",
    end: "2024-12-03T13:00:00"
  },
  {
    title: ": Fox and Carver Mentoring (Varies)",
    start: "2024-12-04T08:30:00",
    end: "2024-12-04T13:00:00"
  },
  {
    title: ": Fox and Carver Mentoring (Varies)",
    start: "2024-12-05T08:30:00",
    end: "2024-12-05T13:00:00"
  },
  {
    title: ": Fox and Carver Mentoring (Varies)",
    start: "2024-12-06T08:30:00",
    end: "2024-12-06T13:00:00"
  },
  {
    title: ": Dogwood Mentoring",
    start: "2024-12-06T14:15:00",
    end: "2024-12-06T15:15:00"
  },
  {
  title: "Jacob's Chance",
  start: "2024-11-02T12:30:00",
  end: "2024-11-01T14:00:00"
  },
  {
    title: "DMC General Team Flag Football Game",
    start: "2024-09-01T19:30:00",
    end: "2024-09-01T20:30:00"
  },
  {
    title: "DMC Ringers Team Flag Football Game",
    start: "2024-09-02T19:30:00",
    end: "2024-09-02T20:30:00"
  },
  {
    title: "DMC General Team Flag Football Game",
    start: "2024-09-08T19:30:00",
    end: "2024-09-08T20:30:00"
  },
  {
    title: "DMC Ringers Team Flag Football Game",
    start: "2024-09-09T19:30:00",
    end: "2024-09-09T20:30:00"
  },
  {
    title: "DMC Orientation Session",
    start: "2024-09-12T18:30:00",
    end: "2024-09-12T19:30:00"
  },
  {
    title: "DMC Mixer",
    start: "2024-09-15T13:00:00",
    end: "2024-09-15T21:00:00"
  },
  {
    title: "DMC General Team Flag Football Game",
    start: "2024-09-15T19:30:00",
    end: "2024-09-15T20:30:00"
  },
  {
    title: "DMC Ringers Team Flag Football Game",
    start: "2024-09-16T19:30:00",
    end: "2024-09-16T20:30:00"
  },
  {
    title: "DMC GBM",
    start: "2024-09-18T18:00:00",
    end: "2024-09-18T21:30:00"
  },
  {
    title: "DMC Mentor Orientation Session",
    start: "2024-09-20T18:30:00",
    end: "2024-09-20T19:30:00"
  },
  {
    title: "DMC General Team Flag Football Game",
    start: "2024-09-22T19:30:00",
    end: "2024-09-22T20:30:00"
  },
  {
    title: "DMC Ringers Team Flag Football Game",
    start: "2024-09-23T19:30:00",
    end: "2024-09-23T20:30:00"
  },
  {
    title: "DMC Internship Workshop",
    start: "2024-10-01T19:00:00",
    end: "2024-10-01T21:00:00"
  },
  {
    title: "Community Service Day",
    start: "2024-10-04T15:00:00",
    end: "2024-10-04T18:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-04T13:00:00",
    end: "2024-10-04T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-06T16:00:00",
    end: "2024-10-06T22:00:00"
  },
  {
    title: "DMC Kickball Game",
    start: "2024-10-07T20:30:00",
    end: "2024-10-07T21:30:00"
  },
  {
    title: "DMC Ringers Basketball Game",
    start: "2024-10-08T19:30:00",
    end: "2024-10-08T20:30:00"
  },
  {
    title: "Social Committee Meeting",
    start: "2024-10-08T18:30:00",
    end: "2024-10-08T20:00:00"
  },
  {
    title: "Team DMC Basketball Game",
    start: "2024-10-10T19:30:00",
    end: "2024-10-10T20:30:00"
  },
  {
    title: "Academic Committee Meeting",
    start: "2024-10-10T18:30:00",
    end: "2024-10-10T20:30:00"
  },
  {
    title: "DMC LinkedIn Workshop",
    start: "2024-10-10T18:30:00",
    end: "2024-10-10T21:30:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-11T13:00:00",
    end: "2024-10-11T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-13T16:00:00",
    end: "2024-10-13T22:00:00"
  },
  {
    title: "DMC Kickball Game",
    start: "2024-10-14T20:30:00",
    end: "2024-10-14T21:30:00"
  },
  {
    title: "DMC Ringers Basketball Game",
    start: "2024-10-15T19:30:00",
    end: "2024-10-15T20:30:00"
  },
  {
    title: "DMC GBM",
    start: "2024-10-16T18:00:00",
    end: "2024-10-16T21:30:00"
  },
  {
    title: "Team DMC Basketball Game",
    start: "2024-10-17T19:30:00",
    end: "2024-10-17T20:30:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-18T13:00:00",
    end: "2024-10-18T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-20T16:00:00",
    end: "2024-10-20T22:00:00"
  },
  {
    title: "Professional Development Committee Meeting",
    start: "2024-10-21T18:30:00",
    end: "2024-10-21T20:00:00"
  },
  {
    title: "Social Committee Meeting",
    start: "2024-10-22T18:30:00",
    end: "2024-10-22T20:00:00"
  },
  {
    title: "Academic Committee Meeting",
    start: "2024-10-24T18:30:00",
    end: "2024-10-24T20:00:00"
  },
  {
    title: "DMC Resource Fair",
    start: "2024-10-24T11:00:00",
    end: "2024-10-24T14:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-25T13:00:00",
    end: "2024-10-25T17:00:00"
  },
  {
    title: "DMC College Day",
    start: "2024-10-25T08:00:00",
    end: "2024-10-25T13:30:00"
  },
  {
    title: "Library Study Session",
    start: "2024-10-27T16:00:00",
    end: "2024-10-27T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-01T13:00:00",
    end: "2024-11-01T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-03T16:00:00",
    end: "2024-11-03T22:00:00"
  },
  {
    title: "Social Committee Meeting",
    start: "2024-11-05T18:30:00",
    end: "2024-11-05T20:00:00"
  },
  {
    title: "Academic Committee Meeting",
    start: "2024-11-07T18:30:00",
    end: "2024-11-07T20:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-08T13:00:00",
    end: "2024-11-08T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-10T16:00:00",
    end: "2024-11-10T22:00:00"
  },
  {
    title: "IT Committee Meeting",
    start: "2024-11-14T18:30:00",
    end: "2024-11-14T20:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-15T13:00:00",
    end: "2024-11-15T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-17T16:00:00",
    end: "2024-11-17T22:00:00"
  },
  {
    title: "Professional Development Committee Meeting",
    start: "2024-11-18T18:30:00",
    end: "2024-11-18T20:00:00"
  },
  {
    title: "Social Committee Meeting",
    start: "2024-11-19T18:30:00",
    end: "2024-11-19T20:00:00"
  },
  {
    title: "DMC GBM",
    start: "2024-11-20T18:00:00",
    end: "2024-11-20T21:30:00"
  },
  {
    title: "Academic Committee Meeting",
    start: "2024-11-21T18:30:00",
    end: "2024-11-21T20:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-11-22T13:00:00",
    end: "2024-11-22T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-01T16:00:00",
    end: "2024-12-01T22:00:00"
  },
  {
    title: "Social Committee Meeting",
    start: "2024-12-03T18:30:00",
    end: "2024-12-03T20:00:00"
  },
  {
    title: "Academic Committee Meeting",
    start: "2024-12-05T18:30:00",
    end: "2024-12-05T20:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-06T13:00:00",
    end: "2024-12-06T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-08T16:00:00",
    end: "2024-12-08T22:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-13T13:00:00",
    end: "2024-12-13T17:00:00"
  },
  {
    title: "Library Study Session",
    start: "2024-12-15T16:00:00",
    end: "2024-12-15T22:00:00"
  },
  {
    title: "Social Committee Meeting",
    start: "2024-12-17T18:30:00",
    end: "2024-12-17T20:00:00"
  },
  {
    title: "Professional Development Committee Meeting",
    start: "2024-12-16T18:30:00",
    end: "2024-12-16T20:00:00"
  },
  {
    title: "Academic Committee Meeting",
    start: "2024-12-19T18:30:00",
    end: "2024-12-19T20:00:00"
  }
];

export default events;
