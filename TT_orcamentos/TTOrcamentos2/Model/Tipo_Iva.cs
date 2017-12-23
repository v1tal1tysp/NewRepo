using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TTOrcamentos2.Model {
    public class Tipo_Iva {
        [BsonId]
        public ObjectId Id { get; set; }
        public int inId { get; set; }
        public string name { get; set; }

        public Tipo_Iva(string name, int InIdt)
        {
            this.name = name;
            this.inId = InIdt + 1;
        }
         

        public static Tipo_Iva Get(string name)
        {
            try
            {
                Tipo_Iva pais = DB.Tipo_Iva.Find(x => x.name == name).FirstOrDefault();
                if (pais != null)
                {
                    return pais;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Tipo_Iva" + e.ToString());
            }
        }

        public static bool Insert(string name)
        {
            try
            {
                var t = GetAll();
                int val = t.Count();


                Tipo_Iva cntr = new Tipo_Iva(name, val);
                DB.Tipo_Iva.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Tipo_Iva" + e.ToString());
            }
        }

        public static bool Update(Tipo_Iva Tipo_Iva)
        {
            try
            {
                DB.Tipo_Iva.ReplaceOne(c => c.Id == Tipo_Iva.Id, Tipo_Iva);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Tipo_Iva :" + e.ToString());
            }
        }

        public static bool Delete(Tipo_Iva Tipo_Iva)
        {
            try
            {
                DB.Tipo_Iva.DeleteOne(x => x.Id == Tipo_Iva.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Tipo_Iva :" + e.ToString());
            }
        }

        public static List<Tipo_Iva> GetAll()
        {
            List<Tipo_Iva> lista = new List<Tipo_Iva>();
            try
            {
                var filter = Builders<Tipo_Iva>.Filter.Empty;
                lista = DB.Tipo_Iva.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Tipo_Iva " + e.ToString());
            }
        }

    }
}