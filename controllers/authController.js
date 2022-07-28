const pool = require("../config/db");
const bcrypt = require('bcrypt');
const jwtGenerator = require('./../utils/jwtGenerator');

exports.register = async (req, res, next) => {
    // desturucture the req.body (name, email, password)
    const {name, email, password} = req.body;

    // check if user exist throw error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    
    if(user.rows.length !== 0){
        return res.status(401).send("User already exist");
    }

    // bcrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    
    const bcryptPassword = await bcrypt.hash(password, salt);

    // enter new user to database
    const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", 
    [name, email, bcryptPassword]);

    // generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({token});
}

exports.login = async (req, res, next) => {
    // desturucture the req.body (name, email, password)
    const {email, password} = req.body;

    // check if user not exist throw error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    
    if(user.rows.length === 0){
        return res.status(401).send("Password or Email is incorect");
    }

    // check password
    const validPassword = await bcrypt.compare(password,user.rows[0].user_password);

    if(!validPassword) {
        return res.status(401).send("Password or Email is incorect");
    }

    // give jwt token
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({token});
}
