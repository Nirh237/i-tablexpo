using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ItableService.Controllers.Models
{
    public class CreateGame
    {
        [Required]
        [JsonProperty("chipType")]
        public List<int> ChipType { get; set; }

        [Required]
        [JsonProperty("playersCount")]
        public int PlayersCount { get; set; }

        [Required]
        [JsonProperty("gameType")]
        public int GameType { get; set; }

        [Required]
        [JsonProperty("chipCount")]
        public int ChipCount { get; set; }

        [Required]
        [JsonProperty("chipValues")]
        public List<int> ChipValues { get; set; }

        [Required]
        [JsonProperty("bigBlind")]
        public int BigBlind { get; set; }

        [Required]
        [JsonProperty("smallBlind")]
        public int SmallBlind { get; set; }

        [Required]
        [JsonProperty("blindTime")]
        public int BlindTime { get; set; }

        [Required]
        [JsonProperty("userID")]
        public int UserID { get; set; }

    }
}

