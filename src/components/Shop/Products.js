import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMealsData } from '../../store/cart-action';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals.meals);

  useEffect(() => {
    dispatch(fetchMealsData());
  }, [dispatch]);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {meals.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
