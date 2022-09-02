const Post = require('./post.js')
const axios = require('axios');

class PostController {
    async create(req, res) {
        try {
            const {key, name, reward, contract, activites, rating, logo, about, start, end, links, eventLink, rewardsPool, participants, aboutDiv, img, details} = req.body
            if (key != "qwerty") {
                res.status(400).json({message: 'Invalid password'})
                return
            }
            const post = await Post.create({key,
                name,
                reward,
                contract,
                activites,
                rating,
                logo,
                about,
                start,
                end,
                links,
                eventLink,
                rewardsPool,
                participants,
                aboutDiv,
                img,
                details})
            console.log(req.body);
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAll(req, res) {
        try {
            const posts = await Post.find();
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Id не указан'})
            }
            const posts = await Post.findById(id);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const post = req.body;
            if (!post._id) {
                res.status(400).json({message: 'Id не указан'})
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async delete(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: 'Id не указан'})
            }
            const post = await Post.findByIdAndDelete(id);
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async data(req, res) {
        let response = null;
        new Promise(async (resolve, reject) => {
            try {
                const {currency} = req.params;
                response = await axios.get(` https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=11419&convert=${currency}`, {
                    headers: {
                        'X-CMC_PRO_API_KEY': 'b85bd06c-19cd-486f-a304-f1ba22178f9c',
                    },
                });
            } catch(ex) {
                response = null;
                // error
                return res.json(ex)
                console.log(ex);
                // reject(ex);
            }
            if (response) {
                // success
                const json = response.data;
                res.status(500).json(json)
                console.log(json);
                // resolve(json);
            }
        });
    }
}

module.exports = new PostController();