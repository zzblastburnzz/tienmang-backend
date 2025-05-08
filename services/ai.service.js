const axios = require('axios');

const callAiRenderImage = async (imageBase64, prompt) => {
  const res = await axios.post('https://your-ai-api.com/render', {
    image: imageBase64,
    prompt: prompt
  });

  return res.data?.imageUrl;
};

module.exports = { callAiRenderImage };
