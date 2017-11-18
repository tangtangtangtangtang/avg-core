import React, { Component } from 'react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react/custom';
import { types, onSnapshot, getEnv } from 'mobx-state-tree';
import { EventEmitter } from 'eventemitter3';
import Logger from './logger';

const logger = Logger.create('State Tree');

class StateTree extends EventEmitter {
  instanceMap = {}
  append(name, instance) {
    if (this.instanceMap[name]) {
      logger.warn(`State instance named '${name}' exists, and has been reset.`);
    }
    this.instanceMap[name] = instance;
  }
  getByName(name) {
    return this.instanceMap[name];
  }
}

export const stateTree = new StateTree();

export function define(options) {

  const { model: schema = {}, views = () => ({ }), actions = () => ({ }), reactions = () => ({ }) } = options;

  return function handleDescriptor(target, key, descriptor) {

    // React Component
    if (target.prototype.isReactComponent) {
      target.isAVGComponent = true;
    } else {
      target.isAVGPlugin = true;
    }

    // if (!DATATYPE[type]) {
    //   throw TypeError('[State Tree] Unrecognized type.');
    // }

    const defualtValue = Object.assign({}, schema);
    
    // convert [] or {} to types.frozen
    for (const key of Object.keys(schema)) {
      const item = schema[key];

      if (typeof item === 'object') {
        schema[key] = types.frozen;
      }
    }

    const model = types.model(schema).actions(actions).views(views);

    target.AVGModel = model;
    target.AVGModelDefault = defualtValue;
    target.AVGReactions = reactions;
  };
}

export function connect(options) {

  const { to, bind = [] } = options;

  return function handleDescriptor(target, key, descriptor) {
    if (!to) {
      throw Error('[State Tree] Must connect to a node.');
    }

    if (!target.isAVGComponent && !target.isAVGPlugin) {
      throw TypeError('[State Tree] Class is not a AVG Component or Plugin.');
    }

    // data map injecting to component/plugin
    const dataMap = {};
    let componentInstance = null;
    const model = target.AVGModel;

    const instance = model.create(target.AVGModelDefault || {}, {
      get component() {
        return componentInstance;
      }
    });

    stateTree.append(to, instance);
    dataMap[to] = instance;

    if (target.isAVGComponent) {
      return observer(getWrapped(dataMap, target, instance, bind, self => {
        componentInstance = self;
      }));
    } else if (target.isAVGPlugin) {
      return getWrapped(dataMap, target, instance, bind, self => {
        componentInstance = self;
      });
    }

    throw TypeError('[State Tree] Class is not a AVG Component or Plugin.');
  };
}

export { getEnv };

function getWrapped(dataMap, target, instance, bind = [], injectSelf) {
  class Wrapped extends target {
    constructor(...args) {
      super(...args);

      let externalReactions = {};
      
      for (const bindObj of bind) {
        if (typeof bindObj === 'string') {
          dataMap[bindObj] = stateTree.getByName(bindObj);
        } else {
          const { name, reactions: reactionsFunc } = bindObj;
          const bindInstance = stateTree.getByName(name);
  
          // TODO: 重名问题
          Object.assign(externalReactions, reactionsFunc(bindInstance, instance));
          dataMap[name] = bindInstance;
        }
      }

      const reactionsMap = Object.assign(externalReactions, /* target.AVGReactions(instance) */{});

      for (const funcName in reactionsMap) {
        const reactionFunc = reactionsMap[funcName];

        reaction(reactionFunc.listener, reactionFunc.handler);
      }

      const selfReactions = target.AVGReactions(instance);

      for (const funcName in selfReactions) {
        const reactionFunc = selfReactions[funcName];

        reaction(reactionFunc, this[funcName].bind(this));
      }

      injectSelf(this);
    }
    get data() {
      return dataMap;
    }
  }

  return Wrapped;
}
