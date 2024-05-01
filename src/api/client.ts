import {
  api,
  ApiResponse,
  ApiUser,
  AuthResponse,
  CreateEntity,
  DelereEntityById,
  GetAllTableEntities,
  LoginData,
  SignUpData,
  TableInfo,
  UpdateEntityById,
  UpdateUsername,
} from ".";
import { Entity, responseToApiResponse } from "../utils";
import Cookies from "js-cookie";

interface ApiClient {
  findAllTablesInfo: () => Promise<ApiResponse<TableInfo[]>>;
  getAll: (
    params: GetAllTableEntities,
  ) => Promise<ApiResponse<Entity[]>>;
  create: (params: CreateEntity) => Promise<ApiResponse<any>>;
  update: (params: UpdateEntityById) => Promise<ApiResponse<any>>;
  delete: (params: DelereEntityById) => Promise<ApiResponse<any>>;
  authSignUp: (body: SignUpData) => Promise<ApiResponse<AuthResponse>>;
  authLogin: (body: LoginData) => Promise<ApiResponse<AuthResponse>>;
  getUser: () => Promise<ApiResponse<ApiUser>>;
  updateUsername: (params: UpdateUsername) => Promise<ApiResponse<ApiUser>>;
}

const get = (params: { auth?: boolean }) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (params.auth) {
    headers.append("Authorization", `Bearer ${Cookies.get("token")}`);
  }

  return {
    method: "GET",
    headers,
  };
};

const del = (params: { auth?: boolean }) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (params.auth) {
    headers.append("Authorization", `Bearer ${Cookies.get("token")}`);
  }

  return {
    method: "DELETE",
    headers,
  };
};

const postWithBody = (
  params: {
    auth?: boolean;
    body?: any;
    contentType?: string;
    disableContentType?: boolean;
  },
) => {
  const headers = new Headers();

  if (!params.disableContentType) {
    if (params.contentType) {
      headers.append("Content-Type", params.contentType);
    } else {
      headers.append("Content-Type", "application/json");
    }
  }

  if (params.auth) {
    headers.append("Authorization", `Bearer ${Cookies.get("token")}`);
  }

  const body = params.body
    ? (params.disableContentType ? params.body : JSON.stringify(params.body))
    : undefined;

  console.log("payload: ", body);
  return {
    method: "POST",
    headers,
    body,
  };
};

export const apiClient: ApiClient = {
  findAllTablesInfo: async () =>
    fetch(api.urlForAllTablesInfo(), get({ auth: true }))
      .then(responseToApiResponse),
  getAll: async (params) =>
    fetch(api.urlForTableContent(params), get({ auth: true }))
      .then(responseToApiResponse),
  create: async (params) =>
    fetch(
      api.urlForCreateEntity(params),
      postWithBody({ auth: true, body: params.entity }),
    )
      .then(responseToApiResponse),
  update: async (params) =>
    fetch(
      api.urlForUpdateEntity(params),
      postWithBody({ auth: true, body: params.entity }),
    )
      .then(responseToApiResponse),
  delete: async (params) =>
    fetch(api.urlForDeleteEntity(params), del({ auth: true }))
      .then(responseToApiResponse),
  getUser: async () =>
    fetch(api.urlForUser(), get({ auth: true }))
      .then(responseToApiResponse),
  authSignUp: async (body) =>
    fetch(api.urlForAuthSignUp(), postWithBody({ body }))
      .then(responseToApiResponse),
  authLogin: async (body) =>
    fetch(api.urlForAuthLogin(), postWithBody({ body }))
      .then(responseToApiResponse),
  updateUsername: async (body) =>
    fetch(api.urlForUser(), postWithBody({ body, auth: true }))
      .then(responseToApiResponse),
};
