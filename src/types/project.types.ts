// types/project.ts
export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    categoryDetails?: Category;
    userDetails?: User;
    ProjectImage?: ProjectImage[];
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface User {
    id: string;
    name: string;
  }
  
  export interface ProjectImage {
    id: string;
    url: string;
    projectId: string;
  }
  
  export interface ProjectQuery {
    search?: string;
    categoryId?: string;
    authorId?: string;
    sortBy?: keyof Project;
    sortOrder?: 'ASC' | 'DESC';
    limit?: number;
    offset?: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
  }