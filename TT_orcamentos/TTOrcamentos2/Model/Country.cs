using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace TTOrcamentos2.Model {
    public class Country {
        public ObjectId id { get; set; }
        public int inId { get; set; }
        public string name { get; set; }


        public Country(string name, int InIdt)
        {
            this.name = name;
            this.inId = InIdt + 1;
        }

         
        public static Country Get(string name)
        {
            try
            {
                Country pais = DB.Country.Find(x => x.name == name).FirstOrDefault();
                if (pais != null)
                {
                    return pais;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Utilizador" + e.ToString());
            }
        }

        public static bool Insert(string name)
        {
            try
            {
                var t = GetAll();
                int val = t.Count();


                Country cntr = new Country(name, val);
                DB.Country.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Country" + e.ToString());
            }
        }

        public static bool Update(Country Country)
        {
            try
            {
                DB.Country.ReplaceOne(c => c.id == Country.id, Country);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Country :" + e.ToString());
            }
        }

        public static bool Delete(Country Country)
        {
            try
            {
                DB.Country.DeleteOne(x => x.id == Country.id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Country :" + e.ToString());
            }
        }

        public static List<Country> GetAll()
        {
            List<Country> lista = new List<Country>();
            try
            {
                var filter = Builders<Country>.Filter.Empty;
                lista = DB.Country.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Country" + e.ToString());
            }
        }

    } 
}