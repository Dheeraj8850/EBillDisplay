using Microsoft.EntityFrameworkCore;
using UserRetailEBillDisplay.Models;

namespace UserRetailEBillDisplay.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Invoice> Invoices { get; set; } = null!;
    }
}