using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class ShtoDBContext : DbContext
    {
        public ShtoDBContext(DbContextOptions<ShtoDBContext> options) : base(options)
        {

        }


        public DbSet<DShto> DShto { get; set; }
    }
}

