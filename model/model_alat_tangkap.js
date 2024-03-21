var connection = require("../config/database.js");

class model_alat_tangkap{

    static async getALL(){
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM alat_tangkap ORDER BY id_alat DESC",
                function (err, rows) {
                  if (err) {
                    reject(err);
                    console.log(err);
                  } else {
                    resolve(rows);
                    console.log(err);
                  }
                }
              );
        });
    }
    
    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query('insert into alat_tangkap set ?', Data, function(err, result){
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
            connection.query('select * from alat_tangkap where id_alat = ' + id , (err, rows) => {
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
              connection.query('update alat_tangkap set ? where id_alat =' + id, data, function(err, result){
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
              connection.query('delete from alat_tangkap where id_alat =' + id, function(err, result){
                  if (err){
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
          });
      }
    

}


module.exports = model_alat_tangkap;