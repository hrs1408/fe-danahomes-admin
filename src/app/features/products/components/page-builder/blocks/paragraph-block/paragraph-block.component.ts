import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ParagraphBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-paragraph-block',
  standalone: false,
  templateUrl: './paragraph-block.component.html',
  styleUrls: ['./paragraph-block.component.scss']
})
export class ParagraphBlockComponent implements OnInit, OnDestroy {
  @Input() block!: ParagraphBlock;
  @Output() blockChange = new EventEmitter<ParagraphBlock>();

  private contentSubject = new Subject<string>();
  private titleSubject = new Subject<string>();
  private subscription = new Subscription();

  editorConfig = {
    height: 400,
    menubar: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; font-size: 14px; line-height: 1.5; }'
  };

  constructor() {
    // Xử lý thay đổi nội dung với debounceTime
    this.subscription.add(
      this.contentSubject.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(content => {
        this.block.content = content;
        this.emitChange();
      })
    );

    // Xử lý thay đổi tiêu đề với debounceTime
    this.subscription.add(
      this.titleSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(title => {
        this.block.title = title;
        this.emitChange();
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onContentChange(content: string): void {
    this.contentSubject.next(content);
  }

  onTitleChange(title: string): void {
    this.titleSubject.next(title);
  }

  private emitChange(): void {
    this.blockChange.emit({...this.block});
  }
}
