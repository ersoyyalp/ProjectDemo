using Microsoft.EntityFrameworkCore;

namespace DemoProject.DTOs
{
    public class Context:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=DESKTOP-56DC4TI; database=DemoProject; integrated security=true;TrustServerCertificate=True");
        }

        public DbSet<User> Users { get; set; } 
        public DbSet<Configuration> Configurations { get; set; } 
    }
}
