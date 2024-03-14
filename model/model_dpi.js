var connection = require("../config/database.js");

class model_dpi{

    static async getALL(){
        return new Promise((resolve, reject) => {
            connection.query(
                "select * from dpi ORDER BY id_dpi DESC",
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
            connection.query('insert into dpi set ?', Data, function(err, result){
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
            connection.query('select * from dpi where id_dpi = ' + id , (err, rows) => {
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
              connection.query('update dpi set ? where id_dpi =' + id, data, function(err, result){
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
              connection.query('delete from dpi where id_dpi =' + id, function(err, result){
                  if (err){
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
          });
      }
    

}


module.exports = model_dpi;