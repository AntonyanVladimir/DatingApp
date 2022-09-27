namespace API.Data;

using API.Entities;
using Microsoft.EntityFrameworkCore;
public class DataContext : DbContext
{
    public DbSet<AppUser> Users { get; set; }
    public DataContext(DbContextOptions options) : base(options)
    {
    }
}