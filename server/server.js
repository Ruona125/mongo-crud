"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const productModels_1 = __importDefault(require("./models/productModels"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//routers
app.get("/", (req, res) => {
    res.send("welcome");
});
//find a product
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModels_1.default.find({});
        res.status(200).json(products);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}));
//get certain product
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productModels_1.default.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}));
//create a product
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModels_1.default.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}));
// update a product
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productModels_1.default.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json("Product update failed");
        }
        const updatedProduct = yield productModels_1.default.findById(id);
        return res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}));
//delete a product
app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productModels_1.default.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json("Can not find any product with that id");
        }
        return res.status(200).json(product);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}));
mongoose_1.default
    .connect("mongodb+srv://admin:Ruona1029@mongo-test.xvjtiwi.mongodb.net/Node-API?retryWrites=true&w=majority")
    .then(() => {
    console.log("Connected to database!");
    app.listen(8000, () => {
        console.log("server is running on port 8000");
    });
})
    .catch((error) => {
    console.log(error);
});
