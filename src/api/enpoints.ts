import buildUrl from "build-url-ts";

import {
  CreateEntity,
  DelereEntityById,
  GetAllTableEntities,
  UpdateEntityById,
} from "./interfaces";

const host = "http" + "://" + "localhost" + ":8080";

export const api = {
  urlForAllTablesInfo: () => buildUrl(host + "/api/v1/tables")!,
  urlForTableContent: ({ table }: GetAllTableEntities) =>
    buildUrl(host + table.resourceTable)!,
  urlForUpdateEntity: ({ id, table }: UpdateEntityById) =>
    buildUrl(host + table.resourceTable + "/" + id)!,
  urlForCreateEntity: ({ table }: CreateEntity) =>
    buildUrl(host + table.resourceTable)!,
  urlForDeleteEntity: ({ id, table }: DelereEntityById) =>
    buildUrl(host + table.resourceTable + "/" + id)!,
  urlForAuthSignUp: () => buildUrl(host + "/api/v1/user/auth/signup")!,
  urlForAuthLogin: () => buildUrl(host + "/api/v1/user/auth/login")!,
  urlForUser: () => buildUrl(host + "/api/v1/user")!,
};
