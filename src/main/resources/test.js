import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
  },
};

export default function () {
  const res = http.get('http://localhost:8080/test');
  sleep(1);
}

export function handleSummary(data) {
  return {
    "new2.html": htmlReport(data), // show report in html based format.
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout format...
  };
}