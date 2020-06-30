import { http } from "./base.service";

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
}

export const sendSubscription = async (subscription: ISubscription) => {
  await http(
    "https://us-central1-estartando-devs-platform.cloudfunctions.net/platform/subscribe",
    { method: "post", body: JSON.stringify(subscription) }
  );
};
