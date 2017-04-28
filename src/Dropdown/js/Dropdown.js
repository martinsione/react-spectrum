import classNames from 'classnames';
import {Menu} from '../../Menu';
import React from 'react';
import '../style/index.styl';

export default class Dropdown extends React.Component {
  state = {
    showingMenu: false
  };

  onClick = () => {
    this.setState({
      showingMenu: !this.state.showingMenu
    });
  }

  onClose = () => {
    this.setState({showingMenu: false});
  }

  onSelect = (...args) => {
    this.onClose();
    if (this.props.onSelect) {
      this.props.onSelect(...args);
    }
  }

  render() {
    const {alignRight, className} = this.props;
    const children = React.Children.toArray(this.props.children);
    const trigger = children.find(c => c.props.dropdownTrigger) || children[0];

    return (
      <div className={classNames('coral-Dropdown', className)}>
        {children.map(child => {
          if (child === trigger) {
            return React.cloneElement(child, {onClick: this.onClick})
          } else if (child.type === Menu) {
            return this.state.showingMenu && React.cloneElement(child, {
              className: classNames(child.props.className, 'coral-Dropdown-menu', {'align-right': alignRight}),
              onClose: this.onClose,
              onSelect: this.onSelect
            });
          } else {
            return child;
          }
        })}
      </div>
    );
  }
}
