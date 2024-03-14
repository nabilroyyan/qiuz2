var connection = require("../config/database.js");

class model_kapal{

    static async getALL(){
        return new Promise((resolve, reject) => {
            connection.query(
                "select * from kapal ORDER BY id_kapal DESC",
                function (err, rows) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(rows);
                  }
                }
              );
        });
    }
    
    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query('insert into kapal set ?', Data, function(err, result){
                if (err){
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('select * from kapal where id_kapal = ' + id , (err, rows) => {
                if (err){
                    reject(err);
                    console.log(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

      static async update(id, data){
          return new Promise((resolve, reject) => {
              connection.query('update kapal set ? where id_kapal =' + id, data, function(err, result){
                  if (err){
                      reject(err);
                      console.log(err);
                  } else {
                      resolve(result);
                  }
              });
          });
      }
      
      static async delete(id, data){
          return new Promise((resolve, reject) => {
              connection.query('delete from kapal where id_kapal =' + id, function(err, result){
                  if (err){
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
          });
      }
    

}


module.exports = model_kapal;