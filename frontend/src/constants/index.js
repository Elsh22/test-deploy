import academImage from '../assets/AcademicPictureComittee.png';
import communityImage from '../newassest/Com.jpg';
import infoImage from '../newassest/ITPicImproved.png';
import dmcImage from '../assets/Miscellaneous/background1.jpg';
import profImage from '../assets/Miscellaneous/profesionaldevelopment.jpg';
import socailImage from '../newassest/SoicalPic2.jpg';

  export const exploreWorlds = [
    {
      id: 'world-1',
      imgUrl: academImage.src,
      title: 'Academic Committee',
      text: 'The Academic committee serves as a gateway between the general body and themselves that helps connect the members of Developing Men of Color with the various resources the campuses and club itself has to offer to help the succeed in the classroom.',
      Chairman: 'Josh Asare, Noad Daniel',
      Buttonlink:'/ACACommittee',
    },
    {
      id: 'world-2',
      imgUrl: communityImage.src,
      title: 'Community Service Committee',
      text: 'The community service committe is a group of young men who happen to focus on ways in which Developing Men of Color can help the local community of richmond and also make other members aware of the various opportunities there are to help make the community better',
      Chairman: 'Clyrde Clark',
      Buttonlink:'/CommCommittee',
    },
    {
      id: 'world-3',
      imgUrl: infoImage.src,
      title: 'Information Technology Committee',
      text: 'Information Technology Committee: DMC has a brand new committee called the “Information Technology Committee” (IT). This committee will consist of new innovative ideas and technologies being added to the organization. The committee will be actively open to join.',
      Chairman: 'Mohamed Elnafe, Jason Arias',
      Buttonlink:'/ITCommittee',
    },
    {
      id: 'world-4',
      imgUrl: dmcImage.src,
      title: 'Developing Men of Color GroupMe',
      Buttonlink:'https://web.groupme.com/join_group/55311378/BIK8Ub1u',
    },
    {
      id: 'world-5',
      imgUrl: profImage.src,
      title: 'Professional Development',
      text: 'The professional development committe is a group of members who pride themselves on ensuring the general body is presented with opportunities to help them excel in the professional settings we hope to provide our members with.',
      Chairman: 'Timi Ojo, Brycen Harris, Derrick Pittrell',
      Buttonlink:'/ProfCommittee',
    },
    {
      id: 'world-6',
      imgUrl: socailImage.src,
      title: 'Social Committee',
      text: 'The social committee consists of members who help to host and set up events that will help our members flourish socially.',
      Chairman: 'Pathe Diallo, Kojo Mbir',
      Buttonlink:'/SocCommittee',
    },
  ];

export const startingFeatures = [
   'Express Interest: Notify any E-Board Member or Committee Chair about the opportunity to become a mentor (A google form is always sent out near the beginning of the semester)',
   'Attend Orientation: an orientation session session for potential mentors to provide an overview of the mentoring program, its goals, and the expectations for mentors will be sent out via email, GroupMe, and at GBMs',
   'Submit Application & Background Check: Provided through CIS',
];

export const StartStepsSports = [
  'Purchase the intramural semester pass on the VCU recwell website.',
  'Fill out interest for more the respective sport',
  'Sign the contract agreeing to intramural sports policies.',
];
