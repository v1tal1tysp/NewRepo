using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace TTOrcamentos2.Model {
    public class TypeOfCost {
        public ObjectId id { get; set; }
        public string name { get; set; }


        public TypeOfCost(string name)
        {
            this.name = name;
        }

        public static TypeOfCost Get(string name)
        {
            try
            {
                TypeOfCost tipocusto = DB.TypeOfCost.Find(x => x.name == name).FirstOrDefault();
                if (tipocusto != null)
                {
                    return tipocusto;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Utilizador" + e.ToString());
            }
        }
        public static bool Insert(string name)
        {
            try
            {
                TypeOfCost newuser = new TypeOfCost(name);
                DB.TypeOfCost.InsertOne(newuser);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Fornecedor" + e.ToString());
            }
        }

        public static bool Update(TypeOfCost TypeOfCost)
        {
            try
            {
                DB.TypeOfCost.ReplaceOne(c => c.id == TypeOfCost.id, TypeOfCost);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update TypeOfCost :" + e.ToString());
            }
        }

        public static bool Delete(TypeOfCost TypeOfCost)
        {
            try
            {
                DB.TypeOfCost.DeleteOne(x => x.id == TypeOfCost.id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete TypeOfCost :" + e.ToString());
            }
        }

        public static List<TypeOfCost> GetAll()
        {
            List<TypeOfCost> lista = new List<TypeOfCost>();
            try
            {
                var filter = Builders<TypeOfCost>.Filter.Empty;
                lista = DB.TypeOfCost.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Utilizador" + e.ToString());
            }
        }
    }

}