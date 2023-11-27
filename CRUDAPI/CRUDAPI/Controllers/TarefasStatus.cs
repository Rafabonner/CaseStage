using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefasStatus : ControllerBase
    {
        private readonly Contexto _contexto;

        public TarefasStatusController(Contexto contexto)
        {
            _contexto = contexto;
        }
    }
}
