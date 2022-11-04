const db = require('../database/models');
const { Op } = require('sequelize');
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../s3.js');
const sharp = require('sharp');
const crypto = require('crypto');
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

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
  },
  addImage: async (req, res)=>{
    const file = req.file
    const imageName = generateFileName()

    /* const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1080, width: 1080, fit: "cover" })
      .toBuffer() */

    await uploadFile(file.buffer, imageName, file.mimetype)

    await db.Image.create({
      title: req.body.title,
      image: imageName,
      id_category: req.body.id
    })
      .then(async data =>{
        data.dataValues.image = await getObjectSignedUrl(data.dataValues.image)
        res.status(200).json(data)
      })
  },
  getImages: (req, res) =>{
    db.Image.findAll({include: [{association: "images"}]})
    .then(async data =>{
      for (let item of data){
        item.dataValues.image = await getObjectSignedUrl(item.dataValues.image)
      }
      res.status(200).json(data)
    })
  },
  deleteImage: (req, res)=>{
    db.Image.findOne({where: {id: req.body.id}})
      .then(async data =>{
        let x = data.dataValues.image;
        await deleteFile(x)
        db.Image.destroy({where: {id: req.body.id}})
          .then(a => res.status(200).json({status: "Se borro una imagen correctamente."}))
      })
  },
  addEquipo: async(req, res)=>{
    const file = req.file
    const imageName = generateFileName()

    await uploadFile(file.buffer, imageName, file.mimetype)

    await db.Equipo.create({
      name: req.body.name,
      image: imageName,
      linkedin: req.body.linkedin
    })
      .then(async data =>{
        data.dataValues.image = await getObjectSignedUrl(data.dataValues.image)
        res.status(200).json(data)
      })
  },
  getEquipo: (req, res)=>{
    db.Equipo.findAll()
    .then(async data =>{
      for (let item of data){
        item.dataValues.image = await getObjectSignedUrl(item.dataValues.image)
      }
      res.status(200).json(data)
    })
  }
}