import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not defined.");
    }

    const maxAge = 7 * 24 * 60 * 60 * 1000;

    const cookieOptions = {
        maxAge: maxAge,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    };

    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: maxAge / 1000 }); // expiresIn in seconds
        res.cookie("jwt", token, cookieOptions);
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};