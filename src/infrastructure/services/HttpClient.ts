import { HttpClient } from "@/domain/services/HttpClient";

export default class HttpClientImpl implements HttpClient {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "http://localhost:3000";
  }

  async get<T>(url: string): Promise<{ data: T }> {
    const response = await fetch(`${this.apiUrl}${url}`);
    const data = await response.json();
    return { data };
  }

  async post<T>(url: string, data: object): Promise<{ data: T }> {
    const response = await fetch(`${this.apiUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return { data: responseData };
  }

  async put<T>(url: string, data: object): Promise<{ data: T }> {
    const response = await fetch(`${this.apiUrl}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return { data: responseData };
  }
}
