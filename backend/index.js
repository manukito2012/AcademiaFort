const express = require('express');
const cors = require('cors');
var app = express();
//middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
  }));


app.use('/task', require('./routes/tasks.route'));

//setting
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});
