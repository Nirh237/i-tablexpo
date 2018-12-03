using BALProj;
using DALProj;
using ItableService.Controllers.Models;
using System.Web.Http;

namespace ItableService.Controllers
{
    [RoutePrefix("api/game")]
    public class GameController : ApiController
    {
        [HttpPost, Route("new")]
        public IHttpActionResult CreateNwGame([FromBody] CreateGame model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = DBService.CreateNewGame(model.PlayersCount, model.GameType, model.ChipCount,
                                     model.ChipType, model.ChipValues, model.BigBlind,
                                     model.SmallBlind, model.BlindTime, model.UserID);

            if (result == -1)
            {
                return BadRequest("Unable to create game");
            }

            return Ok(result);
        }

        [HttpPost, Route("invite")]
        public IHttpActionResult SendInvitation([FromBody] SendInvitation model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = BAL.GetUserByEmail(model.Email);

            if (user == null)
            {
                return BadRequest("user not found");
            }


            BAL.SendInvitation(user.Token, "i-table", $"invitation from {model.UserName}", model.GameID);

            return Ok("invitation sent");
        }

        [HttpPost, Route("addPlayer")]
        public IHttpActionResult AddPlayerToGameByGameId([FromBody] AddPlayer model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = DBService.AddPlayerToGame(model.GameID, model.UserId);

            if (response == 0)
            {
                return BadRequest("Cant add player");
            }

            return Ok();
        }

    }
}
