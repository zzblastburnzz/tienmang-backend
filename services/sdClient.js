
const axios = require('axios');

async function renderImage(imageBase64, prompt) {
  const startRes = await axios.post('https://api.replicate.com/v1/predictions', {
    version: 'your_model_version_id',
    input: {
      prompt,
      image: imageBase64,
      width: 512,
      height: 768
    }
  }, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  const statusUrl = startRes.data.urls.get;

  let outputUrl = null;
  while (true) {
    const res = await axios.get(statusUrl, {
      headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` }
    });

    if (res.data.status === 'succeeded') {
      outputUrl = res.data.output[0];
      break;
    } else if (res.data.status === 'failed') {
      throw new Error('Render thất bại');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return outputUrl;
}

module.exports = { renderImage };
    