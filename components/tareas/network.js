const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/',(req,res) => {
    controller.getTarea().then((tareaList) =>{
        response.successget(req, res, tareaList,200);
    }).catch(e =>{
        response.error(res,res, 'Unexpected',500,e);
    });
});
router.get('/:id',(req,res) => {
    controller.getTareabyId(req.params.id).then((tareaList) =>{
         
        if(tareaList!=null){
            response.successget(req, res, tareaList,200);

        }
        else{
            response.error(res,res, tareaList ,500,'No se encontro el id requerido');
        }
        
    }).catch(e =>{
        response.error(res,res, 'Unexpected',500,e);
    });
});
router.post('/',(req,res) => {
    controller.addTarea(req.body.descripcion, req.body.nombre,req.body.fechafin).then(( )=>{
       
        response.successpost(req,res,'Tarea creada correctamente',201);
    })
    .catch(e => {
        response.error(req,res,'La infomracion ingresada es invalida',400,e);
    });
    
});

router.put('/:id',(req,res) => {
    controller.putTarea(req.params.id,req.body.descripcion, req.body.nombre,req.body.fechafin).then((update)=>{
        if(update != null){
            response.successpost(req,res,'Tarea actualizada correctamente',201);
        }else{
            response.error(req,res,'No existe el id',500,'error');

        }
        
    })
    .catch(e => {
        response.error(req,res,'La infomracion ingresada es invalida o no existe el id',400,e);
    });
    
});
router.delete('/:id',(req,res)=>{
    controller.deleteTarea(req.params.id).then((tarea) =>{
       if(tarea!= -1){
        response.successpost(req, res, "La tarea "+tarea+" se ha eliminado",200);
       }else{
           response.error(res,res, 'Nos se ha encontrado el id',400,'error en delete network')
       }
            
    }).catch(e =>{
        response.error(res,res, 'Unexpected',500,e);
    });
});

module.exports = router;