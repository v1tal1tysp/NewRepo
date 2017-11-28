using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class Cambio {
        public ObjectId Id { get; set; }
        public string name { get; set; }
        public double value { get; set; }

        public Cambio(string name, double value)
        {
            this.name = name;
            this.value = value;
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
                Cambio cntr = new Cambio(name, value);
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