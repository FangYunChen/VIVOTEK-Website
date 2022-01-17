import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Learning - Course',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Learning/Course',
    apis: {
      get: 'api/Supports/Learning/Course',
      patch: 'api/Supports/Learning/Course'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
