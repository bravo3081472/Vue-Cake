'use strict'
module.exports = {
  NODE_ENV: '"production"'
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"https://vue-course-api.hexschool.io"',
  VUECAKE: '"vuecake"',
});
