import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { goBackCategory } from '../store/slices/categoriesSlice';

import styles from '../styles/BackButton.module.scss';

const BackButton: React.FC = () => {
  const { selectedCategoryStack } = useSelector((state: RootState) => state.categories);
  const dispatch = useAppDispatch();

  if (!selectedCategoryStack || selectedCategoryStack.length === 0) {
    return null;
  }
  const handleGoBack = () => {
    dispatch(goBackCategory(1));
  };

  return (
    <button className={styles.backButton} onClick={handleGoBack}>
      Назад
    </button>
  );
}

export default BackButton