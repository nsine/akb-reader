import VK from 'vk-io';

const vk = new VK();
const PUBLIC_ID = 45491419;

vk.token = process.env.VK_TOKEN;

export async function getPosts(offset = 0, count = 0) {
  return Promise.resolve({
    "response": {
      "count": 19179,
      "items": [{
        "id": 771786,
        "from_id": -45491419,
        "owner_id": -45491419,
        "date": 1544880540,
        "marked_as_ads": 0,
        "post_type": "post",
        "text": `Oтрубил Иван Змею одну
    голову — на ее месте две
    выросло.
    Отрубил две — четыре
    выросло
    Отрубил четыре — восемь
    выросло
        …
        Отрубил Иван Змею 65536
    голов, и умер Змей.
    Потому что был он 16-
          битный.`,
    "signer_id": 495861598,
        "post_source": {
          "type": "vk"
        },
        "comments": {
          "count": 17,
          "can_post": 1,
          "groups_can_post": true
        },
        "likes": {
          "count": 177,
          "user_likes": 0,
          "can_like": 1,
          "can_publish": 1
        },
        "reposts": {
          "count": 6,
          "user_reposted": 0
        },
        "views": {
          "count": 3487
        },
        "is_favorite": false
      }],
      "profiles": [{
        "id": 495861598,
        "first_name": "Toxic",
        "last_name": "Rain",
        "is_closed": false,
        "can_access_closed": true,
        "sex": 2,
        "screen_name": "toxicrainbeatzz",
        "photo_50": "https://vk.com/im...camera_50.png?ava=1",
        "photo_100": "https://vk.com/im...amera_100.png?ava=1",
        "online": 0
      }],
      "groups": [{
        "id": 45491419,
        "name": "Анекдоты категории Б",
        "screen_name": "baneks",
        "is_closed": 0,
        "type": "page",
        "is_admin": 0,
        "is_member": 1,
        "is_advertiser": 0,
        "photo_50": "https://pp.userap...pfxmox4EA.jpg?ava=1",
        "photo_100": "https://pp.userap...mxLpOQEyA.jpg?ava=1",
        "photo_200": "https://pp.userap...2nof4BZ34.jpg?ava=1"
      }]
    }
  });

  return await vk.api.wall.get({
    ownder_id: -PUBLIC_ID,
  });
}
