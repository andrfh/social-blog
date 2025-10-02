import Post from "./Post.js";
import PostService from "./PostService.js";

class PostController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body, req.files.picture, req.user.id);
            return res.json(post);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка при создании поста" });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll()
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id)
            return res.json(post)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await PostService.update(req.body, req.user.id);
            return res.json(updatedPost);
        } catch (e) {
            return res.status(403).json({ message: e.message });
        }
    }

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id, req.user.id)
            return res.json(post);
        } catch (e) {
            return res.status(403).json({ message: e.message });
        }
    }
}


export default new PostController()