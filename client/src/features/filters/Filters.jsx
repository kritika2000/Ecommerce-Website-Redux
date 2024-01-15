import { useDispatch, useSelector } from 'react-redux';
import getCategory from '../../utils/getCategory';
import capitalize from '../../utils/capitalize';
import { RxCross1 } from 'react-icons/rx';
import { removeCategory, clearAllCategories } from './filterSlice';

function Filters() {
  const { selectedCategories } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <div className="filters">
      <div className="filters__list">
        {selectedCategories.map(({ id, category }) => (
          <button key={id} className="filters__button">
            <span>{capitalize(getCategory(category))}</span>
            <RxCross1 onClick={() => dispatch(removeCategory(id))} />
          </button>
        ))}
      </div>
      <button
        className="filters__clear"
        onClick={() => dispatch(clearAllCategories())}
      >
        Clear All
      </button>
    </div>
  );
}

export default Filters;
