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

export const getAPI = async (url: string): Promise<AxiosResponse> => {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_API}${url}`,
  };

  const response = await axios(config);

  return response;
};

export const postAPI = async (
  url: string,
  data?: any
): Promise<AxiosResponse> => {
  console.log(data)
  let config: AxiosRequestConfig = {
    method: "post",
    url: `${process.env.REACT_APP_API}${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true,
  };

  const response = await axios(config);
  console.log(response);
  return response;
};

export const putAPI = async (
  url: string,
  data: any
): Promise<AxiosResponse> => {
  let config: AxiosRequestConfig = {
    method: "put",
    url: `${process.env.REACT_APP_API}${url}`,
    headers: {
      // token: Cookies.get("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(config);

  return response;
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
