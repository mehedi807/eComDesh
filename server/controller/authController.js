//import { generateToken } from '../lib/Util.js';
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        if ( !email || !password)
            return res.status(400).json('!!Provide all fields')
        if (password.length < 6)
            return res.status(400).json('!!Password must be at least 6 caarecther');
        const user = await User.findOne({ email });
        if (user)
            return res.status(400).json('!!Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPassword,
        })

        if (newUser) {
            //generateToken(newUser._id, res);
            await newUser.save();
            //console.log(newUser._id);
            res.status(200).json({
                _id: newUser._id,
                email: newUser.email,
            });
        }
        else {
            return res.status(400).json('!!Invalid User data');
        }

    } catch (error) {
        console.log('Error during Signup');
        return res.status(400).json('!!Internal server error');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({message: '!!Provide all fields'})
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).json({message: 'User not found'})
        const isPassOK = await bcrypt.compare(password, user.password);

        if (!isPassOK)
            return res.status(400).json({message:'!!Wrong Password,try again'});

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.log('Error while login');
        return res.status(400).json({message:'!!Internal server error'});
    }

};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log('Error during checkAuth');
        res.status(400).json('!!Internal server error in checkAuth');
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json('Logged out');
    } catch (error) {
        console.log('Error during logout');
        return res.status(400).json('!!Internal server error');
    }
};

export const deleteUser = async (req, res) => {
    const { email } = req.params;
    try {
        if (!email)
            return res.status(400).json('!!User email is missing');

        const user = await User.findOneAndDelete({ email });
        if (!user)
            return res.status(400).json('!!User not found');

        res.status(200).json({ message: 'User Deleted', email: email })
    } catch (error) {
        console.log('Error Deleting User');
        return res.status(400).json('!!Internal server error');
    }

};