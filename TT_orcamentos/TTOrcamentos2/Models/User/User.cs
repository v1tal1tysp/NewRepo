using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Models.User
{
    public class Usersss
    {

        public string UserID { get; set; }
        public string LoginName { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email{ get; set; }
        public int UserType{ get; set; }
        public string Salt{ get; set; }
    }
}