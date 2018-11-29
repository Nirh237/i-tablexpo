using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ItableService.Controllers.Models
{
    public class SendInvitation
    {
        [Required]
        [EmailAddress]
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required]
        [JsonProperty("gameID")]
        public int GameID { get; set; }


        [Required]
        [JsonProperty("userName")]
        public string UserName { get; set; }
    }
}