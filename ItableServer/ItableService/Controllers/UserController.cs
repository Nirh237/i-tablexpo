using BALProj;
using ItableService.Controllers.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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
        public async Task<IHttpActionResult> Login([FromBody]Login model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }


            User u =  BAL.Login(model.UserName, model.Password);

    
            return Ok(u);
        }


        [HttpPost, Route("register")]
        public async Task<IHttpActionResult> Register([FromBody]Register model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            string status = BAL.Register(model.UserName,model.FName, model.LName, int.Parse(model.Age), model.Telephone, model.Password, model.Email);

            if(status == "User Name or Email is already exists!")
            {
                return BadRequest(status);
            }
            
            return Ok(status);
        }


        [HttpPost, Route("ImgUpload")]
        public async Task<IHttpActionResult> ImgUpload([FromBody]ImgUpload model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            File.WriteAllBytes(HostingEnvironment.MapPath("ProfileUsersImages/" + model.Base64imgName), Convert.FromBase64String(model.Base64img));
            string res = BAL.ImgUpload(model.Base64imgName, int.Parse(model.UserID));
          

            return Ok("ok");
        }
        

    }
}
