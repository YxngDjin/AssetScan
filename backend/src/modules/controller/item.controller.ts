import type { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger.js';
import { items } from '../../schema/items.js';
import { db } from '../../db/index.js';
import { and, desc, eq, ilike, or, sql } from 'drizzle-orm';

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    const currentPage = Math.max(1, parseInt(String(page), 10) || 1);
    const limitPerPage = Math.min(
      Math.max(1, parseInt(String(limit), 10) || 10),
      100
    );

    const offset = (currentPage - 1) * limitPerPage;

    //TODO: Add Filter
    const filterConditions = [];

    if (search) {
      filterConditions.push(
        or(
          ilike(items.name, `%${search}%`),
          ilike(items.description, `%${search}%`)
        )
      );
    }

    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    const countResult = await db.select({ count: sql`count(*)` }).from(items);
    const totalCount = Number(countResult[0]?.count || 0);

    const dbResponse = await db
      .select()
      .from(items)
      .where(whereClause)
      .orderBy(desc(items.createdAt))
      .limit(limitPerPage)
      .offset(offset);

    res.status(200).json({
      data: dbResponse,
      pagination: {
        page: currentPage,
        limit: limitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitPerPage),
      },
    });
  } catch (e) {
    logger.error('Error getting all items', e);
    next(e);
  }
};

export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = parseInt(String(req.params.id));

    if (!isFinite(itemId)) res.status(400).json({ error: 'No Item Found' });

    const [dbResult] = await db
      .select()
      .from(items)
      .where(eq(items.id, itemId));

    if (!dbResult) res.status(400).json({ error: 'No Item Found' });

    res.status(200).json({
      data: dbResult,
    });
  } catch (e) {
    logger.error('Error getting item by id', e);
    next(e);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      description,
      quantity,
      purchaseDate,
      purchasePrice,
      categoryId,
    } = req.body;

    const [dbResult] = await db
      .insert(items)
      .values({
        name,
        description,
        quantity,
        purchaseDate,
        purchasePrice,
        categoryId,
      })
      .returning({
        id: items.id,
      });

    if (!dbResult) res.status(400).json({ error: 'Item cant be created' });

    res.status(200).json({
      data: dbResult,
    });
  } catch (e) {
    logger.error('Error creating item', e);
    next(e);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = parseInt(String(req.params.id));
    const {
      name,
      description,
      quantity,
      purchaseDate,
      purchasePrice,
      categoryId,
    } = req.body;

    if (!isFinite(itemId)) res.status(400).json({ error: 'No Item Found' });

    const dbResult = await db
      .update(items)
      .set({
        name,
        description,
        quantity,
        purchaseDate,
        purchasePrice,
        categoryId,
      })
      .where(eq(items.id, itemId))
      .returning({
        id: items.id,
      });

    res.status(200).json({
      data: dbResult,
    });
  } catch (e) {
    logger.error('Error updating item', e);
    next(e);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = parseInt(String(req.params.id));

    if (!isFinite(itemId)) res.status(400).json({ error: 'No Item Found' });

    await db.delete(items).where(eq(items.id, itemId));

    res.status(200).json({
      message: 'Item deleted successfully',
    });
  } catch (e) {
    logger.error('Error deleting item', e);
    next(e);
  }
};
