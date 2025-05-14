import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VideoBlock } from '../../../../models/page-builder.model';

@Component({
  selector: 'app-video-block',
  standalone: false,
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent implements OnInit, OnDestroy {
  @Input() block!: VideoBlock;
  @Output() blockChange = new EventEmitter<VideoBlock>();

  private urlSubject = new Subject<string>();
  private titleSubject = new Subject<string>();
  private descriptionSubject = new Subject<string>();
  private subscription = new Subscription();

  constructor() {
    // Xử lý thay đổi URL với debounceTime
    this.subscription.add(
      this.urlSubject.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(url => {
        this.block.url = url;
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

    // Xử lý thay đổi mô tả với debounceTime
    this.subscription.add(
      this.descriptionSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(description => {
        this.block.description = description;
        this.emitChange();
      })
    );
  }

  ngOnInit(): void {
    if (!this.block.controls) {
      this.block.controls = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUrlChange(url: string): void {
    this.urlSubject.next(url);
  }

  onTitleChange(title: string): void {
    this.titleSubject.next(title);
  }

  onDescriptionChange(description: string): void {
    this.descriptionSubject.next(description);
  }

  onAutoplayChange(autoplay: boolean): void {
    this.block.autoplay = autoplay;
    this.emitChange();
  }

  onControlsChange(controls: boolean): void {
    this.block.controls = controls;
    this.emitChange();
  }

  onPosterChange(poster: string): void {
    this.block.poster = poster;
    this.emitChange();
  }

  private emitChange(): void {
    this.blockChange.emit({...this.block});
  }
}
