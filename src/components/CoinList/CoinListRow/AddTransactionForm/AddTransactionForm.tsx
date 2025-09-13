import { addTransaction } from "../../../../store/assetsSlice";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import type { Asset, Transaction } from "../../../../types";
import { getAssetTotals } from "../../../../utils";

interface CoinListRowFormValues {
  transaction: Transaction;
}

interface CoinListRowUpdateFormProps {
  asset: Asset;
}

const AddTransactionForm = ({ asset }: CoinListRowUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CoinListRowFormValues>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CoinListRowFormValues> = (data) => {
    const assetTotals = getAssetTotals(asset);
    if (
      data.transaction.type === "sell" &&
      assetTotals.quantity < data.transaction.quantity
    ) {
      setError("transaction.type", {
        type: "custom",
        message: "Can't sell more than you had.",
      });
      return;
    }

    dispatch(
      addTransaction({
        coinId: asset.id,
        transaction: { ...data.transaction, id: crypto.randomUUID() },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        placeholder="Quantity"
        step="any"
        {...register("transaction.quantity", {
          required: true,
          valueAsNumber: true,
        })}
      />
      <input
        type="number"
        step="any"
        placeholder="Buy price"
        {...register("transaction.cost", {
          required: true,
          valueAsNumber: true,
        })}
      />
      {errors.transaction?.type?.message && (
        <p>{errors.transaction.type.message}</p>
      )}
      <select {...register("transaction.type", { required: true })}>
        <option value="" hidden>
          Select type
        </option>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <button type="submit">Add transaction</button>
    </form>
  );
};

export default AddTransactionForm;
