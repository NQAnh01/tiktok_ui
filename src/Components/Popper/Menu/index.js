import React, { useState } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../../Popper";
import MenuItem from "./MenuItem";

import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import Header from "./Header";

const cx = classNames.bind(styles);

const defaultFn = () => {};

const Menu = ({
  children,
  items = [],
  hideOnClick = false,
  onChange = defaultFn,
}) => {
  const [history, setHistory] = useState([{ data: items }]);

  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  // reset, back menu
  const handleBackMenu = (index) => {
    setHistory((prev) => prev.slice(0, index));
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      placement="bottom-end"
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("menu-popper")}>
            {history.length > 1 && (
              <Header
                title={current.title}
                onBack={() => {
                  // setHistory((prev) => prev.slice(0, history.length - 1));
                  // Back level menu
                  handleBackMenu(history.length - 1);
                }}
              />
            )}
            <div className={cx("menu-body")}>{renderItems()}</div>
          </PopperWrapper>
        </div>
      )}
      onHide={() => handleBackMenu(1)} //reset menu
    >
      {children}
    </Tippy>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Menu;
