import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoas } from './Pessoas';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  url = 'http://localhost:5107/api/pessoas';
  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Pessoas[]>{
    return this.http.get<Pessoas[]>(this.url);
  }

  PegarPeloId(pessoaId: number): Observable<Pessoas>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.get<Pessoas>(apiUrl);
  }

  SalvarPessoa(pessoa: Pessoas) : Observable<any>{
    return this.http.post<Pessoas>(this.url, pessoa, httpOptions);
  }

  AtualizarPessoa(pessoa: Pessoas) : Observable<any>{
    return this.http.put<Pessoas>(this.url, pessoa, httpOptions);
  }

  ExcluirPessoa(pessoaId: number) : Observable<any>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
