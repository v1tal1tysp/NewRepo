using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class Usertype {

        public ObjectId id { get; set; }
        public string name { get; set; }

        public Usertype(string name)
        {
            this.name = name;
        }

        public static Usertype GetOrInsert(string name)
        {
            try
            {
                Usertype usertype = DB.Usertype.Find(x => x.name == name).FirstOrDefault();
                if (usertype == null)
                {
                    Usertype newuser = new Usertype(name);
                    DB.Usertype.InsertOne(newuser);
                    return newuser;
                }

                return usertype;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Utilizador" + e.ToString());
            }
        }


    }
}