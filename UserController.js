import User from './UserModel.js'
import axios from "axios";

// const ACTION_SERVICE_URL = process.env.ACTION_SERVICE_URL;

class UserController {
    async create(req, res) {
        try {
            const { name, email } = req.body
            const user = await User.create({  name, email })

            console.log('User created:', user);

            // Отправка события создания пользователя в сервис историй
            await axios.post(process.env.ACTION_SERVICE_URL, {
                userId: user._id,
                action: 'create',
                timestamp: new Date()
            }).catch(axiosError => {
                console.log('Error sending action to history service:', axiosError.message);
            });

            res.json(user);
            console.log('Added user');
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Create user error" });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;

            if (!id) {
                return res.status(400).json({ message: 'ID not provided' });
            }

            const user = await User.findByIdAndUpdate(id, updateData, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            await axios.post(process.env.ACTION_SERVICE_URL, {
                userId: user._id,
                action: 'update',
                timestamp: new Date()
            }).catch(axiosError => {
                console.log('Error sending action to history service:', axiosError.message);
            });

            res.json(user);
            console.log('Updated user');
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Update user error" });
        }
    }

    async getAll(req, res) {
        try {
            const users = await User.find().select('name email');
            res.status(200).json(users);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Get all users error" });
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
                return res.status(404).json({ message: 'User not found' });
            }

            await User.findByIdAndDelete(id);


            await axios.post(process.env.ACTION_SERVICE_URL, {
                userId: user._id,
                action: 'delete',
                timestamp: new Date()
            }).catch(axiosError => {
                console.log('Error sending action to history service:', axiosError.message);
            });

            res.status(200).json({ message: 'User deleted successfully' });
            console.log('Deleted user');
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Delete user error" });
        }
    }
}

export default new UserController();
