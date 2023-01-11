let express = require('express');
let app = express();

app.use(express.urlencoded({
    extended : true
}));

var mysql = require("mysql");

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '1234',
    database    : 'shopping'   
});

connection.connect(function(error,result){
    if(error) console.log(error);
    console.log(result);    
});

const item = require('../models/model');
listitem = [];



exports.itemlist = function(req,res){
    connection.query("select * from items;",function(error,result){
        if(error) console.log(error);
        for(let i=0 ; i < result.length;i++) {
            item0 = new item(result[i].id_items,result[i].name,result[i].quantity,result[i].purchased);
           
                listitem.push(item0);  
        }
        res.render('home.ejs',{items:listitem});
    });
}

exports.deleteitem= function(req,res){
        for(let i=0 ;i< listitem.length;i++){
            if(listitem[i].iditem== req.body.itemdelete ){
                listitem.splice(i,1);    
            }     
        }
        res.redirect('/home');       
    }
    
exports.newlist= function(req,res){
        res.render('home.ejs',{items:listitem}); 
    }

exports.showpage= function(req,res){
        res.render('additem.ejs');   
    }
    
exports.additem= function(req,res){
    iditem0= listitem.length+1;
    name0 = req.body.name; 
    quantity0 =req.body.quantity;
    purchased0 = 0;
    item0= new item(iditem0,name0,quantity0,purchased0);
    listitem.push(item0);
    console.log(listitem);
    res.redirect('/home');
    
}


