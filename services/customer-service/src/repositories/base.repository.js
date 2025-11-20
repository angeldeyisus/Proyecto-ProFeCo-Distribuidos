export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(`Error finding document by ID: ${error.message}`);
    }
  }

  async findOne(filter) {
    try {
      return await this.model.findOne(filter);
    } catch (error) {
      throw new Error(`Error finding document: ${error.message}`);
    }
  }

  async find(filter = {}, options = {}) {
    try {
      const { sort = { createdAt: -1 }, limit, skip } = options;
      let query = this.model.find(filter).sort(sort);

      if (skip) query = query.skip(skip);
      if (limit) query = query.limit(limit);

      return await query.exec();
    } catch (error) {
      throw new Error(`Error finding documents: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }

  async count(filter = {}) {
    try {
      return await this.model.countDocuments(filter);
    } catch (error) {
      throw new Error(`Error counting documents: ${error.message}`);
    }
  }
}