let db = require('../database/models');
const { Op } = require('sequelize');
let bcrypt = require('bcryptjs');

module.exports = {
  create: async (req, res)=>{
    db.Admin.findOne(
      {
        where:{
          [Op.and]:[
            {email: req.body.email}
          ]
        }
      }
      )
      .then(data =>{
        let x = data.dataValues;
        let pass = x.password
        if(bcrypt.compareSync(req.body.password, pass)){
          res.status(200).json(x)
        }else{
          res.status(200).json({});
        }
      })
  },
  admin: async (req,res)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt);
    db.Admin.create({
      password: hash,
      email: req.body.email
    })
      .then(a => res.status(200).json(a))
  }
}