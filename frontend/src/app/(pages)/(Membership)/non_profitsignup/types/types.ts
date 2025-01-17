export interface Education {
  degree: string;
  institution: string;
  graduationYear: string;
  fieldOfStudy: string;
}

export interface NonProfitFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Professional Information
  company: string;
  jobTitle: string;
  yearsOfExperience: string;
  linkedIn: string;
  personalWebsite: string;

  // Educational Background
  education: Education[];

  // Skills & Interests
  skills: string;
  interests: string;
  availabilityPerWeek: string;
  preferredCommittees: string[];
  
  // Resume
  resume: File | null;

  // Additional Information
  previousNonProfitExp: string;
  reasonForJoining: string;
  
  // Interest Checkboxes
  mentorshipInterest: boolean;
  boardInterest: boolean;
  volunteerInterest: boolean;
}