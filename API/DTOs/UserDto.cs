using System.ComponentModel.DataAnnotations;
using API.Controllers;

namespace API.DTOs
{
    public class UserDto : BaseApiController 
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Token { get; set; }
    }
}