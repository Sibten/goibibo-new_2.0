import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
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

export const callAPI = async (
  config: AxiosRequestConfig<string>
): Promise<AxiosResponse> => {
  const response = await axios(config);
  return new Promise((res, rej) => {
    if (response.statusText == "OK") return res(response);
    else return rej(response);
  });
};
