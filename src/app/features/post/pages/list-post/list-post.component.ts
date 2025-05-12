import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-list-post',
  standalone: false,
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.scss'
})
export class ListPostComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  isVisible = false;
  selectedPost: Post | null = null;

  postTypes = [
    { value: 'featured', label: 'Tin nổi bật', color: 'red' },
    { value: 'news', label: 'Tin tức', color: 'blue' },
    { value: 'event', label: 'Sự kiện', color: 'green' },
    { value: 'promotion', label: 'Khuyến mãi', color: 'orange' },
    { valie: 'fengshui', label: 'Tư vấn phong thuỷ', color: 'purple' },
  ];

  constructor(
    private postService: PostService,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getAllPosts().subscribe({
      next: (response) => {
        this.posts = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải danh sách bài viết');
        this.loading = false;
      }
    });
  }

  createPost(): void {
    this.router.navigate(['/post/create']);
  }

  editPost(id: number | undefined): void {
    if (id) {
      this.router.navigate([`/post/${id}/edit`]);
    }
  }

  confirmDelete(id: number | undefined): void {
    if (id) {
      this.modal.confirm({
        nzTitle: 'Xác nhận xóa',
        nzContent: 'Bạn có chắc chắn muốn xóa bài viết này?',
        nzOkText: 'Xóa',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deletePost(id),
        nzCancelText: 'Hủy'
      });
    }
  }

  deletePost(id: number): void {
    this.loading = true;
    this.postService.deletePost(id).subscribe({
      next: (response) => {
        this.message.success('Xóa bài viết thành công');
        this.loadPosts();
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi xóa bài viết');
        this.loading = false;
      }
    });
  }

  getPostTypeLabel(type: string): string {
    const postType = this.postTypes.find(t => t.value === type);
    return postType ? postType.label : type;
  }

  getPostTypeColor(type: string): string {
    const postType = this.postTypes.find(t => t.value === type);
    return postType ? postType.color : '';
  }

  viewPost(post: Post): void {
    this.selectedPost = post;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.selectedPost = null;
  }
}
