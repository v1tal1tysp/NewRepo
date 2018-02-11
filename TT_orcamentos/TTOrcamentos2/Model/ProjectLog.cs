using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class ProjectLog {

        [BsonId]
        public ObjectId Id { get; set; }
        public string ProjectId { get; set; }
        public string Username { get; set; }
        public DateTime Date { get; set; }
        public string Action { get; set; }

        public ProjectLog(string ProjectId, string Username,DateTime Date, string Action)
        {
            this.ProjectId = ProjectId;
            this.Username = Username;
            this.Date = Date;
            this.Action = Action;
        }

        public static bool Insert(string ProjectId, string Username, DateTime Date, string Action)
        {
            try
            {
                ProjectLog newuser = new ProjectLog(ProjectId, Username, Date, Action);
                DB.ProjectLog.InsertOne(newuser);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir ProjectLog" + e.ToString());
            }
        }


        public static bool Insert(ProjectLog ProjectLog)
        {
            try
            {
                DB.ProjectLog.InsertOne(ProjectLog);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir ProjectLog" + e.ToString());
            }
        }

        public static List<ProjectLog> GetAll(string projectioID)
        {
            List<ProjectLog> lista = new List<ProjectLog>();
            try
            {
                var filter = Builders<ProjectLog>.Filter.Where(x => x.ProjectId == projectioID);
                lista = DB.ProjectLog.Find(filter).ToList();
                return lista.OrderByDescending(p => p.Date).ToList();
            }
            catch (Exception e)
            {

                throw new Exception("Erro GetAll ProjectLog" + e.ToString());
            }
        }



    }
}