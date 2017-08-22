const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
require('./models/user.js');
require('./services/passport.js');



mongoose.connect(keys.mongoURI);

const app = express();


require('./routes/authRoutes.js')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT} ... `)
});
