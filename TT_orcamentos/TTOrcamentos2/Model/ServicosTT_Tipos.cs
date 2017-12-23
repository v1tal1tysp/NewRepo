using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class ServicosTT_Tipos {
        public ObjectId Id { get; set; }
        public int inId { get; set; }
        public string name { get; set; }


        public ServicosTT_Tipos(string name, int InIdt)
        {
            this.name = name;
            this.inId = InIdt + 1;
        }
         

        public static ServicosTT_Tipos Get(string name)
        {
            try
            {
                ServicosTT_Tipos pais = DB.ServicosTT_Tipos.Find(x => x.name == name).FirstOrDefault();
                if (pais != null)
                {
                    return pais;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir ServicosTT_Tipos" + e.ToString());
            }
        }

        public static bool Insert(string name)
        {
            try
            {

                var t = GetAll();
                int val = t.Count();



                ServicosTT_Tipos cntr = new ServicosTT_Tipos(name, val);
                DB.ServicosTT_Tipos.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir ServicosTT_Tipos " + e.ToString());
            }
        }

        public static bool Update(ServicosTT_Tipos ServicosTT_Tipos)
        {
            try
            {
                DB.ServicosTT_Tipos.ReplaceOne(c => c.Id == ServicosTT_Tipos.Id, ServicosTT_Tipos);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update ServicosTT_Tipos :" + e.ToString());
            }
        }

        public static bool Delete(ServicosTT_Tipos ServicosTT_Tipos)
        {
            try
            {
                DB.ServicosTT_Tipos.DeleteOne(x => x.Id == ServicosTT_Tipos.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete ServicosTT_Tipos :" + e.ToString());
            }
        }

        public static List<ServicosTT_Tipos> GetAll()
        {
            List<ServicosTT_Tipos> lista = new List<ServicosTT_Tipos>();
            try
            {
                var filter = Builders<ServicosTT_Tipos>.Filter.Empty;
                lista = DB.ServicosTT_Tipos.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir ServicosTT_Tipos" + e.ToString());
            }
        }

    }
}