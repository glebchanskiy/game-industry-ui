import { Entity } from "../utils";

export interface TableInfo {
  name: string;
  resourceTable: string;
  tablePathName: string;
}

export interface GetAllTableEntities {
  table: TableInfo
}

export interface CreateEntity {
  entity: Entity;
  table: TableInfo;
}

export interface UpdateEntityById {
  id: number
  entity: Entity;
  table: TableInfo;
}

export interface DelereEntityById {
  id: number
  table: TableInfo;
}

export interface UpdateUsername {
  username: string
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    status: number;
  };
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiUser {
  username: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}

export interface AuthResponse {
  accessToken: string;
}