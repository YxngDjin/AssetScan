import type { NextFunction, Request, Response } from 'express';
import logger from '../../config/logger.js';
import { categories } from '../../schema/categories.js';
import { db } from '../../db/index.js';
import { and, desc, eq, like, or, sql } from 'drizzle-orm';

export const getAllCategories = async (
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

    
    const filterConditions = [];

    if (search) {
      filterConditions.push(or(like(categories.name, `%${search}%`)));
    }

    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    const countResult = await db
      .select({ count: sql`count(*)` })
      .from(categories)
      .where(whereClause);

    const totalCount = Number(countResult[0]?.count || 0);

    const dbResponse = await db
      .select()
      .from(categories)
      .where(whereClause)
      .orderBy(desc(categories.createdAt))
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
    logger.error('Error getting all categories', e);
    next(e);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = parseInt(String(req.params.id));

    if (!isFinite(categoryId)) {
        res.status(400).json({ error: 'No Category Found' })
        return;
    }
    

    const [dbResult] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId));

    if (!dbResult) {
        res.status(400).json({ error: 'No Category Found' });
        return;
    }

    res.status(200).json({
      data: dbResult,
    });
  } catch (e) {
    logger.error('Error getting category by id', e);
    next(e);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, color } = req.body;

    const [dbResult] = await db
      .insert(categories)
      .values({
        name,
        color,
      })
      .returning({
        id: categories.id,
      });

    if (!dbResult) {
        res.status(400).json({ error: 'Category cant be created' });
        return;
    }

    res.status(200).json({
      data: dbResult,
    });
  } catch (e) {
    logger.error('Error creating category', e);
    next(e);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = parseInt(String(req.params.id));
    const { name, color } = req.body;

    if (!isFinite(categoryId)) {
        res.status(400).json({ error: 'No Category Found' });
        return;
    }

    const [dbResult] = await db
      .update(categories)
      .set({
        name,
        color,
      })
      .where(eq(categories.id, categoryId))
      .returning({
        id: categories.id,
      });
      
    if (!dbResult) {
        res.status(404).json({ error: 'Category not found' });
        return;
    }

    res.status(200).json({
      data: dbResult,
    });
  } catch (e) {
    logger.error('Error updating category', e);
    next(e);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = parseInt(String(req.params.id));

    if (!isFinite(categoryId))
      res.status(400).json({ error: 'No Category Found' });

    const [deleted] = await db.delete(categories).where(eq(categories.id, categoryId)).returning({ id: categories.id });

    if (!deleted) {
        res.status(404).json({ error: 'Category not found' });
        return;
    }

    res.status(200).json({
      message: 'Category deleted successfully',
    });
  } catch (e) {
    logger.error('Error deleting category', e);
    next(e);
  }
};
