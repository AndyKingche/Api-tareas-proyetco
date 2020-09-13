exports.successget = (req,res,tarea, status) => { 
    res.status(status || 200).send(tarea);
}
exports.successpost = (req,res,tarea, status) => { 
    res.status(status || 200).send({
        tarea});
}

exports.error = (req,res, message, status,details) => {
    console.error(details);
    res.status(status || 500).send({
        error:message,
        body: ""
    });

}