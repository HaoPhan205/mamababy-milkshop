using MilkRepository.Models;

namespace Milk.Model.ProductModel
{
    public class RequestCreateProductItemModel
    {
        public int ProductItemId { get; set; }

        public string? Benefit { get; set; }

        public string? Description { get; set; }

        public string? Image { get; set; }

        public string ItemName { get; set; } = null!;

        public decimal? Price { get; set; }

        public double? Weight { get; set; }

        public int? ProductId { get; set; }

    }
}
