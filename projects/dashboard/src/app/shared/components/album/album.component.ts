import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { Album } from '../../../vvtk-core/classes/album';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @ViewChild('form') form;
  @Input() readOnly = false;
  @Input() path = 'Album';

  album: Album[] = [];

  groupOptions: SortablejsOptions = {
    group: 'group1',
    handle: '.drag-handle',
    animation: 300
  };

  tempImgs: File[];

  isLoading = false;

  constructor(
    private vvtkApiService: VvtkApiService,
  ) { }

  delete(idx: number) {
    this.album.splice(idx, 1);
  }

  imgFileSelect($event) {
    this.isLoading = true;
    this.tempImgs = [];
    for (let i = 0; i < $event.target.files.length; i++) {
      this.tempImgs.push($event.target.files[i]);
    }
    $event.target.value = null;

    this.imgUpload();
  }

  imgUpload() {
    if (this.tempImgs.length === 0) {
      this.isLoading = false;
      return;
    }
    const file: File = this.tempImgs.shift();
    const newImg: Album = {
      src: '',
      alt: file.name,
      title: file.name
    };

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.imgUpload();
        })
      )
      .subscribe(
        x => {
          newImg.src = x.link;
          this.album.push(newImg);
        }
      );
  }

  ngOnInit() { }

  setAlbum(album: Album[]) {
    this.album = album || [];
  }

  getAlbum() {
    return this.album;
  }
}
