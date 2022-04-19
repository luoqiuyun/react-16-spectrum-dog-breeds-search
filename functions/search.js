const querystring = require("querystring");
const r2 = require("r2");

async function loadImage(page, limit) {
  var headers = {
    "X-API-KEY": process.env.X_API_KEY,
  };
  var query_params = {
    has_breeds: true,
    mime_types: "jpg,png",
    page: page,
    limit: limit,
  };
  let queryString = querystring.stringify(query_params);

  try {
    let _url = `https://api.thedogapi.com/v1/images/search?${queryString}`;
    var response = await r2.get(_url, { headers }).json;
  } catch (e) {
    console.log(e);
  }

  return response;
}

exports.handler = async (event) => {
  const { limit, page } = event.queryStringParameters;
  const response = await loadImage(page, limit);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
