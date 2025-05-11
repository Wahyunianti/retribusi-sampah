import axios, { AxiosRequestConfig, AxiosInstance } from "axios"
import { API } from "../constant/api.service"

export const RootEndpoint = API.API_URL

export class HttpService {
  private baseEndpoint = RootEndpoint
  private token: string | null = localStorage.getItem("token")
  public http: AxiosInstance;

  private HeaderSetting(): AxiosRequestConfig {
    return {
      headers: { Authorization: `Bearer ${this.token}` }
    }
  }

  constructor() {
    this.http = axios.create({
      baseURL: this.baseEndpoint,
    });
  }

  public GET(url: string, params?: object) {
    return this.http.get(this.baseEndpoint + url, { params, ...this.HeaderSetting() })
  }

  public DELETE(url: string) {
    return this.http.delete(this.baseEndpoint + url, this.HeaderSetting())
  }

  public POST<T>(URL: string, data: T) {
    return this.http.post(this.baseEndpoint + URL, data, this.HeaderSetting())
  }

  public PUT(URL: string) {
    return axios.put(this.baseEndpoint + URL, this.HeaderSetting())
  }

  public PATCH(URL: string) {
    return axios.patch(this.baseEndpoint + URL, undefined, this.HeaderSetting())
  }


}
