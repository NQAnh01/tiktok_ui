import React from "react";
import PropTypes from "prop-types";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Header = ({ title, onBack }) => {
  return (
    <header className={cx("header")}>
      <button className={cx("back-btn")}>
        <FontAwesomeIcon icon={faChevronLeft} onClick={onBack} />
      </button>
      <h4 className={cx("header-title")}>{title}</h4>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Header;
