const VK = require('vk-io').VK;
const vk = new VK();

vk.token = process.env.VK_TOKEN;

const PUBLIC_ID = 45491419;

const getPosts = (offset = 0, count = 0) => vk.api.wall.get({
  owner_id: -PUBLIC_ID,
  offset,
  count,
});

module.exports = {
  getPosts,
};
