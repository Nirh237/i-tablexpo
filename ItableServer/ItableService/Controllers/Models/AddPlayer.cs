using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ItableService.Controllers.Models
{
    public class AddPlayer
    {
        [Required]
        [JsonProperty("gameID")]
        public int GameID { get; set; }


        [Required]
        [JsonProperty("userId")]
        public int UserId { get; set; }
    }
}