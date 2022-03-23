import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';
import { mealsActions } from './meals-slice';

export const fetchMealsData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-b9f99-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
            if (!response.ok) throw new Error('Could not fetch meals');
            const data = await response.json();
            return data;
        };

        try {
            const mealsList = await fetchData();
            const loadedMeals = [];
            for (const key in mealsList) {
                loadedMeals.push({
                  id: key,
                  title: mealsList[key].name,
                  description: mealsList[key].description,
                  price: mealsList[key].price,
                });
              }
            dispatch(mealsActions.addMealsList(loadedMeals));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Fetching meals data failed!',
                })
            );
        }
    }
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://react-http-b9f99-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json');
      if (!response.ok) throw new Error('Could not fetch cart data!');
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-b9f99-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};
