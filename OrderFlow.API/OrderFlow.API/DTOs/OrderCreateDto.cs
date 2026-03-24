namespace OrderFlow.API.DTOs
{
    public class OrderCreateDto
    {
        public int UserId { get; set; }
        public List<OrderItemDto>? Items { get; set; }
    }
}