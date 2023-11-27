import { PessoasService } from './../../pessoas.service';
import { TarefasService } from 'src/app/tarefas.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoas } from 'src/app/Pessoas';
import { Tarefas } from 'src/app/Tarefas';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  formulario: any;
  formularioTarefas: any;
  tituloFormulario: string = '';
  tituloFormularioTarefa: string = '';
  pessoas: Pessoas[] = [];
  nomePessoa: string = '';
  pessoaId: number = 0;
  // Tarefas
  tarefas : Tarefas [] =[];
  nomeTarefa: string = '';
  tarefaId: number = 0;
  visibilidadeTabela: boolean = true;
  visibilidadeFormulario:  boolean = false;

  visibilidadeFormularioTarefas:  boolean = false;
  visibilidadeTabelaTarefas: boolean = false;
  tarefasDaPessoa: Tarefas[] = [];

  modalRef: BsModalRef = new BsModalRef();

  constructor(private pessoasService:PessoasService,
    private tarefasService:TarefasService,
    private modalService: BsModalService,) { }

  ngOnInit(): void {

    this.pessoasService.PegarTodos().subscribe(resultado => {
      this.pessoas = resultado;
    });

    this.tarefasService.PegarTodosTarefas(this.pessoaId).subscribe(resultado => {

      if (Array.isArray(resultado)) {
        this.tarefas = resultado;
      } else {
        this.tarefas = [resultado];
      }


    });

  }


  ExibirFormularioCadastro(): void {

    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
  }
  ExibirFormularioCadastroTarefas(): void {

    this.visibilidadeTabela = false;
    this.visibilidadeFormularioTarefas = true;
    this.visibilidadeTabelaTarefas = false;
    this.tituloFormularioTarefa = 'Nova Tarefas';
    this.formularioTarefas = new FormGroup({
      nomeTarefa: new FormControl(null),
      descricao: new FormControl(null),
    });
  }


  ExibirFormularioAtualizacao(pessoaId: number) : void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pessoasService.PegarPeloId(pessoaId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao)
      });
    });
  }

  ExibirFormularioAtualizacaoTarefas(tarefaId: number, pessoaId : number) : void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormularioTarefas = true;

    this.tarefasService.PegarTarefasPeloId(tarefaId, pessoaId).subscribe(resultado => {
      this.formularioTarefas = `Atualizar ${resultado.nomeTarefa} ${resultado.descricao}`;

      this.formularioTarefas = new FormGroup({
        tarefaId: new FormControl(resultado.tarefaId),
        nomeTarefa: new FormControl(resultado.nomeTarefa),
        descricao: new FormControl(resultado.descricao),
        pessoaId: new FormControl(resultado.pessoaId),

      });
    });
  }

  EnviarFormulario(): void{
    const pessoa : Pessoas = this.formulario.value;

    if(pessoa.pessoaId > 0){
      this.pessoasService.AtualizarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert('Pessoa atualizada com sucesso');
      this.pessoasService.PegarTodos().subscribe(registros =>{
        this.pessoas = registros;
      });
      });
    }else{
      this.pessoasService.SalvarPessoa(pessoa).subscribe((resultado) => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert('Pessoa inserida com sucesso');
      this.pessoasService.PegarTodos().subscribe(registros =>{
        this.pessoas = registros;
      })
    });}


  }

  EnviarFormularioTarefas(): void{
    const tarefas : Tarefas = this.formularioTarefas.value;

    if(tarefas.tarefaId > 0){
      this.tarefasService.AtualizarTarefas(tarefas).subscribe(resultado => {
        this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      this.visibilidadeFormularioTarefas = false;
      alert('Tarefa atualizada com sucesso');
      this.tarefasService.PegarTodosTarefas(this.pessoaId).subscribe(registros =>{
        if (Array.isArray(registros)) {
          this.tarefas = registros;
        } else {
          this.tarefas = [registros];
        }
      });
      });
    }else{
      this.tarefasService.SalvarTarefas(tarefas,this.pessoaId).subscribe((resultado) => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      this.visibilidadeFormularioTarefas = false;
      alert('Tarefa inserida com sucesso');
      this.tarefasService.PegarTodosTarefas(this.pessoaId).subscribe(registros =>{
        if (Array.isArray(registros)) {
          this.tarefas = registros;
        } else {
          this.tarefas = [registros];
        }
      })
    });}


  }

  ExibirTabelaTarefas(pessoaId: number) : void {

    this.tarefasService.PegarTodosTarefas(pessoaId).subscribe(
      (tarefas: Tarefas[]) => {
        this.tarefasDaPessoa = tarefas;
        this.pessoaId = pessoaId;
        this.visibilidadeTabela = false;
        this.visibilidadeTabelaTarefas = true;
      },
      (erro) => {
        console.error('Erro ao obter tarefas:', erro);
      }
    );
  }


  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
    this.visibilidadeTabelaTarefas = false;
  }

  ExibirConfirmacaoExclusao(pessoaId: number, nomePessoa : string, conteudoModal : TemplateRef<any>) : void{
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }


  ExcluirPessoa(pessoaId : number){
    this.pessoasService.ExcluirPessoa(pessoaId).subscribe(resultado =>{
      this.modalRef.hide();
      alert('Pessoa Excluida com sucesso');
      this.pessoasService.PegarTodos().subscribe(registros =>{
        this.pessoas = registros;
      })
    })
  }

  ExcluirTarefa(pessoaId: number,tarefaId: number) {
    this.tarefasService.ExcluirTarefas(pessoaId, tarefaId).subscribe(
      resultado => {
        this.modalRef.hide();
        alert('Tarefa excluída com sucesso');
        this.tarefasService.PegarTodosTarefas(this.pessoaId).subscribe(registros => {
          if (Array.isArray(registros)) {
            this.tarefas = registros;
          } else {
            this.tarefas = [registros];
          }
          window.location.reload();
        });
      },
      (error) => {
        if (error.status === 404) {
          alert('Tarefa não encontrada');
        } else {
          alert('Erro ao excluir a tarefa');
        }
      }
    );
  }

}
