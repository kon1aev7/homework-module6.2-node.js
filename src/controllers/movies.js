import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import { parseMovieFilterParams } from '../utils/filters/parseMovieFilterParams.js';
import { movieSortFields } from '../db/models/Movie.js';

import {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovieById,
} from '../services/movies.js';
import { saveFileToLocal } from '../utils/saveFileToLocal.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getMoviesController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, movieSortFields);
  const filters = parseMovieFilterParams(req.query);
  filters.userId = req.user._id;
  const data = await getMovies({ ...paginationParams, ...sortParams, filters });

  res.json({
    status: 200,
    message: 'Server start succesfully',
    data,
  });
};

export const getMoviesByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getMovieById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found!`);

    // const error = new Error(`Movie with id=${id} not found!`);
    // error.status = 404;
    // throw error;
    // return res.status(404).json({
    //     status: 404,
    //     message: `Movie with id=${id} not found!`,
    // });
  }

  res.json({
    status: 200,
    message: `Successfully find movie with id=${id}`,
    data,
  });
};
export const addMovieController = async (req, res) => {
  // const { _id: userId } = req.user;
  const userId = '67fd089dc2523bef395cac14';
  const data = await addMovie({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully add movie',
    data,
  });
};

export const upsertMovieController = async (req, res) => {
  const { id } = req.params;
  const { data, isNew } = await updateMovie(id, req.body, { upsert: true });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Sucessfully update movie',
    data,
  });
};

export const patchMovieController = async (req, res) => {
  const { id } = req.params;
  let posterUrl = null;

  if (req.file) {
    // posterUrl = await saveFileToLocal(req.file);
    posterUrl = await saveFileToCloudinary(req.file);
  }
  const result = await updateMovie(id, { ...req.body, posterUrl });

  if (!result) {
    throw createHttpError(404, `Movie with id=${id} not found!`);
  }
  res.json({
    status: 200,
    message: 'Successfully update movie',
    data: result.data,
  });
};

export const deleteMovieController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteMovieById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found!`);
  }
  res.status(204).send();
};
