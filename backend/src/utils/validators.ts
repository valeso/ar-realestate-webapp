import validator from 'validator';
import { AppError } from '../middleware/errorHandler';

export const validateEmail = (email: string): void => {
  if (!validator.isEmail(email)) {
    throw new AppError(400, 'BAD_REQUEST', 'Invalid email format');
  }
};

export const validatePassword = (password: string): void => {
  if (password.length < 8) {
    throw new AppError(
      400,
      'BAD_REQUEST',
      'Password must be at least 8 characters long'
    );
  }
};

export const validatePropertyData = (data: {
  title?: string;
  price?: number;
  bedrooms?: number;
}): void => {
  if (data.title && data.title.trim().length === 0) {
    throw new AppError(400, 'BAD_REQUEST', 'Title cannot be empty');
  }

  if (data.price && data.price < 0) {
    throw new AppError(400, 'BAD_REQUEST', 'Price cannot be negative');
  }

  if (data.bedrooms && data.bedrooms < 0) {
    throw new AppError(400, 'BAD_REQUEST', 'Bedrooms cannot be negative');
  }
};
