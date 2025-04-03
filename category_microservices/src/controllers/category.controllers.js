const Category = require('../models/category.models');

exports.addCategory = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const category = new Category({ name });
    await category.save();

    res.status(201).json({ message: 'Category added', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: 'Categories fetched', categories }); // Changed 201 to 200
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category fetched', category });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

module.exports = exports;