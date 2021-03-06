﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TTOrcamentos2.Model {
    public class Ivas {
        [BsonId]

        public ObjectId Id { get; set; }
        public string name { get; set; }
        public int inId { get; set; }



        public Ivas(string name, int InIdt)
        {
            this.name = name;
            this.inId = InIdt + 1;
        }
         

        public static Ivas Get(string name)
        {
            try
            {
                Ivas pais = DB.Ivas.Find(x => x.name == name).FirstOrDefault();
                if (pais != null)
                {
                    return pais;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Ivas" + e.ToString());
            }
        }

        public static bool Insert(string name)
        {
            try
            {

                var t = GetAll();
                int val = t.Count();
                Ivas cntr = new Ivas(name, val);
                DB.Ivas.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Ivas" + e.ToString());
            }
        }

        public static bool Update(Ivas Ivas)
        {
            try
            {
                DB.Ivas.ReplaceOne(c => c.Id == Ivas.Id, Ivas);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Ivas :" + e.ToString());
            }
        }

        public static bool Delete(Ivas Ivas)
        {
            try
            {
                DB.Ivas.DeleteOne(x => x.Id == Ivas.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Ivas :" + e.ToString());
            }
        }

        public static List<Ivas> GetAll()
        {
            List<Ivas> lista = new List<Ivas>();
            try
            {
                var filter = Builders<Ivas>.Filter.Empty;
                lista = DB.Ivas.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Ivas " + e.ToString());
            }
        }


    }
}