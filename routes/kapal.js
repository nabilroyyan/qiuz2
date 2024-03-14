var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const e = require("method-override");
const model_kapal = require("../model/model_kapal.js");


router.get("/",async function (req, res, next) {
  let rows = await model_kapal.getALL();
  res.render("kapal/index", {
    data: rows,
  });
});

router.get("/create", function (req, res, next) {
  res.render("kapal/create", {
    nama_kapal: "",
    id_pemilik: "",
    id_dpi: "",
    id_alat_tangkap: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_kapal } = req.body;
    let { id_pemilik } = req.body;
    let { id_dpi } = req.body;
    let { id_alat_tangkap } = req.body;
    let Data = {
        nama_kapal,
        id_pemilik,
        id_dpi,
        id_alat_tangkap,
      }
   await model_kapal.Store(Data);
          req.flash("success", "Berhasil memperbarui data!");
          res.redirect("/kapal");
    }catch{
          req.flash("error", "Gagal memperbarui data");
          res.redirect("/kapal");
    } 
});

router.get("/edit/(:id)", async function (req, res, next) {
  let id = req.params.id;
  let rows = await model_kapal.getId(id);
  res.render('kapal/edit',{
    id:                 rows[0].id_kapal,
    nama_kapal:      rows[0].nama_kapal,
    id_pemilik:      rows[0].id_pemilik,
    id_dpi:      rows[0].id_dpi,
    id_alat_tangkap:      rows[0].id_alat_tangkap,
  })
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_kapal } = req.body;
    let { id_pemilik } = req.body;
    let { id_dpi } = req.body;
    let { id_alat_tangkap } = req.body;
    let Data = {
        nama_kapal,
        id_pemilik,
        id_dpi,
        id_alat_tangkap,
      }
    await model_kapal.update(id,Data);
    req.flash("success", "Berhasil memperbarui data!");
    res.redirect("/kapal");
      }catch{
        req.flash("error", "Gagal memperbarui data");
        res.redirect("/kapal");
      } 
});


router.get("/delete/:id", async function (req, res) {  
    let id = req.params.id;
    await model_kapal.delete(id);
    req.flash("success", "Berhasil menghapus data!");
    res.redirect("/kapal");
  });
module.exports = router;