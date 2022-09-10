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
            console.log(req.query)
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
            }
            if (response) {
                // success
                const json = response.data;
                return res.json(json)
            }
    }
    async collections(req, res) {
        let response = null;
        const params = req.query;
        try {
            response = await axios.post('https://api.getgems.io/graphql',{
                "operationName":"mainPageTopCollection","variables":{"kind":params.date,"count":Number(params.num)},"query":"query mainPageTopCollection($kind: MPTopKind!, $count: Int!, $cursor: String) {\n  mainPageTopCollection(kind: $kind, first: $count, after: $cursor) {\n    cursor\n    items {\n      place\n      tonValue\n      currencyValue(currency: usd)\n      diffPercent\n      floorPrice\n      currencyFloorPrice(currency: usd)\n      collection {\n        address\n        name\n        isVerified\n        image {\n          image {\n            sized(width: 200, height: 200, format: \"collection-avatar\")\n            __typename\n          }\n          __typename\n        }\n        approximateHoldersCount\n        approximateItemsCount\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"
            })
            console.log(params)
            return res.json(response.data)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async search(req, res) {
        let response = null;
        const params = req.query;
        try {
            response = await axios.post('https://api.getgems.io/graphql',{
                "operationName":"commonSearch","variables":{"query":`{\"$and\":[{\"search\":\"${params.name}\"},{\"isBlocked\":false}]}`,"count":30,"searchCollection":true,"searchNft":false},"query":"query commonSearch($searchNft: Boolean!, $searchCollection: Boolean!, $count: Int!, $cursor: String, $query: String, $sort: String) {\n  nfts: alphaNftItemSearch(\n    first: $count\n    after: $cursor\n    query: $query\n    sort: $sort\n  ) @include(if: $searchNft) {\n    edges {\n      node {\n        address\n        name\n        previewImage: content {\n          ... on NftContentImage {\n            image {\n              baseUrl\n              sized(width: 200, height: 200)\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        sale {\n          ... on NftSaleFixPrice {\n            fullPrice\n            __typename\n          }\n          ... on NftSaleFixPriceDisintar {\n            fullPrice\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      cursor\n      __typename\n    }\n    info {\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n  collections: alphaNftCollectionSearch(\n    first: $count\n    after: $cursor\n    query: $query\n    sort: $sort\n  ) @include(if: $searchCollection) {\n    edges {\n      node {\n        address\n        name\n        isVerified\n        previewImage: image {\n          image {\n            baseUrl\n            sized(width: 200, height: 200)\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      cursor\n      __typename\n    }\n    info {\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n}"
            })
            console.log(params)
            return res.json(response.data)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new PostController();