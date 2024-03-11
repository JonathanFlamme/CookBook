export interface RecipeListQuery {
  page: number;
  limit: number;
  query?: string;
  category?: string;
  orderBy: 'title' | 'duration' | 'updatedAt';
  order: 'ASC' | 'DESC';
}
