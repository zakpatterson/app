import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

const schema = {
  accessToken: z.string(),
  accessTokenExpires: z.number(),
  refreshToken: z.string(),
} as const;

type Schema = typeof schema;
type SchemaKey = keyof Schema;

export async function getItem<K extends SchemaKey, D>(key: K, defaultValue: D) {
  const serializedValue = await AsyncStorage.getItem(key);

  if (serializedValue === null) {
    return defaultValue;
  }

  return schema[key].parseAsync(JSON.parse(serializedValue)) as Promise<z.infer<Schema[K]>>;
}

export async function setItem<K extends SchemaKey>(key: K, value: z.infer<Schema[K]>) {
  const validatedValue = schema[key].parse(value);
  return AsyncStorage.setItem(key, JSON.stringify(validatedValue));
}

export async function removeItem<K extends SchemaKey>(key: K) {
  return AsyncStorage.removeItem(key);
}
