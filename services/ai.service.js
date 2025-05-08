
const axios = require('axios');

const callAiRenderImage = async (imageBase64, prompt) => {
  const res = await axios.post('https://your-ai-render-endpoint.com/render', {
    image: imageBase64,
    prompt
  });

  return res.data?.imageUrl;
};

module.exports = { callAiRenderImage };
    