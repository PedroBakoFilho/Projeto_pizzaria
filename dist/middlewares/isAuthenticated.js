"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return express_1.response.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        //validar token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        //recuperar o id do token e colocar dentro de uma variavel user_id dentro do req (em @types/express/index.d.ts)
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
