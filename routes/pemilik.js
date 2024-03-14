var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const e = require("method-override");
const model_pemilik = require("../model/model_pemilik.js");


router.get("/",async function (req, res, next) {
  let rows = await model_pemilik.getALL();
  res.render("pemilik/index", {
    data: rows,
  });
});

router.get("/create", function (req, res, next) {
  res.render("pemilik/create", {
    nama_pemilik: "",
    alamat: "",
    no_hp: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_pemilik } = req.body;
    let { alamat } = req.body;
    let { no_hp } = req.body;
    let Data = {
        nama_pemilik,
        alamat,
        no_hp,
      }
   await model_pemilik.Store(Data);
          req.flash("success", "Berhasil memperbarui data!");
          res.redirect("/pemilik");
    }catch{
          req.flash("error", "Gagal memperbarui data");
          res.redirect("/pemilik");
    } 
});

router.get("/edit/(:id)", async function (req, res, next) {
  let id = req.params.id;
  let rows = await model_pemilik.getId(id);
  res.render('pemilik/edit',{
    id:                 rows[0].id_pemilik,
    nama_pemilik:      rows[0].nama_pemilik,
    alamat:      rows[0].alamat,
    no_hp:      rows[0].no_hp,
  })
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_pemilik } = req.body;
    let { alamat } = req.body;
    let { no_hp } = req.body;
    let Data = {
        nama_pemilik,
        alamat,
        no_hp,
      }
    await model_pemilik.update(id,Data);
    req.flash("success", "Berhasil memperbarui data!");
    res.redirect("/pemilik");
      }catch{
        req.flash("error", "Gagal memperbarui data");
        res.redirect("/pemilik");
      } 
});


router.get("/delete/:id", async function (req, res) {  
    let id = req.params.id;
    await model_pemilik.delete(id);
    req.flash("success", "Berhasil menghapus data!");
    res.redirect("/pemilik");
  });
module.exports = router;