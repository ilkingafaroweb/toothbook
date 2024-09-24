import { useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

type ApiOptions = {
  method?: Method;
  endpoint: string;
  data?: any;
};

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const callApi = async ({ method = "GET", endpoint, data }: ApiOptions) => {
    setLoading(true);
    setError(null);

    const config: AxiosRequestConfig = {
      url: endpoint,
      method: method,
      ...(data && { data }),
    };

    try {
      const result = await axios(config);
      setResponse(result.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error, response };
};
