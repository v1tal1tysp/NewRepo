using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class Users {

        public ObjectId Id { get; set; }
        public string Username { get; set; }
        public string Paswordtext { get; set; }
        public string Firstname { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Usertype type { get; set; }

        public Users(string Username, string Paswordtext, string Firstname, string LastName, string Email, Usertype type)
        {
            this.Username = Username;
            this.Paswordtext = stringUtil.Crypt(Paswordtext);
            this.Firstname = Firstname;
            this.LastName = LastName;
            this.Email = Email;
            this.type = type;
        }

        public static bool Insert(string Username, string Paswordtext, string Firstname, string LastName, string Email, Usertype type)
        {
            try
            {
                Users newuser = new Users(Username, Paswordtext, Firstname, LastName, Email, type);
                DB.User.InsertOne(newuser);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Utilizador" + e.ToString());
            }
        }

        public static bool Update(Users user)
        {
            try
            {
                DB.User.ReplaceOne(c => c.Id == user.Id, user);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Utilizador :" + e.ToString());
            }
        }

        public static bool Delete(Users user)
        {
            try
            {
                DB.User.DeleteOne(x => x.Id == user.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Utilizador :" + e.ToString());
            }
        }

        public static Users Login(string username, string password)
        {

            try
            {
                var filter = Builders<Users>.Filter.Eq("Username" , username.ToString());
                var result = DB.User.Find(filter).FirstOrDefault();
                
                if (result != null)
                {

                    string passsenc = stringUtil.Crypt(password);
                    
                    if(result.Paswordtext == passsenc)
                    {
                        return result;
                    }
                    else
                    {
                        return null;
                    }
                    
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Utilizador :" + e.ToString());
            }
        }



    }
}