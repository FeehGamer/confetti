let mysql = require('mysql')

var con = mysql.createConnection({
    host: "mysql.hostnow.cz",
    user: "sql26_confetti",
    password: "Patko987",
    database: "sql26_confetti",
    port: "3306"
  });

function UpdateTable(table_name, ID, input){
    con.connect(function(err){
        if (err) return err;
        con.query(`CREATE TABLE IF NOT EXISTS ${table_name} (id VARCHAR(255), input VARCHAR(255))`, function(err, result) {
            if(err) return err;
            con.query(`UPDATE ${table_name} SET id='${ID}',input='${input}' WHERE id='${ID}'`, function(err,result){
                if(result.message === "(Rows matched: 0  Changed: 0  Warnings: 0" || err) {
                    return con.query(`INSERT INTO howisuser (id,input) VALUES ('${ID}', '${input}')`, function(err,result,fields){
                        if(err) return err;
                        return JSON.stringify(fields)
                    })
                }
                return JSON.stringify(fields)
            })
        })
    })
}
function Select(table_name, input){
    con.connect(function(err){
        if(err) return err;
        con.query(`SELECT ${input} FROM ${table_name}`, function (err,result,fields){
            if(err) return(err);
            console.log(result, fields)
            return JSON.stringify(fields)
        })
    })
}
function Where(table_name, record_name, input){
    con.connect(function(err) {
        if (err) return err;
        con.query(`SELECT * FROM ${table_name} WHERE ${record_name} = '${input}'`, function (err, result,fields) {
          if (err) return err;
          return JSON.stringify(fields)
        });
      });
}
function OrderBy(table_name, input){
    con.connect(function(err) {
        if (err) return err;
        con.query(`SELECT * FROM ${table_name} ORDER BY ${input}`, function (err, result,fields) {
          if (err) return err;
          return JSON.stringify(fields)
        });
      });
}
function Limit(table_name, limit, offset){
    con.connect(function(err) {
        if (err) throw err;
        var sql = `SELECT * FROM ${table_name} LIMIT ${limit} OFFSET ${offset || 0}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          return JSON.stringify(fields);
        });
      });
}
function Delete(table_name, record_name, input){
    con.connect(function(err) {
        if (err) throw err;
        var sql = `DELETE FROM ${table_name} WHERE ${record_name} = '${input}'`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          return "Number of records deleted: " + result.affectedRows;
        });
      });
}
module.exports = {
    Delete, Limit, OrderBy, Select, Where, UpdateTable
}