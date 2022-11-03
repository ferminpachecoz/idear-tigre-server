const db = require('../database/models');
const { Op } = require('sequelize');

module.exports={
  list: (req, res)=>{
    db.Actividad.findAll()
      .then(data => res.status(200).json(data))
  },
  create: (req, res)=>{
    db.Actividad.create({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      allDay: req.body.allDay
    })
      .then(data => res.status(200).json(data))
  },
  edit: (req, res)=>{
    db.Actividad.update({...req.body},{where:{id: req.body.id}})
      .then(data => res.status(200).json(data))
  },
  delete: (req, res)=>{
    db.Actividad.destroy({where:{id: req.body.id}})
      .then(data => res.status(200).json(data))
  }
}