

const model = require("../models/User");
const jwt = require('jsonwebtoken');

//Se obtiene las variables de entorno
const config = process.env;

module.exports.get = async (req, res, next) => {
    const items = await model.find().exec();
    res.json(items);
};

module.exports.getById = async (req, res, next) => {
    const id = req.params.id;
    const items = await model.findOne({ _id: id }).exec();
    res.json(items);
};

module.exports.delete = async (req, res, next) => {
    const items = await model.findByIdAndRemove(req.params.id);
    // si items es null significa que no existe el registro
    if (items) {
        res.json({ result: `items borrado correctamente`, items });
    } else {
        res.json({ result: "Id de items Invalido Invalid", items });
    }
};

// creación de nuevos usuarios
module.exports.signup = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username ) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        const newUser = new model(req.body);
        // save the user
        newUser.save(function (err) {
            console.log(err);
            if (err) {
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
};

// logueo de usuarios
module.exports.signin = async (req, res, next) => {

    const { username, password } = req.body;

    const user = await model.findOne({ username: username }).exec();

    if (!user) {
        res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
        //Si el usuario existe verifica si las contraseñas
        user.comparePassword(password, user.password, function (err, isMatch) {
            if (isMatch && !err) {
              // Si el usuario es correcto y la contraseña coindice se procede a crear el token
              const token = jwt.sign(
                { username: username },
                config.SECRETWORDJWT,
                { expiresIn: "2h" }
              );
              // return the information including token as JSON
              const payload = { rol: user.rol, username: user.username };
              res.json({ success: true, token: token, user: payload });
            } else {
                //si la contraseña no coincide se procede a indicar el error
                //res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                res.json({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
        });
    }
};
module.exports.update = async (req, res, next) => {
    const items = await model.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }, // ==> {title: title, body: body}
        { new: true } // retornar el registro que hemos modificado con los nuevos valores
    );
    res.json(items);
};

