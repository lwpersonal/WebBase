const context = {};

const defineGetter = target => key => {
  Reflect.defineProperty(context, key, {
    get() {
      return this[target][key];
    },
  });
};

const requestGet = defineGetter('request');
requestGet('path');
requestGet('query');
requestGet('rul');

// const responseGet = defineGetter('response');
// responseGet('body');
// const responseSet = defineSetter('response');
// responseSet('body');

module.exports = context;
