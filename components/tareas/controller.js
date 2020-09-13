const { response } = require('express');
const { Pool } = require('pg');
const store = require ('./store');

async function addTarea(descripcion,nombre,fechafin){
    return new Promise((resolve,reject) =>{
        if(!descripcion || !nombre || !fechafin){
            return reject("los datos son incorrectos");
        }
        const fullTarea = {
            id:null,
            descripcion: descripcion,
            nombre: nombre,
            fechafin: fechafin,
        };
        store.add(fullTarea);
        resolve(fullTarea);
    });

}
async function getTarea(){
    
 return new Promise((res,rej)=>{
     res(store.list());
 });

    }

async function getTareabyId(id){
    
    return new Promise((res,rej)=>{
        res(store.getOne(id));
    }); 
       
 }

 function putTarea(id,descripcion,nombre,fechaFin){
    return new Promise((resolve,reject) =>{
        if(!descripcion || !nombre || !fechaFin){
            return reject("los datos son incorrectos");
        }
        const fullTarea = {
            descripcion: descripcion,
            nombre: nombre,
            fechafin: fechaFin,
        };
        resolve(store.put(id,fullTarea));
        
        
    });
     
 }
function deleteTarea(id){
    
    return new Promise((res,rej)=>{
        res(store.delete(id).catch(e=>{console.log(e)}));
    }); 

}
 
module.exports = {
    addTarea,
    getTarea,
    getTareabyId,
    putTarea,
    deleteTarea
};