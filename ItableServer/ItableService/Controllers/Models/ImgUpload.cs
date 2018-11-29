using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ItableService.Controllers.Models
{
    public class ImgUpload
    {

        [Required]
        [JsonProperty("base64img")]
        public string Base64img { get; set; }


        [Required]
        [JsonProperty("base64imgName")]
        public string Base64imgName { get; set; }


        [Required]
        [JsonProperty("userID")]
        public string UserID { get; set; }


        
    }
}