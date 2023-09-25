import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated!"));
        

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403, "Your token is invalid!"));
        req.userId = payload.id
        req.isSeller = payload.isSeller
        next()
    });

}