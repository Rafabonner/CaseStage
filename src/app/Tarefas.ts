export class Tarefas {
  tarefaId: number = 0;
  nomeTarefa: string = '';
  descricao: string = '';
  pessoaId: number = 0;
  pessoa: Pessoa | null = null;
}

export class Pessoa {
  pessoaId: number = 0;
  nome: string = '';
  sobrenome: string = '';
  idade: number | null = null;
  profissao: string = '';
}
