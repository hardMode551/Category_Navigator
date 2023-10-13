import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import CategoryList from '../components/CategoryList';
import BackButton from '../components/BackButton';
import { fetchCategories } from '../store/actions/asyncActions';
import { unwrapResult } from '@reduxjs/toolkit';

import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  const { currentCategory } = useSelector((state: RootState) => state.categories);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories())
      .then(unwrapResult)
      .catch((error: any) => {
        console.error('Error:', error);
      });
  }, [dispatch]);

  if (currentCategory) {
    return (
      <div className={styles.homeContainer}>
        <h1>{currentCategory.name}</h1>
        {currentCategory.index ? (
          <meta name="robots" content="index" />
        ) : (
          <meta name="robots" content="noindex" />
        )}
        <BackButton />
        <CategoryList categories={currentCategory.children || []} />
      </div>
    );
  } else {
    return <div className={styles.loading}>Loading...</div>;
  }
};

export default Home;
