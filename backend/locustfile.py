from locust import HttpUser, task, between, events

class PerformanceTest(HttpUser):
    wait_time = between(1, 2)

    @task
    def index_page(self):
        self.client.get("/")

# Custom event to print results
@events.quitting.add_listener
def _(environment, **kwargs):
    stats = environment.stats.total
    summary = f"GET / {stats.num_requests} requests | Avg: {stats.avg_response_time:.0f}ms | " \
              f"Min: {stats.min_response_time:.0f}ms | Max: {stats.max_response_time:.0f}ms | " \
              f"Req/s: {stats.total_rps:.2f} | Failures: {stats.num_failures}"
    print(summary)