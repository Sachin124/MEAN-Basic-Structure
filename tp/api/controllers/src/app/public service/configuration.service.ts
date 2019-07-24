import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  // public static baseUrl = `http://api.rajsitechnologies.com:80/App_API/`;
  public static baseUrl = `http://devapi.rajsitechnologies.com:80/App_API/`;
  // public static baseUrl = `https://stackapi.magicalstack.com/App_API/`;
  constructor() { }
}
