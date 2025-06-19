using System.ComponentModel.DataAnnotations;

namespace UserRetailEBillDisplay.Models
{
    public class Invoice
    {
        [Key]
        public string? MobileNumber { get; set; }
        public int InvoiceNo { get; set; }
        public int CustomerID { get; set; }
        public string? ItemDescription { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal GST { get; set; }
    }
}
