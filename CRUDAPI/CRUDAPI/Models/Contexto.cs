using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDAPI.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Pessoas> Pessoas { get; set; }
        public DbSet<Tarefas> Tarefas { get; set; }


        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pessoas>().ToTable("Pessoas");
            modelBuilder.Entity<Tarefas>().ToTable("Tarefas");

            base.OnModelCreating(modelBuilder);
        }
    }
}