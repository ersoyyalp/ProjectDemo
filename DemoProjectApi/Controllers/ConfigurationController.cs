using DemoProject.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        Context c = new Context();
        [HttpGet]
        public IActionResult ConfigurationList()
        {
            var configurations = c.Configurations.ToList(); 
            return Ok(configurations); 
        }

        [HttpPost]
        [Route("Add")]

        public IActionResult AddConfiguration(Configuration configuration)
        {
           c.Configurations.Add(configuration);

           c.SaveChanges();

           return Ok();
        }


    }
}
