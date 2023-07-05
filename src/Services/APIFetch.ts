import axios, { AxiosRequestConfig } from "axios";
import { APICallType } from "../Types";

export const getAPICallType = (callNo: number) => {
  switch (callNo) {
    case APICallType.POST:
      return "post";
    case APICallType.DELETE:
      return "delete";
    case APICallType.GET:
      return "get";
    case APICallType.PUT:
      return "put";
    default:
      return "";
  }
};

export const callAPI = async (config: AxiosRequestConfig<string>) => {
  const data = await axios(config);
  return new Promise((res, rej) => {
    if (data.statusText == "OK") return res(data);
    else return rej(data.data);
  });
};
