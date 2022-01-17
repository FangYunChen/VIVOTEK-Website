import { States, Country } from './continent';

export class Careers {
}

export class Bcc {
    id: string;
    name?: string;
    email?: string;
}

export class CareersVacancy {
    id?: number;
    name?: string;
    description?: string;
    responsibilities?: string;
    requirements?: string;
    title?: string;
    category?: string;
    country?: Country;
    states?: States;
    location?: string;
    displayOrder?: number;
}

export class CareersResume {
    id: number;
    name?: string;
    accountId: string;
    vacancy: CareersVacancy;
    country: Country;
    states?: States;
    forehead: string;
    applicationDate?: string;
    resume: Resume;
    competencyTable: CompetencyTable;
    questionnaire: number[][];
    questionnaireScore: number[];
    createdAt?: string;
}

interface CompetencyTable {
    teamWork: Competency;
    learning: Competency;
    analysisAndResolution: Competency;
    active: Competency;
}

interface Competency {
    situation: string;
    action: string;
    result: string;
}

interface Resume {
    name: string;
    sex: number;
    birthday: string;
    idNo: string;
    maritalStatus: number;
    childrenNumber: number;
    militaryService: number;
    email: string;
    cellphone: string;
    presentAddress: string;
    presentPhone: string;
    permanentAddress: string;
    permanentPhone: string;
    education: Education[];
    employmentRecord: EmploymentRecord[];
    familyInformation: FamilyInformation[];
    emergencyContact: EmergencyContact;
    interests: string;
    skills: string;
    workExpectation: string;
    futureAspiration: string;
    strengthAndWeakness: string;
    expectedSalary: string;
    availabilityDate: string;
    whereCatchVacancy: string;
    reference: Reference[];
    files: File[];
    note: string;
}

interface File {
    name: string;
    url: string;
}

interface Reference {
    name: string;
    company: string;
    title: string;
    phone: string;
    relation: string;
}

interface EmergencyContact {
    name: string;
    relation: string;
    phone: string;
}

interface FamilyInformation {
    relation: string;
    name: string;
    job: Job;
}

interface Job {
    company: string;
    title: string;
}

interface EmploymentRecord {
    companyName: string;
    department: string;
    title: string;
    fromDate: string;
    toDate: string;
    reasonForLeaving: string;
    supervisor: Supervisor;
}

interface Supervisor {
    name: string;
    title: string;
}

interface Education {
    schoolName: string;
    major: string;
    division: number;
    degree: string;
    fromDate: string;
    toDate: string;
    gradute: number;
}
