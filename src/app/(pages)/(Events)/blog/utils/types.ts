export interface Blog {
    id: string;
    Title: string;
    Slug: string;
    ArticleContent: string;
    Date: string;
    TypeofArticle: string;
    Tags: string;
    ThumbnailImage?: {
      url: string;
    };
  }
  
  export interface FilterState {
    category: string;
    search: string;
  }