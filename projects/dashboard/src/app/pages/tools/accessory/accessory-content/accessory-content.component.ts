import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolsAccessory, CombinationIndex } from 'projects/dashboard/src/app/vvtk-core/interface/tools-accessory';
import { LinkImage } from 'projects/dashboard/src/app/vvtk-core/classes/template';
import { SortablejsOptions } from 'angular-sortablejs';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-accessory-content',
  templateUrl: './accessory-content.component.html',
  styleUrls: ['./accessory-content.component.scss']
})
export class AccessoryContentComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  data: ToolsAccessory = {
    modelName: '',
    subtitle: '',
    mainImg: '',
    appendix: '',
    combinationIndex: '',
    combinationIndexModels: []
  };

  id = 0;
  image: LinkImage;
  imageSelectorVisible: boolean;
  isLoading = true;
  appendixHtmlEditorPath = 'Tools/Accessory/Appendix';
  lockDelete = false;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 150
  };

  get isAddData() {
    return this.id === 0;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {
    this.image = {
      hideContent: false,
      src: '',
      alt: '',
      title: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    if (!this.isAddData) {
      this.getAccessory();
    }

    this.isLoading = false;
  }

  getAccessory() {
    this.isLoading = true;
    this.vvtkApiService.get<ToolsAccessory>({
      path: `api/Tools/Accessory/${this.id}`,
      disableLanguage: true
    }).subscribe(
      res => {
        this.data = res;
        this.image.src = res.mainImg;
        this.parseCombinationIndex(res.combinationIndex);
      }
    );
  }

  parseCombinationIndex(combinationIndex: string) {
    this.data.combinationIndexModels = JSON.parse(combinationIndex);
  }

  uploadFile($event) {
    const file: File = $event.target.files[0];
    this.image.title = file.name;
    this.image.alt = file.name;
    this.vvtkApiService.uploadFile(file, `Tools/Accessory/${file.name}`).pipe(
      finalize(() => $event.target.value = null)
    ).subscribe(
      x => this.image.src = x.link
    );
  }

  uploadcombinationIndexFile(combinationIndex: CombinationIndex, $event) {
    const file: File = $event.target.files[0];
    this.vvtkApiService.uploadFile(file, `Tools/Accessory/${file.name}`).pipe(
      finalize(() => $event.target.value = null)
    ).subscribe(
      x => combinationIndex.img = x.link
    );
  }

  addCombinationIndex() {
    this.data.combinationIndexModels = this.data.combinationIndexModels || [];
    this.data.combinationIndexModels.push({
      name: '',
      img: ''
    });
  }

  deleteCombinationIndex(combinationIndex: CombinationIndex) {
    this.data.combinationIndexModels = this.data.combinationIndexModels.filter(x => x !== combinationIndex);
  }

  save() {
    this.isLoading = true;
    this.data.mainImg = this.image.src;
    this.vvtkApiService.patch({
      path: `api/Tools/Accessory/${this.id}`,
      disableLanguage: true
    }, this.data).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/tools/accessory'])
    );
  }

  ngOnDestroy() {
  }
}
