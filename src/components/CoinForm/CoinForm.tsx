import { useForm, type SubmitHandler } from "react-hook-form";
import CoinSelector from "./CoinSelector/CoinSelector";
import { useDispatch } from "react-redux";
import { addAsset } from "../../store/assetsSlice";
import type { CoinFormValues } from "./CoinForm.types";

const CoinForm = () => {
  const { register, handleSubmit } = useForm<CoinFormValues>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CoinFormValues> = (data) => {
    dispatch(addAsset(data.coin));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CoinSelector register={register} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CoinForm;
