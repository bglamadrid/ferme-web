import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  protected baseURI: string = "http://localhost:8082/api/";

  constructor() { }
}
