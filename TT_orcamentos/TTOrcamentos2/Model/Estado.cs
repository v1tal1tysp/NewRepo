using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class Estado {

        [BsonId]
        public ObjectId Id { get; set; }
        public int inId { get; set; }
        public string Name { get; set; }

        public Estado(string name, int InIdt)
        {
            this.Name = name;
            this.inId = InIdt + 1;
        }
         
        public static bool Insert(string name)
        {

            var t = GetAll();
            int val = t.Count();

            try
            {


                Estado cntr = new Estado(name,val);

                var test = cntr;
                DB.Estado.InsertOne(cntr);

                


                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Estado" + e.ToString());
            }
        }

        public static bool Update(Estado Estado)
        {
            try
            {
                DB.Estado.ReplaceOne(c => c.Id == Estado.Id, Estado);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Estado :" + e.ToString());
            }
        }

        public static bool Delete(Estado Estado)
        {
            try
            {
                DB.Estado.DeleteOne(x => x.Id == Estado.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Estado :" + e.ToString());
            }
        }

        public static List<Estado> GetAll()
        {
            List<Estado> lista = new List<Estado>();
            try
            {
                var filter = Builders<Estado>.Filter.Empty;
                lista = DB.Estado.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Getall Estado" + e.ToString());
            }
        }

    }
}