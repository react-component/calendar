import Portal from 'rc-util/lib/Portal';
import Trigger from 'rc-trigger';

Portal.prototype.render = function () { // eslint-disable-line
  return this.props.children;
};

const render = Trigger.prototype.render;

Trigger.prototype.render = function () { // eslint-disable-line
  const tree = render.call(this);

  if (this.state.popupVisible || this._component) {
    return tree;
  }

  return tree[0];
};

export default Trigger;
