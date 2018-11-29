using BALProj;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 

        BAL.InitLogFilePath(Server.MapPath("~"));
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    [WebMethod]
    public string Register(string userName, string fName, string lName, string age, string telephone, string password, string email)
    {
        string output;
        string status = BAL.Register(userName, fName, lName, int.Parse(age), telephone, password, email);

        output = new JavaScriptSerializer().Serialize(status);
        return output;


    }

    [WebMethod]
    public string Login(string userName, string password)
    {


        User u = BAL.Login(userName, password);


        string output = new JavaScriptSerializer().Serialize(u);
        return output;



    }

    [WebMethod]
    public string ImgUpload(string base64img, string base64imgName, string userID)
    {
        //for example - pay attention the first '/' is part of the image!
        //
        //File.AppendAllText(Server.MapPath("images/file1.txt"), base64imgName + "\r\n");
        File.WriteAllBytes(Server.MapPath("ProfileUsersImages/" + base64imgName), Convert.FromBase64String(base64img));
        string res = BAL.ImgUpload(base64imgName, int.Parse(userID));
        return new JavaScriptSerializer().Serialize(new { res = "OK" });
    }

    //[WebMethod]
    //public string SendPushNotification(string token)
    //{
    //    // Create a request using a URL that can receive a post.   
    //    WebRequest request = WebRequest.Create("https://exp.host/--/api/v2/push/send");
    //    // Set the Method property of the request to POST.  
    //    request.Method = "POST";
    //    // Create POST data and convert it to a byte array.  
    //    var objectToSend = new
    //    {
    //        to = token,
    //        title = "my title",
    //        body = "body from WSC# i-table",
    //        badge = 3,
    //        data = new { name = "nir", grade = 100 }
    //    };

    //    string postData = new JavaScriptSerializer().Serialize(objectToSend);

    //    byte[] byteArray = Encoding.UTF8.GetBytes(postData);
    //    // Set the ContentType property of the WebRequest.  
    //    request.ContentType = "application/json";
    //    // Set the ContentLength property of the WebRequest.  
    //    request.ContentLength = byteArray.Length;
    //    // Get the request stream.  
    //    Stream dataStream = request.GetRequestStream();
    //    // Write the data to the request stream.  
    //    dataStream.Write(byteArray, 0, byteArray.Length);
    //    // Close the Stream object.  
    //    dataStream.Close();
    //    // Get the response.  
    //    WebResponse response = request.GetResponse();
    //    // Display the status.  
    //    string returnStatus = ((HttpWebResponse)response).StatusDescription;
    //    //Console.WriteLine(((HttpWebResponse)response).StatusDescription);
    //    // Get the stream containing content returned by the server.  
    //    dataStream = response.GetResponseStream();
    //    // Open the stream using a StreamReader for easy access.  
    //    StreamReader reader = new StreamReader(dataStream);
    //    // Read the content.  
    //    string responseFromServer = reader.ReadToEnd();
    //    // Display the content.  
    //    //Console.WriteLine(responseFromServer);
    //    // Clean up the streams.  
    //    reader.Close();
    //    dataStream.Close();
    //    response.Close();

    //    return postData;
    //}

    [WebMethod]
    public string SendPushNotification(string token, string title, string body)//add title and body vars  
    {


        using (var client = new WebClient())
        {

            var values = new NameValueCollection();
            values["to"] = token;
            values["title"] = title;
            values["body"] = body;




            var response = client.UploadValues("https://exp.host/--/api/v2/push/send", values);
            return new JavaScriptSerializer().Serialize(response);
        }
        
    }

    [WebMethod]
    public void UpdateNotificationKey(string email, string Token)
    {
        BAL.AddNotification(email, Token);
    }

    [Serializable]
    public class TestParams
    {
        public List<int> chipType { get; set; }
        public List<int> chipValues { get; set; }
    }

    //[WebMethod]
    //public string CreateNewGame(int playersCount, int gameType, int chipCount, int chipType, int chipValues, int bigBlind, int smallBlind, int blindTime)
    //{


    //   string res = BAL.CreateNewGame(playersCount, gameType, chipCount, chipType, chipValues, bigBlind, smallBlind, blindTime);
    //    return new JavaScriptSerializer().Serialize(res);
    //}




}
