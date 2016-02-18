require('../assets/index.less');
const req = require.context('.', false, /\.spec\.jsx?$/);
req.keys().forEach(req);
