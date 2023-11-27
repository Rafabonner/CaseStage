import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefas } from './Tarefas';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  url = 'http://localhost:5107/api/tarefas';
  constructor(private http: HttpClient) { }

  PegarTodosTarefas(pessoaId: number): Observable<Tarefas[]>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.get<Tarefas[]>(apiUrl);
  }

  PegarTarefasPeloId(tarefaId: number, pessoaId: number): Observable<Tarefas>{
    const apiUrl = `${this.url}/${tarefaId}/${pessoaId}`;
    return this.http.get<Tarefas>(apiUrl);
  }


  SalvarTarefas(tarefa: Tarefas, pessoaId: number): Observable<any> {
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.post<Tarefas>(apiUrl, tarefa, httpOptions);
  }
  AtualizarTarefas(tarefa: Tarefas) : Observable<any>{
    return this.http.put<Tarefas>(this.url, tarefa, httpOptions);
  }

  ExcluirTarefas(pessoaId: number, tarefaId: number): Observable<any> {
    const apiUrl = `${this.url}/${pessoaId}/${tarefaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

}
