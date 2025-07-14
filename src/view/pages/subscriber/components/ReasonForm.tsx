import { useReasonStore } from '../store/reasonStore';
import { reasonSchema } from '../schemas/reasonSchema';
import { useState } from 'react';

export const ReasonForm = () => {
  const [error, setError] = useState('');
  const { reason, setReason } = useReasonStore();

  const validate = (value: string) => {
    const result = reasonSchema.safeParse({ reason: value });
    setError(result.success ? '' : result.error.errors[0]?.message || '');
  };

  return (
    <div className="form-control">
      <label className="label flex items-center justify-center flex-wrap gap-2 mb-4">
        <span className="text-base text-center font-semibold text-primary-light mb-1 sm:mb-2">Por que você quer estudar com a gente?</span>
      </label>
      <textarea
        className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-gray-700 focus:border-primary-light focus:ring-2 focus:ring-primary-light transition min-h-[100px]"
        placeholder="Fale sobre sua motivação para participar do curso"
        value={reason}
        onChange={e => setReason(e.target.value)}
        onBlur={e => validate(e.target.value)}
        required
      />
      {error && <span className="text-red-400 text-xs mt-1 font-semibold">{error}</span>}
    </div>
  );
};
