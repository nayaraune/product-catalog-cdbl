import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../shared/models/produto';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/produtos/';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(url, produto);
  }

  editar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(url + produto.id, produto);
  }

  visualizar(id: number): Observable<Produto> {
    return this.http.get<Produto>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

  public productsList(){
    return  this.http.get("http://localhost:3000/produtos/");
    }
}
