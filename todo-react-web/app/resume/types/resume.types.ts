export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ResumeLanguage {
  name: string;
  level: string;
}

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  country: string;
  nationality: string;
  dateOfBirth: string;
  linkedIn: string;
  photoBase64: string;
  profile: string;
  experiences: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  languages: ResumeLanguage[];
  sidebarColor: string;
}

export const DEFAULT_RESUME: ResumeData = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  country: '',
  nationality: '',
  dateOfBirth: '',
  linkedIn: '',
  photoBase64: '',
  profile: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  sidebarColor: '#1a5c4f',
};