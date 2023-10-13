import React from 'react';
import { selectCategory } from '../store/slices/categoriesSlice';
import { Category } from '../store/actions/asyncActions';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';

import styles from '../styles/CategoryList.module.scss'

interface PropsList {
  categories: Category[];
}

const CategoryList: React.FC<PropsList> = ({ categories }) => {
  const [categoryImages, setCategoryImages] = React.useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const images: Record<string, string> = {
      //Вверхняя одежда
      'Пальто': 'https://static.lichi.com/product/42884/d5fb4e5795b27ff2620b5de165976b74.jpg?v=0_42884.0&resize=size-middle',
      'Куртки': 'https://imgcdn.befree.ru/rest/V1/images/1024/product/images/2331142122/2331142122_63_1.jpg',
      'Плащи': 'https://www.charuel.ru/upload/resize_cache/iblock/8b7/800_1067_1/barjf7dv7jm6sd6sgrmteukzwkgp535d.jpg',
      //Обувь
      'Ботинки': 'https://olla.ua/image/import_files/dc/dc6c8d733e2611ed91c50cc47ae7d18e_0d3a16482a9d4946ae2b59a48873174f.jpg',
      'Кроссовки': 'https://baden.ru/upload/iblock/544/z11n64222b5lt5cet250plpfsf0h4pxl.jpg',
      'Кеды': 'https://baden.ru/upload/resize_cache/iblock/9f9/1200_1200_140cd750bba9870f18aada2478b24840a/9n0g7dcx7dwoem2pnz40713tiaysd63i.jpg',
      //Футболки/топы
      'Футболки': 'https://ae04.alicdn.com/kf/S7500111c4c9f466bbdcf9f464cd69c4ag.jpg',
      'Топы': 'https://malinabonita.com/images/detailed/13/2309025-1_wefa-6s.jpg',
      'Свитшоты': 'https://img1.vvic.com/upload/1666455818988_603650.jpg',
    };

    setCategoryImages(images);
  }, [categories]);

  if (!categories) {
    return null;
  }

  return (

    <ul className={styles.categoryList}>
      {categories.map((category: Category) => (
        <li key={category.id}>
          <a
            href="#"
            onClick={() => {
              dispatch(selectCategory(category));
              navigate(`/${category.slug}`);
            }}
          >
            <div className={styles.category}>
              <p>— {category.name}</p>
              {categoryImages[category.name] && category.children === null && (
                <img style={{ height: '300px' }} src={categoryImages[category.name]} alt={category.name} />
              )}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
