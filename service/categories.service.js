const { category } = require("../json/transaction.categories.json");

class CategoryService {

    async findAll() {
        console.log(category);
        return category;
    }

    async findById(id) {
        const returnData = await category.findOne({ where: { id } });
        return returnData;
    }
}

module.exports = new CategoryService;