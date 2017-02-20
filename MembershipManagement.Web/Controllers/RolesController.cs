using MembershipManagement.Domain.Models;
using MembershipManagement.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipManagement.Web.Controllers
{
  [Route("api/roles")]
  public class RolesController : Controller
  {

    private IGenericRepository<MembershipRole> _repository;


    public RolesController(IGenericRepository<MembershipRole> repository)
    {
      _repository = repository;
    }


    // GET api/values
    [HttpGet]
    public IActionResult Get()
    {
      var roles = _repository.GetAll();
      return Json(roles);
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      
      var roles = _repository.Get(id);
      return Json(roles);
    }
  }
}
