export interface HttpClient {
  get<T>(url: string): Promise<{ data: T }>;
  post<T>(url: string, data: object): Promise<{ data: T }>;
  put<T>(url: string, data: object): Promise<{ data: T }>;
}
