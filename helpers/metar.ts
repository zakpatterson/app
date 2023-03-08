import { subDays } from 'date-fns';
import { z } from 'zod';

import { makeFmiRequest } from './fmi';

const metarSchema = z.object({
  'wfs:FeatureCollection': z.object({
    'wfs:member': z.array(
      z.object({
        'avi:VerifiableMessage': z.array(
          z.object({
            'avi:metadata': z.array(
              z.object({
                'avi:MessageMetadata': z.array(
                  z.object({
                    'avi:source': z.array(
                      z.object({
                        'avi:Process': z.array(
                          z.object({
                            'avi:input': z.array(z.string()),
                          })
                        ),
                      })
                    ),
                  })
                ),
              })
            ),
          })
        ),
      })
    ),
  }),
});

export function fetchMetar(icaoCode: string) {
  const startTime = subDays(new Date(), 1);

  return makeFmiRequest({
    storedQuery: 'fmi::avi::observations::iwxxm',
    cacheKey: icaoCode,
    params: {
      icaocode: icaoCode,
      starttime: startTime.toISOString(),
    },
    schema: metarSchema,
  });
}
