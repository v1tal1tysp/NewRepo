using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class Quartos {
        public ObjectId Id { get; set; }
        public int inId { get; set; }
        public string name { get; set; }
        public int capacidade { get; set; }
        public bool predefenido { get; set; }



        public Quartos(string name, int capacidade, bool predefenido, int InIdt)
        {
            this.name = name;
            this.capacidade = capacidade;
            this.predefenido = predefenido;
            this.inId = InIdt + 1;
        }


        public static Quartos Get(string name, int capacidade, bool predefenido)
        {
            try
            {
                Quartos pais = DB.Quartos.Find(x => x.name == name).FirstOrDefault();
                if (pais != null)
                {
                    return pais;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro get Quartos " + e.ToString());
            }
        }

        public static bool Insert(string name, int capacidade, bool predefenido)
        {
            try
            {
                var t = GetAll();
                int val = t.Count();
                Quartos cntr = new Quartos(name, capacidade, predefenido, val);
                DB.Quartos.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Quartos " + e.ToString());
            }
        }

        public static bool Update(Quartos quarto)
        {
            try
            {
                DB.Quartos.ReplaceOne(c => c.Id == quarto.Id, quarto);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Quartos :" + e.ToString());
            }
        }

        public static bool Delete(Quartos Quartos)
        {
            try
            {
                DB.Quartos.DeleteOne(x => x.Id == Quartos.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Quartos :" + e.ToString());
            }
        }

        public static List<Quartos> GetAll()
        {
            List<Quartos> lista = new List<Quartos>();
            try
            {
                var filter = Builders<Quartos>.Filter.Empty;
                lista = DB.Quartos.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Country" + e.ToString());
            }
        }



    }
}