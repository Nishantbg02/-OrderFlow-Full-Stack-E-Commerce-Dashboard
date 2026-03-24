using Microsoft.AspNetCore.Mvc;
using OrderFlow.API.Data;
using OrderFlow.API.DTOs;
using OrderFlow.API.Models;

namespace OrderFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateOrder(OrderCreateDto orderDto)
        {
            decimal totalAmount = 0;

            var order = new Order
            {
                UserId = orderDto.UserId,
                Status = "Pending",
                CreatedAt = DateTime.Now
            };

            _context.Orders.Add(order);
            _context.SaveChanges();

            foreach (var item in orderDto.Items)
            {
                var product = _context.Products.Find(item.ProductId);

                if (product == null)
                    return BadRequest("Product not found");

                if (product.Stock < item.Quantity)
                    return BadRequest("Not enough stock");

                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = product.Price
                };

                totalAmount += product.Price * item.Quantity;

                product.Stock -= item.Quantity;

                _context.OrderItems.Add(orderItem);
            }

            order.TotalAmount = totalAmount;

            _context.SaveChanges();

            return Ok(order);
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            var orders = _context.Orders.ToList();
            return Ok(orders);
        }
        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _context.Orders
                .Where(o => o.Id == id)
                .Select(o => new
                {
                    o.Id,
                    o.UserId,
                    o.TotalAmount,
                    o.Status,
                    o.CreatedAt,
                    Items = _context.OrderItems
                        .Where(oi => oi.OrderId == o.Id)
                        .Join(_context.Products,
                              oi => oi.ProductId,
                              p => p.Id,
                              (oi, p) => new
                              {
                                  productName = p.Name,
                                  quantity = oi.Quantity,
                                  price = oi.Price
                              }).ToList()
                })
                .FirstOrDefault();

            if (order == null)
                return NotFound("Order not found");

            return Ok(order);
        }

        [HttpPut("{id}/status")]
        public IActionResult UpdateOrderStatus(int id, [FromBody] string status)
        {
            var order = _context.Orders.Find(id);

            if (order == null)
                return NotFound("Order not found");

            order.Status = status;

            _context.SaveChanges();

            return Ok(order);
        }
    }
}