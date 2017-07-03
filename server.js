'use strict';

const express = require('express');
const requestProxy = require('express-request-proxy'); // REVIEW: We've added a new package here to our requirements, as well as in the package.json
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));

function sportsapi(request, response) {
  (requestProxy({
    url: `https://api.sportradar.us/${request.params[0]}`,
    headers: {
      'X-Originating-Ip': '209.210.157.165'
    },
  }))(request, response);
}

app.get('/sportsapi/*', sportsapi);

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
