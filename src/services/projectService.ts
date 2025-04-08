// services/projectService.ts
import axios from "axios";
import { Project, ProjectQuery, PaginatedResponse } from "../types/project.types";

class ProjectService {
  private baseUrl = "http://localhost:8080/projects";

  async getProjects(query: ProjectQuery): Promise<PaginatedResponse<Project>> {
      const response = await axios.get<PaginatedResponse<Project>>(this.baseUrl, {
        params: {
          search: query.search,
          categoryId: query.categoryId,
          authorId: query.authorId,
          sortBy: query.sortBy,
          sortOrder: query.sortOrder,
          limit: query.limit,
          offset: query.offset,
        },
      });
      return response.data;
  }
}

export const projectService = new ProjectService();
