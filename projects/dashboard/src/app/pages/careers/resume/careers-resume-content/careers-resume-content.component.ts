import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CareersResume } from '../../../../vvtk-core/classes/careers';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

declare const pdfMake;
declare const moment;

@Component({
  selector: 'vvtk-careers-resume-content',
  templateUrl: './careers-resume-content.component.html',
  styleUrls: ['./careers-resume-content.component.scss']
})
export class CareersResumeContentComponent implements OnInit, OnDestroy {
  selectedLanguage$: Subscription;

  id: number;
  data: CareersResume;

  diceText = [
    ['心胸開放', '精確', '果斷', '耐心'],
    ['令人信服的', '知足的', '膽怯的', '競爭性強的'],
    ['穩定的', '強有力的', '準時的', '迷人的'],
    ['有幹勁的', '滿意的', '有說服力的', '尊重人的'],
    ['溫和的', '焦躁不安的', '受歡迎的', '拘泥的'],
    ['謹慎的', '激勵人心的', '服從的', '意志堅強的'],
    ['圓滑的', '遵守的', '勇敢的', '忠心的'],
    ['堅持的', '拘束的', '善交際的', '順從的'],
    ['謙虛的', '樂觀的', '穩重的', '獨斷的'],
    ['鎮定的', '坦率的', '熱烈的', '準確的'],
    ['承擔的', '體貼的', '果斷的', '優雅的'],
    ['渴望的', '真摯的', '和諧的', '得體的'],
    ['有魅力的', '自恃的', '精準的', '溫厚的'],
    ['信任的', '健談的', '好的成員', '獨創性的'],
    ['固執的', '挑剔的', '溫和的', '愉快的'],
    ['活潑的', '遵守紀律的', '支配的', '同情心的']
  ];

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {}

  ngOnInit() {
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      { path: `api/Careers/Resume/${this.id}` },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;
          const zone = moment.parseZone(new Date()).utcOffset();
          this.data.applicationDate = moment(this.data.applicationDate).add(
            zone,
            'minutes'
          );
        }
      }
    );
  }

  downloadPDF() {
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
      },
      msjh: {
        normal: 'msjh.ttf',
        bold: 'msjh.ttf',
        italics: 'msjh.ttf',
        bolditalics: 'msjh.ttf'
      }
    };
    const content: any[] = [];
    content.push(
      {
        table: {
          body: this.getResume(),
          widths: ['auto', '*', 'auto', '*', 'auto', '*']
        }
      },
      {
        table: {
          body: this.getEducation(),
          widths: ['auto', '*', 'auto', '*', '*', '*', 'auto']
        }
      },
      {
        table: {
          body: this.getEmploymentRecord(),
          widths: ['auto', 'auto', '*', '*', '*', 'auto', 'auto', 'auto']
        }
      },
      {
        table: {
          body: this.getFamilyInformation(),
          widths: ['*', '*', '*', '*', '*', '*']
        }
      },
      {
        table: {
          body: this.getProfession(),
          widths: ['auto', '*', 'auto', '*', 'auto', '*']
        }
      },
      {
        table: {
          body: this.getReference(),
          widths: ['*', '*', '*', '*', '*']
        }
      },
      {
        table: {
          body: this.getFiles(),
          widths: ['*']
        }
      },
      {
        table: {
          body: this.getNote(),
          widths: ['*']
        }
      }
    );
    if (this.data.forehead) {
      content.push({
        table: {
          body: this.getForehead(),
          widths: ['*']
        }
      });
    }
    if (this.data.competencyTable) {
      content.push(
        {
          text: '職能項目',
          fontSize: 15,
          alignment: 'center',
          margin: [0, 0, 0, 5],
          pageBreak: 'before'
        },
        {
          table: {
            body: this.getCompetencyTable(),
            widths: ['auto', '*']
          }
        }
      );
    }
    if (this.data.questionnaire) {
      content.push(
        {
          text: 'DICE 量表',
          fontSize: 15,
          alignment: 'center',
          margin: [0, 0, 0, 5],
          pageBreak: 'before'
        },
        {
          table: {
            body: this.getQuestionnaire(),
            widths: ['*', '*', '*', '*', '*', '*', '*', '*']
          }
        },
        {
          text: '測驗結果',
          fontSize: 12,
          alignment: 'center',
          margin: [0, 7, 0, 5]
        },
        {
          table: {
            body: this.getQuestionnaireScore(),
            widths: ['*', '*', '*', '*', '*', '*', '*', '*']
          }
        }
      );
    }
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [10, 50, 10, 30],
      defaultStyle: {
        font: 'msjh'
      },
      footer: (currentPage, pageCount) => {
        return [
          {
            text: `${currentPage} of ${pageCount}`,
            fontSize: 10,
            alignment: 'center'
          },
          {
            text: `Data ID: ${this.data.id}`,
            fontSize: 8,
            alignment: 'center'
          }
        ];
      },
      header: (currentPage, pageCount, pageSize) => {
        return [
          {
            text: '晶 睿 通 訊 股 份 有 限 公 司',
            alignment: 'center',
            fontSize: 15,
            margin: [0, 8, 0, 0]
          },
          {
            text: 'Employment Application',
            fontSize: 10,
            alignment: 'center'
          }
        ];
      },
      styles: {
        th: {
          fontSize: 8,
          fillColor: '#EEE',
          margin: 1
        },
        td: {
          fontSize: 10,
          fillColor: 'white'
        },
        header: {
          fontSize: 10,
          fillColor: '#DDD'
        },
        center: {
          alignment: 'center'
        }
      },
      content: content
    };
    try {
      pdfMake
        .createPdf(docDefinition)
        .download(`${this.data.vacancy.name}-${this.data.resume.name}`);
    } catch (err) {
      this.toolsService.showSnackBar(err, 3000);
    }
  }

  getResume() {
    const body: any[] = [];
    body.push([
      {
        text: 'Name',
        style: 'th'
      },
      {
        text: this.data.resume.name,
        style: 'td'
      },
      {
        text: 'Sex',
        style: 'th'
      },
      {
        text: ['Male', 'Female'][this.data.resume.sex],
        style: 'td'
      },
      {
        text: 'Application Date',
        style: 'th'
      },
      {
        text: moment(this.data.applicationDate).format('YYYY/MM/DD HH:mm'),
        style: 'td'
      }
    ]);
    body.push([
      {
        text: 'Date of Birth',
        style: 'th'
      },
      {
        text: moment(this.data.resume.birthday).format('YYYY/MM/DD'),
        style: 'td'
      },
      {
        text: 'ID Card No.',
        style: 'th'
      },
      {
        text: this.data.resume.idNo,
        style: 'td'
      },
      {
        text: 'Applied Position',
        style: 'th'
      },
      {
        text: this.data.vacancy.name,
        style: 'td'
      }
    ]);
    body.push([
      {
        text: 'Marital Status',
        style: 'th'
      },
      {
        text: ['Single', 'Married'][this.data.resume.maritalStatus],
        style: 'td'
      },
      {
        text: 'Number of Children',
        style: 'th'
      },
      {
        text: this.data.resume.childrenNumber,
        style: 'td'
      },
      {
        text: 'Military Service',
        style: 'th'
      },
      {
        text: ['Retired', 'Exempt from service', 'Not serviced'][
          this.data.resume.militaryService
        ],
        style: 'td'
      }
    ]);
    body.push([
      {
        text: 'E-MAIL',
        style: 'th'
      },
      {
        text: this.data.resume.email,
        colSpan: 3,
        style: 'td'
      },
      {},
      {},
      {
        text: 'Cell Phone Number',
        style: 'th'
      },
      {
        text: this.data.resume.cellphone,
        style: 'td'
      }
    ]);
    body.push([
      {
        text: 'Present Address',
        style: 'th'
      },
      {
        text: this.data.resume.presentAddress,
        colSpan: 3,
        style: 'td'
      },
      {},
      {},
      {
        text: 'Phone Number',
        style: 'th'
      },
      {
        text: this.data.resume.presentPhone,
        style: 'td'
      }
    ]);
    body.push([
      {
        text: 'Permanent Address',
        style: 'th'
      },
      {
        text: this.data.resume.permanentAddress,
        colSpan: 3,
        style: 'td'
      },
      {},
      {},
      {
        text: 'Phone Number',
        style: 'th'
      },
      {
        text: this.data.resume.permanentPhone,
        style: 'td'
      }
    ]);
    return body;
  }

  getEducation() {
    const body: any[] = [];
    body.push([
      {
        text: 'Education',
        colSpan: 7,
        style: ['header', 'center']
      },
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
    body.push([
      {
        text: 'Name of School',
        style: ['th', 'center']
      },
      {
        text: 'Major in',
        style: ['th', 'center']
      },
      {
        text: 'Day/ Evening Division',
        style: ['th', 'center']
      },
      {
        text: 'Degree',
        style: ['th', 'center']
      },
      {
        text: 'From',
        style: ['th', 'center']
      },
      {
        text: 'To',
        style: ['th', 'center']
      },
      {
        text: 'Graduate or not',
        style: ['th', 'center']
      }
    ]);
    this.data.resume.education.forEach(education => {
      body.push([
        {
          text: education.schoolName,
          style: ['td', 'center']
        },
        {
          text: education.major,
          style: ['td', 'center']
        },
        {
          text: ['Day', 'Evening'][education.division],
          style: ['td', 'center']
        },
        {
          text: education.degree,
          style: ['td', 'center']
        },
        {
          text: education.fromDate,
          style: ['td', 'center']
        },
        {
          text: education.toDate,
          style: ['td', 'center']
        },
        {
          text: ['Graduate', 'Not'][education.gradute],
          style: ['td', 'center']
        }
      ]);
    });
    return body;
  }

  getEmploymentRecord() {
    const body: any[] = [];
    body.push([
      {
        text: 'Employment Record',
        colSpan: 8,
        style: ['header', 'center']
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
    body.push([
      {
        text: 'Name of Company',
        style: ['th', 'center']
      },
      {
        text: 'Department',
        style: ['th', 'center']
      },
      {
        text: 'Job Title',
        style: ['th', 'center']
      },
      {
        text: 'From',
        style: ['th', 'center']
      },
      {
        text: 'To',
        style: ['th', 'center']
      },
      {
        text: 'Reason for Leaving',
        style: ['th', 'center']
      },
      {
        // tslint:disable-next-line:quotemark
        text: "Supervisor's Name",
        style: ['th', 'center']
      },
      {
        // tslint:disable-next-line:quotemark
        text: "Supervisor's Title",
        style: ['th', 'center']
      }
    ]);
    this.data.resume.employmentRecord.forEach(employmentRecord => {
      body.push([
        {
          text: employmentRecord.companyName,
          style: ['td', 'center']
        },
        {
          text: employmentRecord.department,
          style: ['td', 'center']
        },
        {
          text: employmentRecord.title,
          style: ['td', 'center']
        },
        {
          text: employmentRecord.fromDate,
          style: ['td', 'center']
        },
        {
          text: employmentRecord.toDate,
          style: ['td', 'center']
        },
        {
          text: employmentRecord.reasonForLeaving,
          style: ['td', 'center']
        },
        {
          text: employmentRecord.supervisor.name,
          style: ['td', 'center']
        },
        {
          text: employmentRecord.supervisor.title,
          style: ['td', 'center']
        }
      ]);
    });
    return body;
  }

  getFamilyInformation() {
    const body: any[] = [];
    body.push([
      {
        text: 'Information regarding family',
        colSpan: 6,
        style: ['header', 'center']
      },
      {},
      {},
      {},
      {},
      {}
    ]);
    body.push([
      {
        text: 'Relation',
        style: ['th', 'center']
      },
      {
        text: 'Name',
        style: ['th', 'center']
      },
      {
        text: 'Job & Title',
        style: ['th', 'center']
      },
      {
        text: 'Relation',
        style: ['th', 'center']
      },
      {
        text: 'Name',
        style: ['th', 'center']
      },
      {
        text: 'Job & Title',
        style: ['th', 'center']
      }
    ]);
    for (let i = 0; i < this.data.resume.familyInformation.length; i += 2) {
      const cells: any[] = [];
      const familyInformation = this.data.resume.familyInformation[i];
      cells.push(
        {
          text: familyInformation.relation,
          style: ['td', 'center']
        },
        {
          text: familyInformation.name,
          style: ['td', 'center']
        },
        {
          text: `${familyInformation.job.company} ${
            familyInformation.job.title
          }`,
          style: ['td', 'center']
        }
      );
      if (i === this.data.resume.familyInformation.length - 1) {
        cells.push(
          {
            text: '',
            style: ['td', 'center']
          },
          {
            text: '',
            style: ['td', 'center']
          },
          {
            text: '',
            style: ['td', 'center']
          }
        );
      } else {
        const nextFamilyInformation = this.data.resume.familyInformation[i + 1];
        cells.push(
          {
            text: nextFamilyInformation.relation,
            style: ['td', 'center']
          },
          {
            text: nextFamilyInformation.name,
            style: ['td', 'center']
          },
          {
            text: `${nextFamilyInformation.job.company} ${
              nextFamilyInformation.job.title
            }`,
            style: ['td', 'center']
          }
        );
      }
      body.push(cells);
    }

    return body;
  }

  getProfession() {
    const body: any[] = [];
    body.push([
      {
        text: 'Emergency Contact',
        style: 'th'
      },
      {
        text: this.data.resume.emergencyContact.name,
        style: 'td'
      },
      {
        text: 'Relation',
        style: 'th'
      },
      {
        text: this.data.resume.emergencyContact.relation,
        style: 'td'
      },
      {
        text: 'Phone Number',
        style: 'th'
      },
      {
        text: this.data.resume.emergencyContact.phone,
        style: 'td'
      }
    ]);
    body.push([
      {
        text: 'Interests',
        style: 'th'
      },
      {
        text: this.data.resume.interests,
        colSpan: 3,
        style: 'td'
      },
      {},
      {},
      {
        text: 'Skills',
        style: 'th'
      },
      {
        text: this.data.resume.skills,
        style: 'td'
      }
    ]);
    body.push([
      {
        text: 'Work expectations',
        style: 'th'
      },
      {
        text: this.data.resume.workExpectation,
        colSpan: 5,
        style: 'td'
      },
      {},
      {},
      {},
      {}
    ]);
    body.push([
      {
        text: 'Future Aspirations',
        style: 'th'
      },
      {
        text: this.data.resume.futureAspiration,
        colSpan: 5,
        style: 'td'
      },
      {},
      {},
      {},
      {}
    ]);
    body.push([
      {
        text: 'Strength & Weakness',
        style: 'th'
      },
      {
        text: this.data.resume.strengthAndWeakness,
        colSpan: 5,
        style: 'td'
      },
      {},
      {},
      {},
      {}
    ]);
    body.push([
      {
        text: 'Expected Salary',
        style: 'th'
      },
      {
        text: this.data.resume.expectedSalary,
        colSpan: 2,
        style: 'td'
      },
      {},
      {
        text: 'Date of Availability',
        style: 'th'
      },
      {
        text: moment(this.data.resume.availabilityDate).format('YYYY/MM/DD'),
        colSpan: 2,
        style: 'td'
      },
      {}
    ]);
    body.push([
      {
        text: 'Where do you catch this job vacancy',
        style: 'th'
      },
      {
        text: this.data.resume.whereCatchVacancy,
        colSpan: 5,
        style: 'td'
      },
      {},
      {},
      {},
      {}
    ]);
    return body;
  }

  getReference() {
    const body: any[] = [];
    body.push([
      {
        text:
          'List local references who are able to provide information regarding your career and ability.',
        colSpan: 5,
        style: ['header', 'center']
      },
      {},
      {},
      {},
      {}
    ]);
    body.push([
      {
        text: 'Name',
        style: ['th', 'center']
      },
      {
        text: 'Name of Company',
        style: ['th', 'center']
      },
      {
        text: 'Job Title',
        style: ['th', 'center']
      },
      {
        text: 'Phone Number',
        style: ['th', 'center']
      },
      {
        text: 'Relation',
        style: ['th', 'center']
      }
    ]);
    this.data.resume.reference.forEach(reference => {
      body.push([
        {
          text: reference.name,
          style: ['td', 'center']
        },
        {
          text: reference.company,
          style: ['td', 'center']
        },
        {
          text: reference.title,
          style: ['td', 'center']
        },
        {
          text: reference.phone,
          style: ['td', 'center']
        },
        {
          text: reference.relation,
          style: ['td', 'center']
        }
      ]);
    });
    return body;
  }

  getFiles() {
    const body: any[] = [];
    body.push([
      {
        text: 'Files',
        colSpan: 1,
        style: ['header', 'center']
      }
    ]);
    const ul: any[] = [];
    this.data.resume.files.forEach(file => {
      ul.push({
        text: file.name,
        link: file.url,
        color: '#55F'
      });
    });
    body.push([
      {
        ul: ul
      }
    ]);
    return body;
  }

  getNote() {
    const body: any[] = [];
    body.push([
      {
        text: 'Note',
        colSpan: 1,
        style: ['header', 'center']
      }
    ]);
    body.push([
      {
        text: this.data.resume.note ? this.data.resume.note : 'None',
        style: ['td']
      }
    ]);
    return body;
  }

  getForehead() {
    const body: any[] = [];
    body.push([
      {
        text: 'Committed crimes',
        colSpan: 1,
        style: ['header', 'center']
      }
    ]);
    body.push([
      {
        text: this.data.forehead ? this.data.forehead : 'None',
        style: ['td']
      }
    ]);
    return body;
  }

  getCompetencyTable() {
    let body: any[] = [];
    body = body.concat(
      this.getCompetencyTableItem(
        this.data.competencyTable.teamWork,
        '團隊合作'
      )
    );
    body = body.concat(
      this.getCompetencyTableItem(
        this.data.competencyTable.learning,
        '持續學習'
      )
    );
    body = body.concat(
      this.getCompetencyTableItem(
        this.data.competencyTable.analysisAndResolution,
        '問題分析與解決能力'
      )
    );
    body = body.concat(
      this.getCompetencyTableItem(this.data.competencyTable.active, '主動積極')
    );

    return body;
  }

  getCompetencyTableItem(data, header: string) {
    return [
      [
        {
          text: header,
          colSpan: 2,
          style: ['header', 'center']
        },
        {}
      ],
      [
        {
          text: '情況 (S/T)',
          style: ['th']
        },
        {
          text: data.situation,
          style: ['td']
        }
      ],
      [
        {
          text: '行動 (A)',
          style: ['th']
        },
        {
          text: data.action,
          style: ['td']
        }
      ],
      [
        {
          text: '結果 (R)',
          style: ['th']
        },
        {
          text: data.result,
          style: ['td']
        }
      ]
    ];
  }

  getQuestionnaire() {
    const body: any[] = [];
    for (let i = 0; i < 16; i += 4) {
      body.push([
        {
          text: i + 1,
          colSpan: 2,
          style: ['header', 'center']
        },
        {},
        {
          text: i + 2,
          colSpan: 2,
          style: ['header', 'center']
        },
        {},
        {
          text: i + 3,
          colSpan: 2,
          style: ['header', 'center']
        },
        {},
        {
          text: i + 4,
          colSpan: 2,
          style: ['header', 'center']
        },
        {}
      ]);
      for (let j = 0; j < 4; j++) {
        body.push([
          {
            text: this.diceText[i][j],
            style: ['th', 'center']
          },
          {
            text: this.data.questionnaire[i][j],
            style: ['td', 'center']
          },
          {
            text: this.diceText[i + 1][j],
            style: ['th', 'center']
          },
          {
            text: this.data.questionnaire[i + 1][j],
            style: ['td', 'center']
          },
          {
            text: this.diceText[i + 2][j],
            style: ['th', 'center']
          },
          {
            text: this.data.questionnaire[i + 2][j],
            style: ['td', 'center']
          },
          {
            text: this.diceText[i + 3][j],
            style: ['th', 'center']
          },
          {
            text: this.data.questionnaire[i + 3][j],
            style: ['td', 'center']
          }
        ]);
      }
    }
    return body;
  }

  getQuestionnaireScore() {
    const body: any[] = [];
    body.push([
      {
        text: 'D',
        style: ['th', 'center']
      },
      {
        text: this.data.questionnaireScore[0],
        style: ['td', 'center']
      },
      {
        text: 'I',
        style: ['th', 'center']
      },
      {
        text: this.data.questionnaireScore[1],
        style: ['td', 'center']
      },
      {
        text: 'C',
        style: ['th', 'center']
      },
      {
        text: this.data.questionnaireScore[2],
        style: ['td', 'center']
      },
      {
        text: 'E',
        style: ['th', 'center']
      },
      {
        text: this.data.questionnaireScore[3],
        style: ['td', 'center']
      }
    ]);
    return body;
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
