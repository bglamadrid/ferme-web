import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class RootHttpService {

  // protected webServiceProviderHostName: string = "localhost";
  // protected webServiceProviderHostPort: number = 8082;
  // protected baseURI: string = "http://"+this.webServiceProviderHostName+":"+String(this.webServiceProviderHostPort)+"/api";
  protected baseURI: string = "/api";

  constructor() {}
}
