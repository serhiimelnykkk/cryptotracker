import { updateAssetQuantity } from "../../../../store/assetsSlice";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import type { Asset } from "../../../../types";

interface CoinListRowFormValues {
  quantity: number;
}

interface CoinListRowUpdateFormProps {
  asset: Asset;
}

const CoinListRowUpdateForm = ({ asset }: CoinListRowUpdateFormProps) => {
  const { register, handleSubmit } = useForm<CoinListRowFormValues>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CoinListRowFormValues> = (data) => {
    const newAsset: Asset = { coin: asset.coin, quantity: data.quantity };
    dispatch(updateAssetQuantity(newAsset));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        placeholder="New quantity"
        {...register("quantity", { required: true, valueAsNumber: true })}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default CoinListRowUpdateForm;
