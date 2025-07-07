export interface SubscriptionData {
  city: string;
  phone: string;
  email: string;
  course: string;
  address: string;
  fullName: string;
  zipCode?: string;
  district: string;
  birthDate: string;
  acceptedTerms: boolean;
  availableForClasses: boolean;
}

export interface SubscriptionResponse {
  id: string;
  city: string;
  phone: string;
  email: string;
  course: string;
  address: string;
  fullName: string;
  zipCode?: string;
  district: string;
  birthDate: string;
  acceptedTerms: boolean;
  availableForClasses: boolean;
  applicationDate: string;
  applicationStatus: string;
}

const API_URL = 'https://9h6j9n1vpc.execute-api.us-east-1.amazonaws.com/subscriptions';

export async function createSubscription(data: SubscriptionData): Promise<SubscriptionResponse> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(error.message || 'Erro ao criar inscrição');
  }

  return response.json();
}
