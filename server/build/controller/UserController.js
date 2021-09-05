"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
class UserController {
    constructor() {
        this.userRepository = (0, typeorm_1.getRepository)(User_1.User);
    }
    async all(request, response, next) {
        return this.userRepository.find();
    }
    async one(request, response, next) {
        return this.userRepository.findOne(request.params.id);
    }
    async save(request, response, next) {
        return this.userRepository.save(request.body);
    }
    async remove(request, response, next) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map