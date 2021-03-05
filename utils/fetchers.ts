import { request } from "graphql-request";
import constants from "../constants";

export const GraphQLFetcher = (query: any, ...args: any[]) =>
  request(constants.API_URL, query, ...args);

export const RESTFetcher = (url: string) => fetch(url).then((r) => r.json());
