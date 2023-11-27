using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefasController : ControllerBase
    {
        private readonly Contexto _contexto;

        public TarefasController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet("{PessoaId}")]
        public async Task<ActionResult<IEnumerable<Tarefas>>> PegarTodasTarefasAsync(int PessoaId)
        {
            Pessoas pessoa = await _contexto.Pessoas.FindAsync(PessoaId);

            if (pessoa == null)
            {
                return NotFound(); // Se a pessoa não existe, retorna NotFound
            }

            // Carrega as tarefas associadas à pessoa
            var tarefas = await _contexto.Tarefas
                .Where(t => t.PessoaId == pessoa.PessoaId)
                .ToListAsync();

            return tarefas;
        }

        [HttpGet("{TarefasId}/{PessoaId}")]

        public async Task<ActionResult<TarefasPessoasViewModel>> PegarTarefasPeloIdAsync(int TarefasId , int PessoaId)
        {
            Tarefas tarefas = await _contexto.Tarefas.FindAsync(TarefasId);
            Pessoas pessoas = await _contexto.Pessoas.FindAsync(PessoaId);

            if (tarefas == null || pessoas == null)
            {
                return NotFound();
            }

            var tarefaPessoa = new TarefasPessoasViewModel
            {
                Tarefas = tarefas,
                Pessoas = pessoas
            };

            return tarefaPessoa;
        }

        [HttpPost("{pessoaId}")]
        public async Task<ActionResult<Tarefas>> SalvarTarefasAsync(int pessoaId, [FromBody] TarefaInput tarefaInput)
        {
            // Verifique se a pessoa à qual a tarefa será associada existe
            bool pessoaExiste = await _contexto.Pessoas.AnyAsync(p => p.PessoaId == pessoaId);

            if (!pessoaExiste)
            {
                return NotFound("A pessoa não existe.");
            }

            // Converta o objeto TarefaInput para Tarefas
            Tarefas tarefas = new Tarefas
            {
                NomeTarefa = tarefaInput.NomeTarefa,
                Descricao = tarefaInput.Descricao,
                PessoaId = pessoaId // Associe a tarefa à pessoa
            };

            await _contexto.Tarefas.AddAsync(tarefas);
            await _contexto.SaveChangesAsync();

            return Ok();
        }


        [HttpPut]

        public async Task<ActionResult> AtualizarTarefasAsync(Tarefas tarefas)
        {
            _contexto.Tarefas.Update(tarefas);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{pessoaId}/{tarefaId}")]
        public async Task<ActionResult> ExcluirTarefaAsync(int pessoaId, int tarefaId)
        {
            Tarefas tarefas = await _contexto.Tarefas
                .Where(t => t.PessoaId == pessoaId && t.TarefaId == tarefaId)
                .FirstOrDefaultAsync();

            if (tarefas == null)
            {
                return NotFound();
            }

            _contexto.Remove(tarefas);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }

    public class TarefasPessoasViewModel
    {
        public Tarefas Tarefas { get; set; }
        public Pessoas Pessoas { get; set; }
    }
}
