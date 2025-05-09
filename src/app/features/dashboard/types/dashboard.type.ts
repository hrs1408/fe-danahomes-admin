import { Post } from "../../post/models/post.model";
import { Product } from "../../products/models/product.model";
import { Tag } from "../../tags/models/tag.model";
import { Category } from "../../products/services/category.service";
import { User } from "../../../core/services/user.service";

export interface DashboardSummary {
  totalProducts: number;
  totalPosts: number;
  totalTags: number;
  totalCategories: number;
  totalUsers: number;
  recentProducts: Product[];
  recentPosts: Post[];
  activeUsers: User[];
  popularTags: Tag[];
  popularCategories: Category[];
}

export interface DashboardResponse {
  data: DashboardSummary;
  meta: {
    error: boolean;
    message: string;
  };
  status_code: number;
}
