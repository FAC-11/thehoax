const {loginQuery, verifyUser} = require('./login');

const waterfall = (obj, tasks, finalCb) => {
  if (tasks.length === 0) {
    return finalCb(null, obj);
  }
  tasks[0](obj, (err, res) => {
    if (err) {
      return finalCb(err);
    }
    return waterfall(obj, tasks.slice(1), finalCb);
  });
};

module.exports = waterfall;
