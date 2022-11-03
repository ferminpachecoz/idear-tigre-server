const db = require('../database/models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = {
  find: (req, res)=>{
    db.User.findOne(
      {
        where:{
          [Op.and]:[
            {email: req.body.email}
          ]
        }
      }
      )
      .then(data =>{
        if(data){
          let x = data.dataValues;
          let pass = x.password
          if(bcrypt.compareSync(req.body.password, pass)){
            res.status(200).json(x)
          }else{
            res.status(200).json({});
          }
        }
      })
  },
  create: async (req, res)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt);
    db.User.create({
      password: hash,
      email: req.body.email
    })
      .then(a => res.status(200).json(a))
  }
}