using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class TipoFornecedor {
        [BsonId]
        public ObjectId id { get; set; }
        public int inId { get; set; }
        public string name { get; set; }

        public TipoFornecedor(string name,int InIdt)
        {
            this.name = name;
            this.inId = InIdt + 1;
        }



        public static bool Insert(string name)
        {
            try
            {
                var t = GetAll();
                int val = t.Count();

                TipoFornecedor cntr = new TipoFornecedor(name, val);
                DB.TipoFornecedor.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir TipoFornecedor" + e.ToString());
            }
        }

        public static bool Update(TipoFornecedor TipoFornecedor)
        {
            try
            {
                DB.TipoFornecedor.ReplaceOne(c => c.id == TipoFornecedor.id, TipoFornecedor);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update TipoFornecedor :" + e.ToString());
            }
        }

        public static bool Delete(TipoFornecedor TipoFornecedor)
        {
            try
            {
                DB.TipoFornecedor.DeleteOne(x => x.id == TipoFornecedor.id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Country :" + e.ToString());
            }
        }

        public static List<TipoFornecedor> GetAll()
        {
            List<TipoFornecedor> lista = new List<TipoFornecedor>();
            try
            {
                var filter = Builders<TipoFornecedor>.Filter.Empty;
                lista = DB.TipoFornecedor.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Country" + e.ToString());
            }
        }


    }

}