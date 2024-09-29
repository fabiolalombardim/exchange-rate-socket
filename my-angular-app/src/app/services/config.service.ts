import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Config | undefined;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get<Config>('/assets/config.json'))
      .then((data) => {
        this.config = data;
      })
      .catch((error) => {
        console.error('Error loading config:', error);
      });
  }

  get apiUrl(): string {
    return this.config?.apiUrl || '';
  }
}
