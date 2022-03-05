import config from "../config/constants";

export interface ISubscription {
  fullName: string;
  email: string;
  dateBirth: string;
  phone: string;
  zipcode: string;
  address: string;
  number: string;
  city: string;
  neighborhood: string;
  isStudent: boolean | undefined;
  course: string;
  availableTime: boolean | undefined;
  testimony: string;
  acceptTerms: boolean
}

export const sendSubscription = async (subscription: ISubscription) => {
  const response = await fetch(
    config,
    {
      method: "post", body: JSON.stringify(subscription),
    },
  );

  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(data?.message);
  }

  return data;
};
