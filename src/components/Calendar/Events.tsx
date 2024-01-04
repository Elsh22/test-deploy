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
    }    
  
  ];
  
  export default events;