const app = require('./app');

//Setting the port to use either the provided port (if already poster in a website)
//or the static port 5000 if nothing is found.
const PORT = process.env.PORT || 5000;

//Listen to and log the port.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));