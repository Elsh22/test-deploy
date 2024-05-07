// events.js
const events = [
    {
      title: "Men of color mixer in the commons",
      start: "2023-09-17T16:00:00",
      end: "2023-09-17T19:00:00"
    },
    {
      title: "1st GBM at 7pm in the ram lounge",
      start: "2023-09-20T19:00:00",
      end: "2023-09-20T21:00:00"
    },
    {
      title: "DMC Linkedin/Internship Workshop",
      start: "2023-09-28T19:00:00",
      end: "2023-09-28T21:00:00"
    },
    {
      title: "2nd GBM @7pm @Stem Building room 218 and 216",
      start: "2023-10-18T19:00:00",
      end: "2023-10-18T21:00:00"
    },
    {
      title: "Jacob Chance Kickball",
      start: "2023-10-28T11:00:00",
      end: "2023-10-28T12:30:00"
    },
    {
      title: "3rd GBM at 7pm in the Rams Lounge",
      start: "2023-11-15T19:00:00",
      end: "2023-11-15T21:00:00"
    },
    {
      title: "United2heal",
      start: "2023-11-10T15:00:00",
      end: "2023-11-10T18:00:00"
    },
    {
      title: "Fall break",
      start: "2023-11-20T00:00:00",
      end: "2023-11-25T00:00:00"
    },
    {
      title: "Finals start",
      start: "2023-12-12T00:00:00",
      end: "2023-12-19T00:00:00"
    },
    {
      title: "Winter break",
      start: "2023-12-20T00:00:00"
    },
    {
      title: "E-Board Retreat",
      start: "2023-08-21T00:00:00",
      end: "2023-08-21T23:59:59"
    },
    {
      title: "SOVO Fair",
      start: "2023-08-25T15:00:00",
      end: "2023-08-25T18:00:00"
    },
    {
      title: "E-Board Meeting",
      start: "2023-08-30T19:00:00",
      end: "2023-08-30T21:30:00"
    },
    {
      title: "University Closed",
      start: "2023-09-04T00:00:00",
      end: "2023-09-04T23:59:59"
    },
    {
      title: "E-Board Meeting",
      start: "2023-09-06T19:00:00",
      end: "2023-09-06T21:00:00"
    },
    {
      title: "Committee Chair Meeting",
      start: "2023-09-11T17:30:00",
      end: "2023-09-11T18:30:00"
    },
    {
      title: "E-Board Meeting",
      start: "2023-09-13T19:00:00",
      end: "2023-09-13T21:00:00"
    },
    {
      title: "DMC Agenda Meeting",
      start: "2023-09-14T17:00:00",
      end: "2023-09-14T18:00:00"
    },
    {
      title: "Committee Chair Meeting",
      start: "2023-09-25T17:30:00",
      end: "2023-09-25T18:30:00"
    },
    {
      title: "E-Board Meeting",
      start: "2023-09-27T19:00:00",
      end: "2023-09-27T21:00:00"
    },
    {
      title: "E-Board Meeting",
      start: "2023-10-04T19:00:00",
      end: "2023-10-04T21:00:00"
    },
    {
      title: "DMC Agenda Meeting",
      start: "2023-10-05T17:00:00",
      end: "2023-10-05T18:00:00"
    },
    {
      title: "Committee Chair Meeting",
      start: "2023-10-09T17:30:00",
      end: "2023-10-09T18:30:00"
    },
    {
      title: "E-Board Meeting",
      start: "2023-10-11T19:00:00",
      end: "2023-10-11T21:00:00"
    },
    {
      title: "DMC Agenda Meeting",
      start: "2023-10-12T17:00:00",
      end: "2023-10-12T18:00:00"
    },
    {
      title: "United2Heal",
      start: "2023-10-13T15:00:00",
      end: "2023-10-13T18:00:00"
    },
    {
      title: "Certification Super Session",
      start: "2023-10-19T18:00:00",
      end: "2023-10-19T20:00:00"
    },
    {
      title: "Committee Chair Meeting",
      start: "2023-10-23T17:30:00",
      end: "2023-10-23T18:30:00"
    },
    {
      title: "College Day",
      start: "2023-10-24T08:00:00",
      end: "2023-10-24T15:00:00"
    },
    {
      title: "E-Board Meeting",
      start: "2023-10-25T19:00:00",
      end: "2023-10-25T21:00:00"
    },
    {
      title: "DMC Agenda Meeting",
      start: "2023-10-26T17:00:00",
      end: "2023-10-26T18:00:00"
    },
    {
      title: "United2Heal",
      start: "2023-10-27T15:00:00",
      end: "2023-10-27T18:00:00"
    },
    {
      title: "Committee Chair Meeting",
      start: "2023-11-06T17:30:00",
      end: "2023-11-06T18:30:00"
    },
    {
      title: "E-Board Meeting",
      start: "2023-11-08T19:00:00",
      end: "2023-11-08T21:00:00"
    },
    {
      title: "DMC Agenda Meeting",
      start: "2023-11-09T17:00:00",
      end: "2023-11-09T18:00:00"
    },
    {
      title: "Committee Chair Meeting",
      start: "2023-11-27T17:30:00",
      end: "2023-11-27T18:30:00"
    },
    {
      title: "E-Board Meeting",
      start: "2023-11-29T19:00:00",
      end: "2023-11-29T21:00:00"
    },
    {
      title: "DMC Agenda Meeting",
      start: "2023-11-30T17:00:00",
      end: "2023-11-30T18:00:00"
    },
    {
      title: "E-Board Retreat",
      start: "2023-12-03T00:00:00",
      end: "2023-12-03T23:59:59"
    },
    {
      "title": "Classes begin",
      "start": "2024-01-16T00:00:00",
      "end": "2024-01-16T23:59:59"
    },
    {
      "title": "Committee Chair Meeting",
      "start": "2024-01-22T17:30:00",
      "end": "2024-01-22T18:30:00"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-01-24T18:00:00",
      "end": "2024-01-24T20:00:00"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-01-31T18:00:00",
      "end": "2024-01-31T20:00:00"
    },
    {
      "title": "Resource Fair @Richmond salons 1 and 2",
      "start": "2024-02-01T00:00:00",
      "end": "2024-02-01T23:59:59"
    },
    {
      "title": "Committee Chair Meeting",
      "start": "2024-02-05T17:30:00",
      "end": "2024-02-05T18:30:00"
    },
    {
      "title": "1st General Body Meeting",
      "start": "2024-02-07T19:00:00",
      "end": "2024-02-07T21:00:00",
      backgroundColor: '#ff0000'
    },
    {
      "title": "Omsa Rap session",
      "start": "2024-02-08T00:00:00",
      "end": "2024-02-08T23:59:59"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-02-14T18:00:00",
      "end": "2024-02-14T20:00:00"
    },
    {
      "title": "Interview/Resume/Cover Letter Workshop",
      "start": "2024-02-16T00:00:00",
      "end": "2024-02-16T23:59:59"
    },
    {
      "title": "Committee Chair Meeting",
      "start": "2024-02-19T17:30:00",
      "end": "2024-02-19T18:30:00"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-02-21T18:00:00",
      "end": "2024-02-21T20:00:00"
    },
    {
      "title": "Virginia Tech Conference",
      "start": "2024-02-24T10:00:00",
      "end": "2024-02-24T16:00:00"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-02-28T18:00:00",
      "end": "2024-02-28T20:00:00"
    },
    {
      "title": "Spring break",
      "start": "2024-03-04T00:00:00",
      "end": "2024-03-08T23:59:59"
    },
    {
      "title": "Committee Chair Meeting",
      "start": "2024-03-11T17:30:00",
      "end": "2024-03-11T18:30:00"
    },
    {
      "title": "E-Board Meeting Election",
      "start": "2024-03-13T18:00:00",
      "end": "2024-03-13T20:00:00"
    },
    {
      "title": "2nd General Body Meeting",
      "start": "2024-03-20T19:00:00",
      "end": "2024-03-20T21:00:00",
      backgroundColor: '#ff0000'
    },
    {
      "title": "Committee Chair Meeting",
      "start": "2024-03-25T17:30:00",
      "end": "2024-03-25T18:30:00"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-03-27T18:00:00",
      "end": "2024-03-27T20:00:00"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-04-03T18:00:00",
      "end": "2024-04-03T20:00:00"
    },
    {
      "title": "Committee Chair Meeting",
      "start": "2024-04-08T17:30:00",
      "end": "2024-04-08T18:30:00"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-04-10T18:00:00",
      "end": "2024-04-10T20:00:00"
    },
    {
      "title": "3rd General Body Meeting",
      "start": "2024-04-17T19:00:00",
      "end": "2024-04-17T21:00:00",
      backgroundColor: '#ff0000'
    },
    {
      "title": "Committee Chair Meeting",
      "start": "2024-04-22T17:30:00",
      "end": "2024-04-22T18:30:00"
    },
    {
      "title": "E-Board Meeting",
      "start": "2024-04-24T18:00:00",
      "end": "2024-04-24T20:00:00"
    },
    {
      "title": "Spring Retreat",
      "start": "2024-05-01T00:00:00",
      "end": "2024-05-01T23:59:59"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-01-26T10:30:00",
      "end": "2024-01-26T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-02-02T10:30:00",
      "end": "2024-02-02T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-02-09T10:30:00",
      "end": "2024-02-09T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-02-16T10:30:00",
      "end": "2024-02-16T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-02-23T10:30:00",
      "end": "2024-02-23T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-03-01T10:30:00",
      "end": "2024-03-01T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-03-15T10:30:00",
      "end": "2024-03-15T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-03-22T10:30:00",
      "end": "2024-03-22T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-03-29T10:30:00",
      "end": "2024-03-29T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-04-05T10:30:00",
      "end": "2024-04-05T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-04-12T10:30:00",
      "end": "2024-04-12T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-04-19T10:30:00",
      "end": "2024-04-19T11:30:00"
    },
    {
      "title": "Mentoring Craver",
      "start": "2024-04-26T10:30:00",
      "end": "2024-04-26T11:30:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-01-31T11:40:00",
      "end": "2024-01-31T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-01T11:40:00",
      "end": "2024-02-01T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-07T11:40:00",
      "end": "2024-02-07T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-08T11:40:00",
      "end": "2024-02-08T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-14T11:40:00",
      "end": "2024-02-14T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-15T11:40:00",
      "end": "2024-02-15T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-21T11:40:00",
      "end": "2024-02-21T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-22T11:40:00",
      "end": "2024-02-22T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-28T11:40:00",
      "end": "2024-02-28T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-02-29T11:40:00",
      "end": "2024-02-29T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-03-13T11:40:00",
      "end": "2024-03-13T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-03-14T11:40:00",
      "end": "2024-03-14T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-03-20T11:40:00",
      "end": "2024-03-20T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-03-21T11:40:00",
      "end": "2024-03-21T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-03-27T11:40:00",
      "end": "2024-03-27T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-03-28T11:40:00",
      "end": "2024-03-28T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-04-03T11:40:00",
      "end": "2024-04-03T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-04-04T11:40:00",
      "end": "2024-04-04T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-04-10T11:40:00",
      "end": "2024-04-10T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-04-11T11:40:00",
      "end": "2024-04-11T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-04-17T11:40:00",
      "end": "2024-04-17T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-04-18T11:40:00",
      "end": "2024-04-18T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-04-24T11:40:00",
      "end": "2024-04-24T12:40:00"
    },
    {
      "title": "Mentoring Fox",
      "start": "2024-04-25T11:40:00",
      "end": "2024-04-25T12:40:00"
    },
    {
      "title": "Study Session",
      "start": "2024-01-26T14:00:00",
      "end": "2024-01-26T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-01-26T17:00:00",
      "end": "2024-01-26T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-01-28T18:00:00",
      "end": "2024-01-28T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-01-28T18:30:00",
      "end": "2024-01-28T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-01-30T14:00:00",
      "end": "2024-01-30T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-01-31T18:00:00",
      "end": "2024-01-31T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-02-01T18:00:00",
      "end": "2024-02-01T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-02-02T14:00:00",
      "end": "2024-02-02T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-02-02T17:00:00",
      "end": "2024-02-02T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-02-04T18:00:00",
      "end": "2024-02-04T21:00:00",
      "location": "Library room 250"
    },

    {
      "title": "Study Session",
      "start": "2024-02-04T18:30:00",
      "end": "2024-02-04T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-02-06T14:00:00",
      "end": "2024-02-06T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-02-07T18:00:00",
      "end": "2024-02-07T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-02-08T18:00:00",
      "end": "2024-02-08T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-02-09T14:00:00",
      "end": "2024-02-09T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-02-09T17:00:00",
      "end": "2024-02-09T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-02-11T18:00:00",
      "end": "2024-02-11T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-02-11T18:30:00",
      "end": "2024-02-11T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-02-13T14:00:00",
      "end": "2024-02-13T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-02-14T18:00:00",
      "end": "2024-02-14T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-02-15T17:00:00",
      "end": "2024-02-15T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-02-18T18:00:00",
      "end": "2024-02-18T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-02-18T18:30:00",
      "end": "2024-02-18T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-02-20T14:00:00",
      "end": "2024-02-20T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-02-21T18:00:00",
      "end": "2024-02-21T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-02-22T14:00:00",
      "end": "2024-02-22T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-02-22T17:00:00",
      "end": "2024-02-22T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-02-25T18:00:00",
      "end": "2024-02-25T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-02-25T18:30:00",
      "end": "2024-02-25T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-02-27T14:00:00",
      "end": "2024-02-27T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-02-28T18:00:00",
      "end": "2024-02-28T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-03-01T14:00:00",
      "end": "2024-03-01T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-03-01T17:00:00",
      "end": "2024-03-01T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-03-12T14:00:00",
      "end": "2024-03-12T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-03-13T18:00:00",
      "end": "2024-03-13T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-03-14T18:00:00",
      "end": "2024-03-14T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-03-15T14:00:00",
      "end": "2024-03-15T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-03-15T17:00:00",
      "end": "2024-03-15T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-03-17T18:00:00",
      "end": "2024-03-17T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-03-17T18:30:00",
      "end": "2024-03-17T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-03-19T14:00:00",
      "end": "2024-03-19T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-03-20T18:00:00",
      "end": "2024-03-20T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-03-21T18:00:00",
      "end": "2024-03-21T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-03-22T14:00:00",
      "end": "2024-03-22T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-03-22T17:00:00",
      "end": "2024-03-22T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-03-24T18:00:00",
      "end": "2024-03-24T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-03-24T18:30:00",
      "end": "2024-03-24T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-03-26T14:00:00",
      "end": "2024-03-26T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-03-27T18:00:00",
      "end": "2024-03-27T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-03-28T18:00:00",
      "end": "2024-03-28T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-03-29T14:00:00",
      "end": "2024-03-29T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-03-29T17:00:00",
      "end": "2024-03-29T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-03-31T18:00:00",
      "end": "2024-03-31T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-03-31T18:30:00",
      "end": "2024-03-31T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-02T14:00:00",
      "end": "2024-04-02T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-04-03T18:00:00",
      "end": "2024-04-03T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-04-04T18:00:00",
      "end": "2024-04-04T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-04-05T14:00:00",
      "end": "2024-04-05T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-04-05T17:00:00",
      "end": "2024-04-05T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-04-07T18:00:00",
      "end": "2024-04-07T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-07T18:30:00",
      "end": "2024-04-07T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-09T14:00:00",
      "end": "2024-04-09T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-04-10T18:00:00",
      "end": "2024-04-10T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-04-11T18:00:00",
      "end": "2024-04-11T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-04-12T14:00:00",
      "end": "2024-04-12T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-04-12T17:00:00",
      "end": "2024-04-12T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-04-14T18:00:00",
      "end": "2024-04-14T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-14T18:30:00",
      "end": "2024-04-14T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-16T14:00:00",
      "end": "2024-04-16T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-04-17T18:00:00",
      "end": "2024-04-17T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-04-18T18:00:00",
      "end": "2024-04-18T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-04-19T14:00:00",
      "end": "2024-04-19T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-04-19T17:00:00",
      "end": "2024-04-19T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-04-21T18:00:00",
      "end": "2024-04-21T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-21T18:30:00",
      "end": "2024-04-21T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-23T14:00:00",
      "end": "2024-04-23T16:00:00",
      "location": "Hibbs hall"
    },
    {
      "title": "Study Session",
      "start": "2024-04-24T18:00:00",
      "end": "2024-04-24T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-04-25T18:00:00",
      "end": "2024-04-25T21:00:00",
      "location": "Library room 301d"
    },
    {
      "title": "Study Session",
      "start": "2024-04-26T14:00:00",
      "end": "2024-04-26T15:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-04-26T17:00:00",
      "end": "2024-04-26T18:00:00",
      "location": "Library room"
    },
    {
      "title": "Study Session",
      "start": "2024-04-28T18:00:00",
      "end": "2024-04-28T21:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-28T18:30:00",
      "end": "2024-04-28T22:00:00",
      "location": "Library room 250"
    },
    {
      "title": "Study Session",
      "start": "2024-04-30T14:00:00",
      "end": "2024-04-30T16:00:00",
      "location": "Hibbs hall"
    }, 
    {
      "title": "Get Fitted",
      "start": "2024-03-16T12:30:00",
      "end": "2024-03-16T16:00:00",
    },  
    {
      "title": "Suit Day",
      "start": "2024-05-03T19:00:00",
      "end": "2024-05-03T20:00:00",
    },     
    {
      "title": "Shadow Day",
      "start": "2024-04-15T12:30:00",
      "end": "2024-04-15T16:00:00",
    },  
    {
      "title": "Not On Your Resume",
      "start": "2024-04-16T17:00:00",
      "end": "2024-04-16T18:00:00",
    }, 
    {
      "title": "Committee vs. Committee Soccer Game",
      "start": "2024-04-28T13:00:00",
      "end": "2024-04-28T16:00:00",
    },  
    {
      "title": "Soccer championship game",
      "start": "2024-04-29T13:00:00",
      "end": "2024-04-29T16:00:00",
    },  

  ];
  
  export default events;