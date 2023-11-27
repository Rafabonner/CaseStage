using System.ComponentModel.DataAnnotations;

namespace CRUDAPI.Models
{
    public class TarefaStatus
    {
        [Key]
        public int StatusId { get; set; }
        public string NomeStatus { get; set; }
    }
}
