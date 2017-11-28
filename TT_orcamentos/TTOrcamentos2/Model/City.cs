using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace TTOrcamentos2.Model {
    public class City {
        public ObjectId id { get; set; }
        public string name { get; set; }
        public Country Country { get; set; }

        public City(string name, Country country)
        {
            this.name = name;
            this.Country = country;
        }


        public static bool Insert(string name, Country country)
        {
            try
            {
                City cntr = new City(name, country);
                DB.City.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir City " + e.ToString());
            }
        }

        public static bool Update(City City)
        {
            try
            {
                DB.City.ReplaceOne(c => c.id == City.id, City);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update City :" + e.ToString());
            }
        }

        public static bool Delete(City City)
        {
            try
            {
                DB.City.DeleteOne(x => x.id == City.id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete City :" + e.ToString());
            }
        }

        public static List<City> GetAll()
        {
            List<City> lista = new List<City>();
            try
            {
                var filter = Builders<City>.Filter.Empty;
                lista = DB.City.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro pesquisar City " + e.ToString());
            }
        }

    }

}