var express = require('express');
const Model_users = require('../model/model_users');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    let id = req.session.userId;
    let Data = await Model_users.getId(id);
    if (Data.length > 0){
      //kondisi pengecekan level
      if(Data[0].level_users != 1){
        res.redirect('/logout')
      }else{
        res.render('users/super',{
          title: 'user home',
          email: Data[0].email
        });
      }
      //akhir kondisi
    }else {
      res.status(401).json({error : 'user tidak ada'});
    }
  }catch (error){
    res.status(501).json('butuh akses login');
  }
});

module.exports = router;