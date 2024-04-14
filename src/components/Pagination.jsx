import { useDispatch } from "react-redux";
import { returnToTop, back, next } from "../paginationReducer";

export const Pagination = () => {
  const dispatch = useDispatch();
  const resetOffset = () => {
    dispatch(returnToTop());
  };

  const backOffset = () => {
    dispatch(back());
  };

  const nextOffset = () => {
    dispatch(next());
  };

  return (
    <>
      <button onClick={resetOffset}>最初へ戻る</button>
      <button onClick={backOffset}>1つ前に戻る</button>
      <button onClick={nextOffset}>次へ</button>
    </>
  );
};
