using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class Cambio {
        [BsonId]
        public ObjectId Id { get; set; }
        public int inId { get; set; }
        public string name { get; set; }
        public double value { get; set; }
         
        public Cambio(string name, double value, int InIdt)
        {
            this.name = name;
            this.value = value;
            this.inId = InIdt + 1;
        }


        public static Cambio Get(string name)
        {
            try
            {
                Cambio Cambio = DB.Cambio.Find(x => x.name == name).FirstOrDefault();
                if (Cambio != null)
                {
                    return Cambio;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Cambio " + e.ToString());
            }
        }

        public static bool Insert(string name, double value)
        {
            try
            {
                var t = GetAll();
                int val = t.Count();
                Cambio cntr = new Cambio(name, value, val);
                DB.Cambio.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Cambio" + e.ToString());
            }
        }

        public static bool Update(Cambio Cambio)
        {
            try
            {
                DB.Cambio.ReplaceOne(c => c.Id == Cambio.Id, Cambio);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Cambio :" + e.ToString());
            }
        }

        public static bool Delete(Cambio Cambio)
        {
            try
            {
                DB.Cambio.DeleteOne(x => x.Id == Cambio.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Cambio :" + e.ToString());
            }
        }

        public static List<Cambio> GetAll()
        {
            List<Cambio> lista = new List<Cambio>();
            try
            {
                var filter = Builders<Cambio>.Filter.Empty;
                lista = DB.Cambio.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Cambio " + e.ToString());
            }
        }

    }
}