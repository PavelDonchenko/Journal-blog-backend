export class SearchPostDto {
  title?: string;
  views?: 'DESC' | 'ASC';
  body?: string;
  limit?: number;
  take?: number;
  tags?: string;
}
