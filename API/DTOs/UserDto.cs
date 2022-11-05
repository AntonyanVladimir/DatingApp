using System.ComponentModel.DataAnnotations;
using API.Controllers;

namespace API.DTOs
{
    public class UserDto 
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
    }
}