import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchNewArrivalProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);
  return data as Product[];
};

const fetchNewArrivalAncientProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT);
  return data as Product[];
};

export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<Product[], Error>(
      [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT, options],
      fetchNewArrivalAncientProducts
    );
  }
  return useQuery<Product[], Error>([API_ENDPOINTS.PRODUCTS_ANCIENT, options], fetchNewArrivalProducts);
};
