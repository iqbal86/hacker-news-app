import axios, { AxiosInstance } from 'axios'

export interface AxiosDefaultConfig {
  baseURL: string
  headers: {
    [key: string]: string
  }
}
export interface IAxiosClient {
  get<TResponse>(path: string): Promise<TResponse>
}

const defaultConfig: AxiosDefaultConfig = {
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  headers: {
    'Content-Type': 'application/json',
  },
}

export class AxiosClient implements IAxiosClient {
  private client: AxiosInstance

  constructor(config: AxiosDefaultConfig) {
    this.client = axios.create(config)
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    const { data } = await this.client.get<TResponse>(path)
    return data
  }
}

const axiosClient = new AxiosClient(defaultConfig)
export default axiosClient
