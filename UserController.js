import User from "./User.js";

class UserController {
    async create(req, res) {
        try {
            const {name, email, avatar} = req.body;
            const user = await User.create({name, email, avatar});
            res.json(user);
            console.log('Added user');
        } catch (e) {
            console.log(e);
            res.status(500).json({e: "Create user error"});
        }
    }
    async update(req,res) {
        try {
            const id = req.params.id
            const updateData = req.body
            console.log(updateData)
            console.log(id)
            if(!id) {
                res.status(400).json({message: 'Didnt get id'})
            }
            const user = await User.findByIdAndUpdate(id,updateData,{new:true})
            res.json(user)
        } catch (e) {
            console.log(e)
            res.status(500).json({e:"Update user error"})
        }
    }
    async getAll(req,res) {
        try {
            const users = await User.find().select('-_id name email')
            return res.status(200).json(users)
        } catch (e) {
            console.log(e)
            res.status(500).json({e:"Get all users error"})
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'ID not provided' });
            }

            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' }); // сначала находим а потом удаляем чтобы в логах не было null
            }

            await User.findByIdAndDelete(id);
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Delete user error" });
        }
    }
}

export default new UserController()