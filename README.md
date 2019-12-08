# webpage-analysis-tool

Requirements:
- docker 19
- docker-compose 1.24

To run, execute in following order:
- `docker-compose up`
- `docker-compose exec node webpage-analyser analyse '$urlToAnalyse'`

To test:
- `docker-compose up`
- `docker-compose exec node yarn test`
