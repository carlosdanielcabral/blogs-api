import { Categories } from '../database/models';

const findAll = async () => Categories.findAll();

const register = async (name) => Categories.create({ name });

module.exports = { findAll, register };
