import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'vvtk-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit {
  @ViewChild('froala')
  editor: ElementRef;

  @Input()
  path = '';
  @Input()
  html = '';
  // contentChangedTimer: NodeJS.Timer;

  @Output()
  htmlChange: EventEmitter<any> = new EventEmitter<any>();

  froalaOptions: Object = {
    key: environment.froalaLicenseKey,
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true,
    toolbarButtons: [
      'fullscreen',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      '|',
      /*'fontFamily',*/ 'fontSize',
      'color',
      'inlineStyle',
      'paragraphStyle',
      '|',
      'paragraphFormat',
      'align',
      'formatOL',
      'formatUL',
      'outdent',
      'indent',
      'quote',
      '-',
      'insertLink',
      'insertImage',
      'insertVideo',
      'insertFile',
      'insertTable',
      '|',
      'emoticons',
      'specialCharacters',
      'insertHR',
      'selectAll',
      'clearFormatting',
      '|',
      'print',
      'spellChecker',
      'help',
      'html',
      '|',
      'undo',
      'redo'
    ],
    events: {
      'froalaEditor.image.beforeUpload': (e, editor, images) => {
        const uploadNewImageElement = $(e.target)
          .find('.fr-image-upload-layer input.fr-not-empty')
          .val();
        const replaceImageElement = $('.fr-popup.fr-active')
          .find('.fr-not-empty')
          .val();
        const path: string[] = (
          uploadNewImageElement ||
          replaceImageElement ||
          ''
        ).split(/\\|\//);
        console.log(path);
        $(this.editor.nativeElement).data(
          'froala.editor'
        ).opts.imageUploadParams = {
            filename: `${this.path}/${path[path.length - 1]}`
          };
      },
      'froalaEditor.file.beforeUpload': (e, editor, images) => {
        const path: string[] = $(e.target)
          .find('.fr-file-upload-layer input.fr-not-empty')
          .val()
          .split(/\\|\//);
        $(this.editor.nativeElement).data(
          'froala.editor'
        ).opts.fileUploadParams = {
            filename: `${this.path}/${path[path.length - 1]}`
          };
      }
      /*
            'froalaEditor.contentChanged': (e, editor) => {
                if (this.contentChangedTimer) {
                    clearTimeout(this.contentChangedTimer);
                }
                this.contentChangedTimer = setTimeout(() => {
                    this.getHtml();
                }, 150);
            }
            */
    }
  };

  constructor() { }

  ngOnInit() {
    this.froalaInit();
    setTimeout(() => {
      const unlicensed = this.editor.nativeElement.querySelector(
        '.fr-wrapper+div'
      );
      if (unlicensed) {
        unlicensed.parentNode.removeChild(unlicensed);
      }
    }, 1);
  }

  froalaInit() {
    $.FroalaEditor.DEFAULTS.useClasses = false;
    $.FroalaEditor.DEFAULTS.quickInsertButtons = ['table', 'ul', 'ol', 'hr'];
    $.FroalaEditor.DEFAULTS.linkAutoPrefix = '';

    $.FroalaEditor.DEFAULTS.fileUploadURL = `${environment.apiUrl}/api/Upload`;
    $.FroalaEditor.DEFAULTS.imageUploadURL = `${environment.apiUrl}/api/Upload`;
    $.FroalaEditor.DEFAULTS.requestWithCredentials = true;

    $.FroalaEditor.DEFAULTS.toolbarSticky = false;

    // $.FroalaEditor.DEFAULTS.imageInsertButtons = ['imageBack', '|', 'imageByURL'];
    $.FroalaEditor.DEFAULTS.videoInsertButtons = [
      'videoBack',
      '|',
      'videoByURL'
    ];
    $.FroalaEditor.DEFAULTS.linkList = [
      {
        text: 'Vivotek',
        href: 'http://www.vivotek.com/',
        target: '_blank'
      }
    ];
  }

  change(event) {
    this.htmlChange.emit(event);
  }

  setHtml(html: string) {
    this.html = html;
  }

  getHtml() {
    let html: string;
    if ($(this.editor.nativeElement).froalaEditor('codeView.isActive')) {
      html = $(this.editor.nativeElement).froalaEditor('codeView.get');
    } else {
      html = $(this.editor.nativeElement).froalaEditor('html.get');
    }
    return html;
  }
}
