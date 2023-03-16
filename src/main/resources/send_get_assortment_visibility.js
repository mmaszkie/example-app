// Run with command:
// k6 run send_get_assortment_visibility.js

import http from "k6/http";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import {randomIntBetween} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import {SharedArray} from "k6/data";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const BASE_URL = "http://localhost:8080/test?assortmentCategory=";
const RPS = 1500;
const DURATION = '30s';

export const options = {
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            rate: RPS,
            timeUnit: '1s',
            duration: DURATION,
            preAllocatedVUs: 200,
            maxVUs: 4000
        },
    },
    summaryTrendStats: ["p(99)", "p(75)", "avg", "max"],
    thresholds: {
      http_req_failed: ['rate<0.01'],
      http_req_duration: ['p(99)<1'],
    },
};

export default function () {
    const category_id = get_random_category_id();
    const res = http.get(BASE_URL + category_id);
    if (res.status !== 200) {
        console.log("Request for category " + category_id + " returned HTTP " + res.status)
    }
}

const category_ids = new SharedArray("category_ids", function () {
    return papaparse.parse(open("./category_ids.csv"), {header: false}).data;
});

function get_random_category_id() {
    return category_ids[randomIntBetween(0, category_ids.length - 1)]
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data), // show report in html based format.
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout format...
  };
}