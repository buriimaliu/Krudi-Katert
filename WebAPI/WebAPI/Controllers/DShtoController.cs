using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DShtoController : ControllerBase
    {
        private readonly ShtoDBContext _context;

        public DShtoController(ShtoDBContext context)
        {
            _context = context;
        }

        // GET: api/DShto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DShto>>> GetDShto()
        {
            return await _context.DShto.ToListAsync();
        }

        // GET: api/DShto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DShto>> GetDShto(int id)
        {
            var dShto = await _context.DShto.FindAsync(id);

            if (dShto == null)
            {
                return NotFound();
            }

            return dShto;
        }

        // PUT: api/DShto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDShto(int id, DShto dShto)
        {
            dShto.id = id;

            _context.Entry(dShto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DShtoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DShto
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DShto>> PostDShto(DShto dShto)
        {
            _context.DShto.Add(dShto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDShto", new { id = dShto.id }, dShto);
        }

        // DELETE: api/DShto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDShto(int id)
        {
            var dShto = await _context.DShto.FindAsync(id);
            if (dShto == null)
            {
                return NotFound();
            }

            _context.DShto.Remove(dShto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DShtoExists(int id)
        {
            return _context.DShto.Any(e => e.id == id);
        }
    }
}
