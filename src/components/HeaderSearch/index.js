import React, { component, Component } from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class HeaderSearch extends Component {

  static defaultProps = {
    defaultActiveFirstOption: false
  }

  state = {
    searchMode: false,
    value: ''
  };

  componentWillUnmount () {
    clearTimeout(this.timeout);
  }

  enterSearchMode = () => {
    this.setState({
      searchMode: true
    }, () => {
      if (this.state.searchMode) {
        this.input.refs.input && this.input.refs.input.focus();
      }
    });
  }

  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: ''
    });
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.timeout = setTimeout(() => {
        this.props.onPressEnter(this.state.value);
      }, 0)
    }
  }

  onChange = (value) => {
    this.setState({
      value: value
    })
  }

  render () {
    const { className, placeholder, ...restProps } = this.props;
    const inputClass = classNames(styles.input, {
      [styles.show]: this.state.searchMode
    });
    return (
      <span className={className} onClick={this.enterSearchMode}>
        <Icon type="search" />
        <AutoComplete
          className={inputClass}
          value={this.state.value}
          onChange={this.onChange}
          onSelect={this.onSelect}
          {...restProps}
        >
          <Input
            placeholder={placeholder}
            ref={(node) => { this.input = node; }}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}
