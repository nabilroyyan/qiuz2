var connection = require("../config/database.js");

class model_pemilik{

    static async getALL(){
        return new Promise((resolve, reject) => {
            connection.query(
                "select * from pemilik ORDER BY id_pemilik DESC",
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
            connection.query('insert into pemilik set ?', Data, function(err, result){
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
            connection.query('select * from pemilik where id_pemilik = ' + id , (err, rows) => {
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
              connection.query('update pemilik set ? where id_pemilik =' + id, data, function(err, result){
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
              connection.query('delete from pemilik where id_pemilik =' + id, function(err, result){
                  if (err){
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
          });
      }
    

}


module.exports = model_pemilik;