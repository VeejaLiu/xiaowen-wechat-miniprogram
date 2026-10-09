import basicAuth from 'express-basic-auth';
import monitor from 'express-status-monitor';
import { env } from '../env';

export const loadMonitor = (expressApp: any | undefined) => {
    if (expressApp && env.monitor.enabled) {
        expressApp.use(monitor());
        expressApp.get(
            env.monitor.route,
            env.monitor.username
                ? basicAuth({
                      users: {
                          [`${env.monitor.username}`]: env.monitor.password,
                      },
                      challenge: true,
                  })
                : (req, res, next) => next(),
            monitor().pageRoute,
        );
    }
};
