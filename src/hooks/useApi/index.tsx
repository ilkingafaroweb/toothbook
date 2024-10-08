import { useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

type ApiOptions = {
  method?: Method;
  endpoint: string;
  data?: any;
  params?: Record<string, any>;
  headers?: { [key: string]: string }; 
};

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const token = localStorage.getItem('token');

  const callApi = async ({ method = "GET", endpoint, data, params }: ApiOptions) => {
    setLoading(true);
    setError(null);
    setResponse(null); // Yeni bir istek geldiğinde önceki yanıtı temizle

    const config: AxiosRequestConfig = {
      url: endpoint,
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      ...(params && { params }),
      ...(data && { data }),
    };

    try {
      const result = await axios(config);

      if (result.status === 200 || result.status === 201) {
        if (result.data.success) {
          setResponse(result.data.success);
        } else if (result.data) {
          setResponse(result.data);
        } else {
          setResponse("Success");
        }
      } else {
        setError(response.data);
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response?.data); 
      } else {
        setError(err.response); // Ağ hatası durumunda
      }
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error, response };
};
