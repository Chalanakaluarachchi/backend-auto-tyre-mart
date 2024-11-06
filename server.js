const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const dbConfig = {
  user: 'ravishka',
  password: '123456', 
  server: 'LAPTOP-S17OQCRK', // Replace with your actual server name and instance
  database: 'PX_AUTO_TYRE_MART',
  options: {
    trustServerCertificate: true,
    enableAirthAbort:true,
    trustedConnection:false, 
    instancename: "SQLEXPRESS"
  },
  port: 1433
};

// Fetch products API
app.get('/products', async (req, res) => {
 
 try{   const pool = await sql.connect(dbConfig);
    const result = pool.request().query(`
      SELECT 
        ITEM_PRICE as price, 
        ITEM_PROD_DESC as description, 
        ITEM_STOCK as stock 
      FROM PX_ITEMS
    `);
   result.then(res1 =>{
    return res.json(res1);
   })}
   catch(err){
    console.log(err);
    res.status(500).send('Error fetching products');
   }
});

app.get('/',(req, res) => {
  return res.json("Hi Im Backend")
})

app.listen(5000,()=>{ 
  console.log('Server is running on port 5000');
 });

 