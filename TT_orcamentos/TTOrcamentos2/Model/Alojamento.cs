using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Linq;
using System.Collections.Generic;
using MongoDB.Driver;

namespace TTOrcamentos2.Model {


    public class Alojamento {
        [BsonId]
        public ObjectId Id { get; set; }
        public string  Hotelname { get; set; }
        public string OrcamentoId { get; set; }
        public List<int> quartosId { get; set; }
        public Acordo acordo { get; set; }
        public List<Dias> Dias { get; set; }

        public Alojamento()
        {




        }
        public Alojamento(string hotelName, string OrcamentoId, List<int> quartos, Acordo acordo,List<Dias> dias)
        {
            this.Hotelname = hotelName;
            this.OrcamentoId = OrcamentoId;
            this.quartosId = quartos;
            this.acordo = acordo;
            this.Dias = dias;
        }
        public static bool Insert(string hotelName, string OrcamentoId, List<int> quartos, Acordo acordo, List<Dias> dias)
        {
            try
            {
                Alojamento cntr = new Alojamento(hotelName, OrcamentoId, quartos, acordo, dias);
                DB.Alojamento.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Alojamento" + e.ToString());
            }
        }
        public static bool Update(Alojamento aloj)
        {
            try
            {
                DB.Alojamento.ReplaceOne(c => c.Id == aloj.Id, aloj);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Alojamento :" + e.ToString());
            }
        }
        public static List<Alojamento> GetAll(string orcamento)
        {
            List<Alojamento> lista = new List<Alojamento>();
            try
            {
                var filter = Builders<Alojamento>.Filter.Where(x=> x.OrcamentoId == orcamento);
                lista = DB.Alojamento.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Getall Alojamento " + e.ToString());
            }
        }
        public static bool Delete(Alojamento aloj)
        {
            try
            {
                DB.Alojamento.DeleteOne(x => x.Id == aloj.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Alojamento :" + e.ToString());
            }
        }

    }



    public class Acordo {
        public Cambio cambio { get; set; }
        public bool AlmocoIncluido { get; set; }
        public Ivas Iva { get; set; }
        public double markup { get; set; }
        public double net { get; set; }
        public double margem { get; set; }
        public double Comissao { get; set; }
        public Tipo_Iva TipoIva { get; set; }
        public string Observaçoes { get; set; }
    }

    public class Dias {
        public DateTime Data { get; set; }
        public def definicao { get; set; }
    }
    public class def {

        public string nome { get; set; }
        public int numero { get; set; }

        public def(string nome, int numero)
        {
            this.nome = nome;
            this.numero = numero;
        }
    }
}