const events = [
  {
    title: "DMC Wellness Event",
    start: "2024-12-17T18:00:00",
    end: "2024-12-17T20:00:00"
  },
  {
    title: "DMC Diabetes Awareness Walk",
    start: "2024-11-17T09:00:00",
    end: "2024-11-17T11:00:00"
  },
  {
    title: "DMC CGI Panel Event",
    start: "2025-02-11T18:30:00",
    end: "2025-02-11T20:30:00"
  },
  {
  title: "Jacob's Chance",
  start: "2024-11-02T12:30:00",
  end: "2024-11-02T14:00:00"
  },
  {
  title: "Library Study Session",
  start: "2024-11-02T12:30:00",
  end: "2024-11-02T14:00:00"
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
    start: "2024-11-21T18:30:00",
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
    start: "2024-11-13T18:00:00",
    end: "2024-11-13T21:30:00"
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
