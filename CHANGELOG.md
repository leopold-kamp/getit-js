# Changelog #

## 0.2.2 (2020-11-10) ##

### Release Highlights ###

Just a small typescript compile fix for beforeCreate in AbstractModel

## 0.2.1 (2020-11-10) ##

### Release Highlights ###

1. Improve Quality of the Repositry
2. Add mutation functionality for  before POST/UPDATE... requests

### Features ###

- **changelog:** add a changelog
- **unit-tests:** add jest framework into repository for unit testing
- **AbstractModel:** add 4 functions ```beforeUpdate```, ```beforeCreate```, ```beforeUpdateList``` and ```beforeCreateList```. All functions will be called recursively in child properties to enable data mutation before making api calls. These functions are indended to be overwritten. See readme for an example.