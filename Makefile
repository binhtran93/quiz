DOCKER_COMPOSE_FILES=.docker/docker-compose.yml
PROJECT_NAME=quiz
DOCKER_COMPOSE=/usr/bin/docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILES)

help: ## Show this help
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

startup: down ## Start the checkout service
	$(DOCKER_COMPOSE) up --build -d

down: ## Stop the checkout service
	$(DOCKER_COMPOSE) down --remove-orphans

down_clean: ## Stop the checkout service
	$(DOCKER_COMPOSE) down --remove-orphans --rmi local

deploy:
	$(DOCKER_COMPOSE) rm -sf app
	$(DOCKER_COMPOSE) build app
	$(DOCKER_COMPOSE) up --no-deps -d app

logs:
	$(DOCKER_COMPOSE) logs -f $(service)