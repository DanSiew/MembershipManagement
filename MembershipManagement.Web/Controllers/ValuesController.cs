using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MembershipManagement.Domain.Repositories;
using MembershipManagement.Domain.Models;
using MembershipManagement.Domain;
using MembershipManagement.Domain.Queries;
using Microsoft.EntityFrameworkCore;

namespace MembershipManagement.Web.Controllers
{
  [Route("api/values")]
  public class ValuesController : Controller
  {

    private IGenericRepository<MembershipUser> _repository;


    public ValuesController(IGenericRepository<MembershipUser> repository)
    {
      _repository = repository;
    }


    // GET api/values
    [HttpGet]
    public IActionResult Get()
    {
      var includes = new Includes<MembershipUser>(query => query.Include(b => b.MembershipRole));
      var users = _repository.GetAll(null, includes.Expression);
      return Json(users);
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public IActionResult Get(string id)
    {
      var includes = new Includes<MembershipUser>(query => query.Include(b => b.MembershipRole));
      var identifier = Guid.Parse(id);
      var users = _repository.Get(identifier, includes.Expression);
      return Json(users);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
