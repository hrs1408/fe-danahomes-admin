import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { ProductService } from '../../products/services/product.service';
import { PostService } from '../../post/services/post.service';
import { TagService } from '../../tags/services/tag.service';
import { CategoryService } from '../../products/services/category.service';
import { UserService } from '../../../core/services/user.service';
import { DashboardResponse, DashboardSummary } from '../types/dashboard.type';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private productService: ProductService,
    private postService: PostService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private userService: UserService
  ) { }

  getDashboardSummary(): Observable<DashboardResponse> {
    return forkJoin({
      products: this.productService.getAllProducts(),
      posts: this.postService.getAllPosts(),
      tags: this.tagService.getAllTags(),
      categories: this.categoryService.getCategories(),
      users: this.userService.getUsers()
    }).pipe(
      map(({ products, posts, tags, categories, users }) => {
        const summary: DashboardSummary = {
          totalProducts: products.data.length,
          totalPosts: posts.data.length,
          totalTags: tags.data.length,
          totalCategories: categories.data.length,
          totalUsers: users.data.length,
          recentProducts: products.data.slice(0, 5),
          recentPosts: posts.data.slice(0, 5),
          activeUsers: users.data.filter(user => user.is_active).slice(0, 5),
          popularTags: tags.data.slice(0, 5),
          popularCategories: categories.data.slice(0, 5)
        };

        return {
          data: summary,
          meta: {
            error: false,
            message: 'Success'
          },
          status_code: 200
        };
      })
    );
  }
}
