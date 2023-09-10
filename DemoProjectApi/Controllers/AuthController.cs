using Azure.Core;
using DemoProject.DTOs;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace DemoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        [Route("Register")]
        public IActionResult Register(User user )
        {
            using (var context = new Context(/* options */))
            {
                var existingUser = context.Users.FirstOrDefault(u => u.UserName == user.UserName || u.UserEmail == user.UserEmail && u.Password == user.Password);
                if (existingUser != null)
                {
                    return BadRequest("Bu kullanıcı adı veya e-posta adresi zaten kullanılmaktadır.");
                }
                context.Users.Add(user); 
                context.SaveChanges(); 
            }
            return Ok("Kayıt başarılı");
        }
        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDto user)
        {
            Context c = new Context();
            var dataValue = c.Users.FirstOrDefault(x=>x.UserName==user.UserName && x.Password==user.Password);
            if (dataValue != null)
            {
                var claims  = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, user.UserName)
                };
                var useridentity = new ClaimsIdentity(claims,"a");
                ClaimsPrincipal principal = new ClaimsPrincipal(useridentity);
                await HttpContext.SignInAsync( principal);
                return Ok("giriş başarılı");
            }
            else
            {
                return BadRequest("hatalı kullanıcı adı veya şifre");
            }

            }
        [HttpGet("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok("Çıkış yapıldı.");
        }
    }
  
    }

