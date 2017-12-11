using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {


    public class Alojamento {
        [BsonId]
        public ObjectId Id { get; set; }
        public string  Hotelname { get; set; }
        public int[] quartosId { get; set; }
        public Acordo acordo { get; set; }
        public Dias[] Dias { get; set; }

        public Alojamento()
        {

        }
        public Alojamento(string hotelName, int[] quartos, Acordo acordo,Dias[] dias)
        {
            this.Hotelname = hotelName;
            this.quartosId = quartos;
            this.acordo = acordo;
            this.Dias = dias;
        }
        public static bool Insert(string hotelName, int[] quartos, Acordo acordo, Dias[] dias)
        {
            try
            {
                Alojamento cntr = new Alojamento(hotelName, quartos, acordo, dias);
                DB.Alojamento.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Alojamento" + e.ToString());
            }
        }

    }



    public class Acordo {
        public Cambio cambio { get; set; }
        public bool AlmoçoIncluido { get; set; }
        public Ivas Iva { get; set; }
        public double markup { get; set; }
        public double net { get; set; }
        public double margem { get; set; }
        public double Comissao { get; set; }
        public Tipo_Iva TipoIva { get; set; }
        public string Observaçoes { get; set; }
    }

    public class Dias {
        public DateTime cambio { get; set; }
        public def AlmoçoIncluido { get; set; }
    }
    public class def {
        public string nome { get; set; }
        public int numero { get; set; }
    }
}