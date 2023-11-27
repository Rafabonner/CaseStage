using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {

        private readonly Contexto _contexto;

        public PessoasController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoas>>> PegarTodosAsync()
        {
            return await _contexto.Pessoas.ToListAsync();
        }

        [HttpGet("{PessoaId}")]

        public async Task<ActionResult<Pessoas>> PegarPessoaPeloIdAsync(int PessoaId)
        {
            Pessoas pessoas = await _contexto.Pessoas.FindAsync(PessoaId);

            if (pessoas == null)
            {
                return NotFound();
            }

            return pessoas;
        }

        [HttpPost]

        public async Task<ActionResult<Pessoas>> SalvarPessoasAsync(Pessoas pessoas)
        {
            await _contexto.Pessoas.AddAsync(pessoas);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]

        public async Task<ActionResult> AtualizarPessoaAsync(Pessoas pessoas)
        {
            _contexto.Pessoas.Update(pessoas);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{PessoaId}")]

        public async Task<ActionResult> ExcluirPessoaAsync(int PessoaId)
        {
            Pessoas pessoas = await _contexto.Pessoas.FindAsync(PessoaId);
            if (pessoas == null)
            {
                return NotFound();
            }
            _contexto.Remove(pessoas);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}
