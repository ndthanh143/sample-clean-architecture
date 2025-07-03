import { Category } from '@/infrastructure/entities/category.entity';
import { Product } from '@/infrastructure/entities/product.entity';
import { DataSource } from 'typeorm';

export async function seedDatabase(dataSource: DataSource) {
  const categoryRepository = dataSource.getRepository(Category);
  const productRepository = dataSource.getRepository(Product);

  // Seed Categories
  const categories = [
    categoryRepository.create({ name: 'Electronics' }),
    categoryRepository.create({ name: 'Books' }),
    categoryRepository.create({ name: 'Clothing' }),
  ];
  await categoryRepository.save(categories);

  // Seed Products
  const products = [
    productRepository.create({
      name: 'iPhone 15',
      description: 'Latest iPhone model',
      category: categories[0], // Electronics
    }),
    productRepository.create({
      name: 'The Great Gatsby',
      description: 'Classic book',
      category: categories[1], // Books
    }),
  ];
  await productRepository.save(products);
}
