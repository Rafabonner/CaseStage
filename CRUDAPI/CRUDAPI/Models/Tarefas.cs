using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRUDAPI.Models
{
    public class Tarefas
    {
        [Key]
        public int TarefaId { get; set; }
        public string NomeTarefa { get; set; }
        public string Descricao { get; set; }



        [ForeignKey("PessoaId")]
        public int PessoaId { get; set; }

        public Pessoas Pessoa { get; set; }

    }
}
