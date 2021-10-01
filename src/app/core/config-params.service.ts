import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(): HttpParams {
    let httpParams = new HttpParams();
    return httpParams;
  }
}