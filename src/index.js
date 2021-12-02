import app from './app.js';

app.listen(app.get('port'));

console.log(`server on port ${app.get('port')}`)
// const express=require('express');
// const app=express();

// app.get('/', function (req, res){
//     const sql = require("mssql");
//     const config ={
//         user: 'Fabian',
//         password: '2012+Return',
//         server:'GDL-LAP-296',
//         database:'grd2',
//         options: { 
//             trustServerCertificate: true,
//             } 
//     };
//     sql.connect(config, function(err){
//         if (err) console.log(err);
//         const request = new sql.Request();
//         request.query ("SELECT TOP (100) [historial_id],[grd_id],[register_type],[timestamp],[address],[value] FROM [grd].[grd].[historical]", function (err, recorset){
//             if (err) console.log(err);
//             res.send(recorset)
//         });
//     });
// });


// const server = app.listen(5000, function(){
//     console.log('server is running')
// })
