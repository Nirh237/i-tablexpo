using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ItableService.Controllers.Models
{
    public class Register
    {

        [Required]
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }


        [Required]
        [JsonProperty("fName")]
        public string FName { get; set; }

        [Required]
        [JsonProperty("email")]
        public string Email { get; set; }


        [Required]
        [JsonProperty("lName")]
        public string LName { get; set; }


        [Required]
        [JsonProperty("age")]
        public string Age { get; set; }


        [Required]
        [JsonProperty("telephone")]
        public string Telephone { get; set; }
    }
}


