import fetch from 'isomorphic-fetch';
import { parseString } from 'xmltojson';
import { z, ZodType } from 'zod';

const API_URL = 'http://opendata.fmi.fi/wfs?request=getFeature';

interface MakeFmiRequestOpts<S extends ZodType> {
  storedQuery: string;
  params: Record<string, string>;
  cacheKey: string;
  schema: S;
}

export async function makeFmiRequest<S extends ZodType>(opts: MakeFmiRequestOpts<S>) {
  const url = new URL(API_URL);

  url.searchParams.set('storedquery_id', opts.storedQuery);

  for (const [key, value] of Object.entries(opts.params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('FMI request not ok');
  }

  const xml = await response.text();
  const json = parseString(xml, {});

  return opts.schema.parse(json) as z.infer<S>;
}
