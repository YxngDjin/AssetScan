import { Router } from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from '../controller/item.controller.js';

const itemRouter = Router();

itemRouter.post('/', createItem);
itemRouter.get('/', getAllItems);
itemRouter.get('/:id', getItemById);
itemRouter.put('/:id', updateItem);
itemRouter.delete('/:id', deleteItem);

export default itemRouter;
