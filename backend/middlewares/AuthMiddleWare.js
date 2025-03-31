import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const authHeader = req.cookies.token
    

    console.log("token",authHeader)

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    } 

    
    

    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
