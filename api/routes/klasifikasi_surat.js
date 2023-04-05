const express = require('express');
const router = express.Router();

//import express validator
const {body, validationResult} = require('express-validator');

//import database
const connection = require('../config/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM klasifikasi_surat ORDER BY ID_KLASIFIKASI_SURAT asc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Klasifikasi Surat',
                data: rows
            })
        }
    });
});

/**
 * INSERT POST
 */
router.post('/insert', [

    //validation
    body('title').notEmpty(),
    body('content').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // insert query
    connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW POST
 */
router.get('/(:id_klasifikasi_surat)', function (req, res) {

    let id_klasifikasi_surat = req.params.id_klasifikasi_surat;

    connection.query(`SELECT * FROM klasifikasi_surat WHERE ID_KLASIFIKASI_SURAT = ${id_klasifikasi_surat}`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Klasifikasi Surat Not Found!',
            })
        }
        // if post found
        else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Klasifikasi Surat',
                data: rows[0]
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.patch('/update/:id', [

    //validation
    body('title').notEmpty(),
    body('content').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id post
    let id = req.params.id;

    //data post
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // update query
    connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })

});

/**
 * DELETE POST
 */
router.delete('/delete/(:id)', function(req, res) {

    let id = req.params.id;
    
    connection.query(`DELETE FROM posts WHERE id = ${id}`, function(err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!',
            })
        }
    })
});

module.exports = router;