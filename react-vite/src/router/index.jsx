import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import CategoryPage from '../components/CategoryPage';
import FavoritePage from '../components/FavoritePage';
import LandingPage from '../components/LandingPage';
import ProductDetailsPage from '../components/ProductDetailsPage';
import NewProductFormPage from '../components/NewProductFormPage';
import UserProductsPage from '../components/UserProductsPage';
import CartDetailsPage from '../components/CartDetailsPage';
import PastOrdersPage from '../components/PastOrdersPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "categories/:category_id",
        element: <CategoryPage />
      },
      {
        path: "favorites",
        element: <FavoritePage />
      },
      {
        path: "products/:product_id",
        element: <ProductDetailsPage />
      },
      {
        path: "products/new-product",
        element: <NewProductFormPage />
      },
      {
        path: "products/my-products",
        element: <UserProductsPage />
      },
      {
        path: "shopping-cart",
        element: <CartDetailsPage />
      },
      {
        path: "past-orders",
        element: <PastOrdersPage />
      },
      {
        /*Wildcard catch all redirect back to landing page*/
        path: "*",
        element: <LandingPage />
      }
    ],
  },
]);
