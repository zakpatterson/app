import * as z from 'zod';
import Constants from 'expo-constants';

const ConfigSchema = z.object({
  apiUrl: z.string().url(),
});

export const config = ConfigSchema.parse(Constants.expoConfig?.extra);
