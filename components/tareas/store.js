const modelTarea = require('./model');

async function addTarea(tarea){
    const values = [tarea.descripcion, tarea.nombre, tarea.fechaFin];
    const insertTarea = await modelTarea.connection.query(`INSERT INTO tareas(descripcion, nombre, fechafin) VALUES($1, $2, $3) returning id`,values)
  .then(res => {
    return res.rows[0].id;
  })
  .catch(e => console.error(e.stack));
    return insertTarea;
}

async function getTarea(){
    const tareas = await modelTarea.connection.query('SELECT * FROM tareas ORDER BY id')
    .then(res => {
        return res.rows;
    });
return tareas;

}
async function getTareabyId(id){
    const tarea = await modelTarea.connection.query(`SELECT * FROM tareas WHERE id = ${id}`)
    .then(res => {
        return res.rows[0];
    });
return tarea;

}
async function putTarea(updatetarea){
    const values = [updatetarea.descripcion, updatetarea.nombre, updatetarea.fechafin,updatetarea.id];
    const tarea = await modelTarea.connection.query(`UPDATE tareas SET
    descripcion = $1,
    nombre = $2,
    fechafin = $3 
    WHERE id = $4`,values)
    .then(res => {
        return res.rows[0];
    });
return tarea;

}
function deleteTarea(id){
    console.log("id "+id);
    const tareaBorrado = modelTarea.connection.query(`DELETE FROM tareas WHERE id=${id} returning id`).then((res)=>{
        if(res.rowCount>0){
            return res.rows[0].id;
        }else{
            return -1;
        }
        
    }).catch();
    return tareaBorrado;

}
module.exports={
    add: addTarea,
    list: getTarea,
    getOne: getTareabyId,
    put: putTarea,
    delete: deleteTarea
}