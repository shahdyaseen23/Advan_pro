
const connection= require('./../../../DB/connection');
const bcrypt = require('bcrypt');
const updated = async function(request, response) {
    const { UserName, skills, intrests, role, password, email } = request.body;
    const hashpass= await bcrypt.hash(password,10);


    const sql = `UPDATE users 
                 SET UserName='${UserName}', skills='${skills}', intrests='${intrests}', role='${role}', password='${hashpass}'
                 WHERE email='${email}'`;
                 
    connection.execute(sql, function(error, result) {
        if (error) {
            return response.json(error);
        }
        return response.json("updated successfully");
    });
};

module.exports = updated;