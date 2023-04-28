const { category } = require("../lib/database.connection");

class CategoryService {

    async findAll(user) {
        const returnData = await category.findAll();
        return returnData;
    }

    async findById(id) {
        const returnData = await category.findOne({ where: { id } });
        return returnData;
    }
}

module.exports = new CategoryService;