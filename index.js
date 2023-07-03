const express = require('express');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fileUpload = require("express-fileupload");
var cors = require("cors");
const { pool } = require("./helpers/util");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

const app = express();

var indexRouter = require("./routes/index")(pool);
var gudangRouter = require("./routes/gudang")(pool);
var satuanRouter = require("./routes/satuan")(pool);
var supplierRouter = require("./routes/supplier")(pool);

var barangRouter = require("./routes/barang")(pool);
var penjualanRouter = require("./routes/penjualan")(pool);
var pembelianRouter = require("./routes/pembelian")(pool);
var usersRouter = require("./routes/users")(pool);
var outletRouter = require("./routes/outlet")(pool);
var pelangganRouter = require("./routes/pelanggan")(pool);

var mutasiBarangRouter = require("./routes/mutasi-barang")(pool);
var returJualRouter = require("./routes/retur-penjualan")(pool);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(cors());


app.use('/pos', indexRouter);
app.use("/pos/gudang", gudangRouter);
app.use("/pos/satuan", satuanRouter);
app.use("/pos/supplier", supplierRouter);
app.use("/pos/barang", barangRouter);
app.use("/pos/penjualan", penjualanRouter);
app.use("/pos/pembelian", pembelianRouter);
app.use("/pos/users", usersRouter);
app.use("/pos/outlet", outletRouter);
app.use("/pos/pelanggan", pelangganRouter);
app.use("/pos/mutasi-barang", mutasiBarangRouter);
app.use("/pos/retur-jual", returJualRouter);

// app.get('/pos', (req, res) => {
//   res.send('Ini halaman POS\n');
// });

const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
