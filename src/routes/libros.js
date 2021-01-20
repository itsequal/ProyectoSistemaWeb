const express = require ('express');
const { default: fetch } = require('node-fetch');
const pool = require('../database');
const router = express.Router();
const { isLoggedIn } = require ('../lib/auth');

router.get('/add', isLoggedIn, (req,res)=>{
    res.render('libros/add.hbs');
});

router.post('/add',isLoggedIn,async (req,res)=>{
    const {tlibro,tautor,tdescripcion} = req.body;
    const newLibro = {
        tlibro,
        tautor,
        tdescripcion
    };
    await pool.query('INSERT INTO libros set ?',[newLibro]);
    req.flash('guardado','Libro guardado!')
    res.redirect('/libros');
});

router.get('/',isLoggedIn,async (req,res)=>{
    const libros = await pool.query('SELECT * FROM libros');
    res.render('libros/list', { libros });
});

router.get('/delete/:id',isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM libros WHERE id_libro = ?',[id]);
    req.flash('guardado', 'Libro borrado!')
    res.redirect('/libros');
});

router.get('/edit/:id',isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    const libros = await pool.query('SELECT * FROM libros WHERE id_libro = ?', [id]);
    res.render('libros/edit', {libros:libros[0]});
});

router.post('/edit/:id',isLoggedIn,async (req,res)=>{
    const {id} = req.params;
    const {tlibro,tautor,tdescripcion} = req.body;
    const newLibro = {
        tlibro,
        tautor,
        tdescripcion
    };
    await pool.query('UPDATE libros SET ? WHERE id_libro = ?', [newLibro, id]);
    req.flash('guardado', 'Libro editado!');
    res.redirect('/libros');
});

router.post('/main', (req,res)=>{
    const {palabra} = req.body;
    console.log(req.body);
});


module.exports=router;