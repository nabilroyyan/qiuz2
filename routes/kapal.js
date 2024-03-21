var express = require('express');
var router = express.Router();
const Model_kapal = require('../model/model_kapal.js');
const Model_pemilik = require('../model/model_pemilik.js');
const Model_dpi = require('../model/model_dpi.js');
const model_alat_tangkap = require('../model/model_alat_tangkap.js');
const model_kapal = require('../model/model_kapal.js');

router.get('/',async function(req,res,next){
    let rows = await Model_kapal.getALL();
    res.render('kapal/index',{
        data:rows
    });
})

router.get('/create', async function(req, res, next){
    try {
        let rows2 = await Model_pemilik.getALL();
        let rows3 = await Model_dpi.getALL();
        let rows4 = await model_alat_tangkap.getALL();
        res.render('kapal/create',{
            nama_kapal: '',
            id_pemilik: '',
            id_dpi: '',
            id_alat: '',
            data_pemilik: rows2, // Ensure data_pemilik is passed here
            data_dpi: rows3,
            data_alat: rows4,
        });
    } catch (error) {
        // Handle error
        next(error);
    }
});


router.post('/store',async function(req,res,next){
    try{
        let {nama_kapal,id_pemilik,id_dpi,id_alat} = req.body;
        let Data ={
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat,
        }
        await Model_kapal.Store(Data);
        req.flash('succes','Berhasil menyimpan data yeay');
        res.redirect('/kapal')
    }catch{
        req.flash('error','gagal menyimpan data');
        res.redirect('/kapal')
    }
})
 
router.get('/edit/(:id)',async function(req,res,next){
  let id = req.params.id;
  let rows = await Model_kapal.getId(id);
  let rows2 = await Model_pemilik.getALL();
  let rows3 = await Model_dpi.getALL();
  let rows4 = await model_alat_tangkap.getALL();
  res.render('kapal/edit',{
      id :                    rows[0].id_kapal,
      nama_kapal : rows[0].nama_kapal,
      id_pemilik:          rows[0].id_pemilik,
      id_dpi:          rows[0].id_dpi,
      id_alat:          rows[0].id_alat,
      data_pemilik: rows2,
      data_dpi: rows3,
      data_alat: rows4,
    })
});


router.post('/update/(:id)',async function(req,res,next){
    try{
        let id = req.params.id;
        let {nama_kapal,id_pemilik,id_dpi,id_alat} = req.body;
        let Data = {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat,
        }
        await Model_kapal.update(id,Data);
        req.flash('success','Berhasil update data');
        res.redirect('/kapal')
    }catch{
        req.flash('error','gagal menyimapan data');
        res.redirect('/kapal')
    }
})


router.get('/delete/(:id)',async function(req,res,next){
    let id = req.params.id;
    await Model_kapal.delete(id);
    req.flash('success','Berhasil menghapus data');
    res.redirect('/kapal')
})

module.exports = router;