export interface Program {
  id: number;
  tag: string;
  dDay: string;
  title: string;
  org: string;
  status: string;
  statusVariant?: 'soon' | 'closed';
  bg: string;
  chips: string[];
  weeks: string;
  deadline: string;
}

export interface CurriculumItem {
  weeks: string;
  desc: string;
}

export interface OrgInfo {
  name: string;
  region: string;
  phone: string;
  kakao: string;
  homepage: string;
  email: string;
}

export interface ProgramDetail {
  intro: string;
  description: string;
  qualification: string;
  curriculum: CurriculumItem[];
  org: OrgInfo;
}

export interface FilterValues {
  region: string[];
  level: string[];
  mode: string[];
  period: string[];
  status: string[];
  people: string[];
}

export type FilterKey = keyof FilterValues;

export interface Review {
  id: number;
  name: string;
  program: string;
  text: string;
  avatar: string;
}

export interface SupportInfo {
  id: number;
  title: string;
  category: string;
  description: string;
  eligibility: string;
  benefit: string;
  contact: string;
}
