import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '4m', target: 200 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<400'],
    errors: ['rate<0.005'],
  },
};

export default function () {
  const url = `${__ENV.TARGET_URL}/tickets/purchase`;
  const payload = JSON.stringify({
    user_id: 'u1', amount: 10.0, requestId: `${__VU}-${__ITER}-${Date.now()}`
  });
  const res = http.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
  check(res, { '2xx': r => r.status >= 200 && r.status < 300 });
  sleep(0.01);
}
