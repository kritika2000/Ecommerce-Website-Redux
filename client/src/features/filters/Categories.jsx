import { useDispatch, useSelector } from 'react-redux';
import getCategory from '../../utils/getCategory';
import capitalize from '../../utils/capitalize';
import Hr from '../../components/Hr';
import {
  addCategory,
  removeCategory,
  setSelectedCategories,
} from './filterSlice';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function Categories() {
  const { categories, selectedCategories } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const queryStringFromFilters = selectedCategories
    .map(({ category }) => category)
    .join('+');
  const [searchParams, setSearchParams] = useSearchParams();
  const filtersFromQueryString = searchParams.get('filter')
    ? searchParams.get('filter').split('+')
    : [];

  useEffect(() => {
    filtersFromQueryString.length > 0 &&
      dispatch(
        setSelectedCategories(
          categories.filter(({ category }) =>
            filtersFromQueryString.includes(category)
          )
        )
      );
  }, []);

  useEffect(() => {
    queryStringFromFilters
      ? setSearchParams({ filter: queryStringFromFilters })
      : setSearchParams({});
  }, [queryStringFromFilters]);

  return (
    <div className="categories">
      <h2 className="categories__heading">Categories</h2>
      <ul className="categories__list">
        {categories.map(({ id, category }) => (
          <>
            <li
              className={`categories__list-item${
                selectedCategories.find((category) => category.id === id)
                  ? ' selected'
                  : ''
              }`}
              key={id}
              onClick={() =>
                !selectedCategories.find((category) => category.id === id)
                  ? dispatch(addCategory({ id, category }))
                  : dispatch(removeCategory(id))
              }
            >
              {capitalize(getCategory(category))}
            </li>
            <Hr />
          </>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
