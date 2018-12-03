using BALProj;
using ItableService.Controllers.Models;
using System;
using System.IO;
using System.Web.Hosting;
using System.Web.Http;

namespace ItableService.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {

        public UserController()
        {
            BAL.InitLogFilePath(HostingEnvironment.MapPath("~"));
        }


        [HttpPost, Route("login")]
        public IHttpActionResult Login([FromBody]Login model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }


            var u = BAL.Login(model.UserName, model.Password);


            return Ok(u);
        }


        [HttpPost, Route("register")]
        public IHttpActionResult Register([FromBody]Register model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var status = BAL.Register(model.UserName, model.FName, model.LName, int.Parse(model.Age), model.Telephone, model.Password, model.Email);

            if (status == "User Name or Email is already exists!")
            {
                return BadRequest(status);
            }

            return Ok(status);
        }


        [HttpPost, Route("ImgUpload")]
        public IHttpActionResult ImgUpload([FromBody]ImgUpload model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                File.WriteAllBytes(HostingEnvironment.MapPath($"ProfileUsersImages/{model.Base64imgName}"),
                    Convert.FromBase64String(model.Base64img));

                BAL.ImgUpload(model.Base64imgName, int.Parse(model.UserID));

                return Ok("ok");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return BadRequest();

        }
    }
}
