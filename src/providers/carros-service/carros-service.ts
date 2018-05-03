import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro } from '../../modelos/carro';

@Injectable()
export class CarrosServiceProvider {

  constructor(private _http: HttpClient) { // injetor o http
    
  }

  lista() {
    return this._http.get<Carro[]>('http://localhost:8080/api/carro/listaTodos'); // fazendo request na api
  }

}