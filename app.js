var express=require('express')
var mysql = require('mysql2')
var cors=require('cors');

var app=express();
app.use(express.json());
app.use(cors());

var conex=mysql.createConnection({
    host:'localhost',
    user:'abel',
    password:'@bl3009',
    database:'tda'
});

conex.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('conexion exitosa a la bd');
    }
});


app.get('/',function(req,res){
    res.send('ruta de inicio');
});

//mostrar todos
app.get('/api/productos',(req,res)=>{
    conex.query('select * from productos',(error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

//mostrar un registro
app.get('/api/productos/:id',(req,res)=>{
    conex.query('select * from productos where id = ?',[req.params.id],(error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    });
});

//insertar registro
app.post('/api/productos',(req,res)=>{
    let data={descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock};
    let sql ="insert into productos set ?";
    conex.query(sql,data,function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//editar
app.put('/api/productos/:id',(req,res)=>{
    let id=req.params.id;
    let descripcion=req.body.descripcion;
    let precio=req.body.precio;
    let stock=req.body.stock;
    let sql ="update productos set descripcion = ?, precio = ?, stock = ? where id = ?";
    conex.query(sql, [descripcion, precio, stock, id], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results); 
        }
    });
});

//eliminar
app.delete('/api/productos/:id',(req,res)=>{
    conex.query('delete from productos where id = ?',[req.params.id],function(error,filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });

});


const puerto=process.env.PUERTO || 3000;

app.listen(puerto,function(){
    console.log('servidor funcionando en puerto :'+puerto);
});