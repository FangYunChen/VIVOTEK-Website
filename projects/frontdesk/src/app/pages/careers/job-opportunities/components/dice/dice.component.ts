import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SortablejsOptions } from 'angular-sortablejs/dist';
import { Subscription, of } from 'rxjs';
import { Resume } from '../../resume';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AccountService,
  VvtkService,
  AuthHttpService,
  AuthService,
  PageMetaService
} from '../../../../../vvtk-core/services';
import { finalize, catchError } from 'rxjs/operators';

@Component({
  selector: 'vvtk-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  items = [
    {
      id: 1,
      topic: [['心胸開放', 0], ['精確', 1], ['果斷', 2], ['耐心', 3]]
    },
    {
      id: 2,
      topic: [
        ['令人信服的', 0],
        ['知足的', 1],
        ['膽怯的', 2],
        ['競爭性強的', 3]
      ]
    },
    {
      id: 3,
      topic: [['穩定的', 0], ['強有力的', 1], ['準時的', 2], ['迷人的', 3]]
    },
    {
      id: 4,
      topic: [
        ['有幹勁的', 0],
        ['滿意的', 1],
        ['有說服力的', 2],
        ['尊重人的', 3]
      ]
    },
    {
      id: 5,
      topic: [['溫和的', 0], ['焦躁不安的', 1], ['受歡迎的', 2], ['拘泥的', 3]]
    },
    {
      id: 6,
      topic: [
        ['謹慎的', 0],
        ['激勵人心的', 1],
        ['服從的', 2],
        ['意志堅強的', 3]
      ]
    },
    {
      id: 7,
      topic: [['圓滑的', 0], ['遵守的', 1], ['勇敢的', 2], ['忠心的', 3]]
    },
    {
      id: 8,
      topic: [['堅持的', 0], ['拘束的', 1], ['善交際的', 2], ['順從的', 3]]
    },
    {
      id: 9,
      topic: [['謙虛的', 0], ['樂觀的', 1], ['穩重的', 2], ['獨斷的', 3]]
    },
    {
      id: 10,
      topic: [['鎮定的', 0], ['坦率的', 1], ['熱烈的', 2], ['準確的', 3]]
    },
    {
      id: 11,
      topic: [['承擔的', 0], ['體貼的', 1], ['果斷的', 2], ['優雅的', 3]]
    },
    {
      id: 12,
      topic: [['渴望的', 0], ['真摯的', 1], ['和諧的', 2], ['得體的', 3]]
    },
    {
      id: 13,
      topic: [['有魅力的', 0], ['自恃的', 1], ['精準的', 2], ['溫厚的', 3]]
    },
    {
      id: 14,
      topic: [['信任的', 0], ['健談的', 1], ['好的成員', 2], ['獨創性的', 3]]
    },
    {
      id: 15,
      topic: [['固執的', 0], ['挑剔的', 1], ['溫和的', 2], ['愉快的', 3]]
    },
    {
      id: 16,
      topic: [['活潑的', 0], ['遵守紀律的', 1], ['支配的', 2], ['同情心的', 3]]
    }
  ];

  options: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 150,
    onUpdate: (event: any) => {
      const _listIndex = $('.sortingList-wrap .sortingList').index(
        event.target
      );
      const _list = [];
      for (let i = 0; i < 4; i++) {
        _list[event.target.children[i].value] = 4 - i;
      }
      this.form.at(_listIndex).patchValue(_list);
    }
  };

  routeParamsSub$: Subscription;
  vacancyId: number;
  resumeData: Resume;
  form: FormArray;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountSrv: AccountService,
    private vvtkService: VvtkService,
    private authHttpService: AuthHttpService,
    private authService: AuthService,
    private pageMeateService: PageMetaService
  ) {
    this.initForm();
  }

  ngOnInit() {
    const sub$ = this.authService
      .checkLogin()
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
        })
      )

      .subscribe(isLogin => {
        this.routeParamsSub$ = this.route.params
          .pipe(
            catchError(error => {
              console.error('An error occurred', error);
              return of(error);
            }),
            finalize(() => {
              this.routeParamsSub$.unsubscribe();
            })
          )
          .subscribe(params => {
            this.vacancyId = params['id'] || this.route.snapshot.data['id'];
            if (isLogin) {
              this.loadResume();
              this.patchPer30Sec();
            } else {
              this.router.navigate([
                this.pageMeateService.getCustomPath(
                  `/careers/job-opportunities/${this.vacancyId}`
                )
              ]);
            }
          });
      });
  }

  //#region Init Form
  initForm() {
    this.form = this.formBuilder.array([]);
    for (let idx = 0; idx < 16; idx++) {
      this.form.push(this.initDICEArray());
    }
  }

  initDICEArray() {
    return this.formBuilder.array([4, 3, 2, 1], Validators.required);
  }

  //#region Init Resume
  loadResume() {
    const sub$ = this.authHttpService
      .get('api/Careers/Resume/Temporary')
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
        })
      )
      .subscribe(resp => {
        if (resp.ok) {
          this.resumeData = resp.json();
          if (!this.resumeData) {
            this.resumeData = new Resume();
          }
          this.loadForm();
        }
      });
  }

  loadForm() {
    const questionnaire: number[][] = this.resumeData.questionnaire;
    questionnaire.forEach((DICE, index) => {
      // 還原分數
      this.form.at(index).patchValue(DICE);
      // 還原排列
      const array = [4, 3, 2, 1];
      DICE.forEach((score, idx) => {
        array[4 - score] = idx;
      });
      const topics = this.items[index].topic;
      const tempTopic = [];
      array.forEach((id, idx) => {
        tempTopic.push(topics.find(topic => topic[1] === id));
      });
      this.items[index].topic = tempTopic;
    });
    this.form.updateValueAndValidity();
  }
  //#endregion

  prev($event) {
    this.router.navigate([
      this.pageMeateService.getCustomPath(
        `/careers/job-opportunities/ability/${this.vacancyId}`
      )
    ]);
  }
  diceResult($event) {
    this.resumeData.vacancyId = this.vacancyId;
    this.resumeData.questionnaire = this.form.value;
    const sub$ = this.authHttpService
      .post('api/Careers/Resume', this.resumeData)
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
          this.router.navigateByUrl(
            this.pageMeateService.getCustomPath(
              `/careers/job-opportunities/result`
            )
          );
        })
      )
      .subscribe();
  }

  patchPer30Sec() {
    setInterval(() => {
      this.patchResume();
    }, 30000);
  }

  //#region Patch Resume
  patchResume() {
    this.resumeData.questionnaire = this.form.value;
    const sub$ = this.authHttpService
      .patch('api/Careers/Resume/Temporary', this.resumeData)
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
        })
      )
      .subscribe();
  }
  //#endregion
}
