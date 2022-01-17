export class Resume {
  vacancyId?: number;

  forehead: string = null;

  resume: {
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
    education: [
      {
        schoolName: string;
        major: string;
        division: number;
        degree: string;
        fromDate: string;
        toDate: string;
        gradute: number;
      }
    ];
    employmentRecord: [
      {
        companyName: string;
        department: string;
        title: string;
        fromDate: string;
        toDate: string;
        reasonForLeaving: string;
        supervisor: {
          name: string;
          title: string;
        };
      }
    ];
    familyInformation: [
      {
        relation: string;
        name: string;
        job: {
          company: string;
          title: string;
        };
      }
    ];
    emergencyContact: {
      name: string;
      relation: string;
      phone: string;
    };
    interests: string;
    skills: string;
    workExpectation: string;
    futureAspiration: string;
    strengthAndWeakness: string;
    expectedSalary: string;
    availabilityDate: string;
    whereCatchVacancy: string;
    reference: [
      {
        name: string;
        company: string;
        title: string;
        phone: string;
        relation: string;
      }
    ];
    files: {
      name: string;
      url: string;
      size?: number;
    }[];
    note: string;
  } = null;
  competencyTable: {
    teamWork: {
      situation: string;
      action: string;
      result: string;
    };
    learning: {
      situation: string;
      action: string;
      result: string;
    };
    analysisAndResolution: {
      situation: string;
      action: string;
      result: string;
    };
    active: {
      situation: string;
      action: string;
      result: string;
    };
  } = null;
  questionnaire: number[][] = [];
}
