using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserRetailEBillDisplay.Data;
using UserRetailEBillDisplay.Models;

namespace UserRetailEBillDisplay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InvoicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices.ToListAsync();
        }
        

        // GET: api/Invoices/5
        [HttpGet("{MobileNumber}")]
        public async Task<ActionResult<Invoice>> GetInvoice(string MobileNumber)
        {
            var invoice = await _context.Invoices.FindAsync(MobileNumber);

            if (invoice == null)
            {
                return NotFound("number not registered yet");
            }

            return invoice;
        }


        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(string id, Invoice invoice)
        {
            if (id != invoice.MobileNumber)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (InvoiceExists(invoice.MobileNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetInvoice", new { id = invoice.MobileNumber }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(string id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // for the InvoicePDFs
        [HttpGet("GetInvoicePdf/{mobileNumber}")]
        public IActionResult GetInvoicePdf(string mobileNumber)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "InvoicePDFs", $"{mobileNumber}.pdf");

            if (!System.IO.File.Exists(filePath))
                return NotFound(new { message = "PDF not found for this mobile number." });

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            //return File(fileBytes, "application/pdf");
            return File(fileBytes, "application/pdf", $"{mobileNumber}.pdf");
        }


        private bool InvoiceExists(string id)
        {
            return _context.Invoices.Any(e => e.MobileNumber == id);
        } 
    }
}
